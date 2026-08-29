#!/usr/bin/env bash
#
# Deploys the Spider-Man reading tree to a remote host over SSH.
#
# The remote does the work: it clones (or updates) the repository, builds the
# image and brings the container up with docker compose. Nothing is copied from
# this machine, so the deployed code is always exactly what is on the branch.
#
#   ./scripts/deploy.sh user@dell
#   ./scripts/deploy.sh user@dell --port 9000 --branch main
#   ./scripts/deploy.sh user@dell --status
#   ./scripts/deploy.sh user@dell --logs
#
set -euo pipefail

# ---- defaults ---------------------------------------------------------------

REMOTE=""
PORT="${SPIDERMAN_PORT:-8080}"
DIR="${SPIDERMAN_DIR:-/opt/spider-man-reading-tree}"
BRANCH="${SPIDERMAN_BRANCH:-main}"
REPO="${SPIDERMAN_REPO:-}"
ACTION="deploy"

# ---- output -----------------------------------------------------------------

if [ -t 1 ]; then
  BOLD=$'\e[1m'; RED=$'\e[31m'; GREEN=$'\e[32m'; YELLOW=$'\e[33m'; DIM=$'\e[2m'; OFF=$'\e[0m'
else
  BOLD=""; RED=""; GREEN=""; YELLOW=""; DIM=""; OFF=""
fi

step() { printf '%s==>%s %s\n' "$BOLD" "$OFF" "$1"; }
ok()   { printf '    %s✓%s %s\n' "$GREEN" "$OFF" "$1"; }
warn() { printf '    %s!%s %s\n' "$YELLOW" "$OFF" "$1"; }
die()  { printf '\n%serror:%s %s\n\n' "$RED" "$OFF" "$1" >&2; exit 1; }

usage() {
  cat <<USAGE
Usage: $(basename "$0") <user@host> [options]

Options:
  --port <n>       Host port to publish on           (default: $PORT)
  --dir <path>     Deploy directory on the remote    (default: $DIR)
  --branch <name>  Branch to deploy                  (default: $BRANCH)
  --repo <url>     Repository to clone               (default: this repo's origin)
  --status         Show container status and exit
  --logs           Tail container logs and exit
  --down           Stop and remove the container and exit
  -h, --help       This message

Environment equivalents: SPIDERMAN_PORT, SPIDERMAN_DIR, SPIDERMAN_BRANCH, SPIDERMAN_REPO
USAGE
}

# ---- args -------------------------------------------------------------------

while [ $# -gt 0 ]; do
  case "$1" in
    --port)   PORT="${2:?--port needs a value}"; shift 2 ;;
    --dir)    DIR="${2:?--dir needs a value}"; shift 2 ;;
    --branch) BRANCH="${2:?--branch needs a value}"; shift 2 ;;
    --repo)   REPO="${2:?--repo needs a value}"; shift 2 ;;
    --status) ACTION="status"; shift ;;
    --logs)   ACTION="logs"; shift ;;
    --down)   ACTION="down"; shift ;;
    -h|--help) usage; exit 0 ;;
    -*)       die "unknown option: $1" ;;
    *)
      [ -z "$REMOTE" ] || die "unexpected argument: $1"
      REMOTE="$1"; shift ;;
  esac
done

[ -n "$REMOTE" ] || { usage; die "no remote host given"; }

case "$PORT" in
  ''|*[!0-9]*) die "--port must be a number, got: $PORT" ;;
esac

# Default to whatever this working copy pushes to, so the deployed code and the
# code in front of you are the same project.
if [ -z "$REPO" ]; then
  REPO="$(git -C "$(dirname "$0")/.." remote get-url origin 2>/dev/null || true)"
  [ -n "$REPO" ] || die "no --repo given and this checkout has no origin remote"
  # A deploy host will not have your SSH key by default; prefer HTTPS for a
  # public repository so the clone needs no credentials.
  case "$REPO" in
    git@github.com:*) REPO="https://github.com/${REPO#git@github.com:}" ;;
  esac
fi

# ---- ssh helper -------------------------------------------------------------

SSH_OPTS=(-o BatchMode=yes -o ConnectTimeout=10 -o StrictHostKeyChecking=accept-new)
rsh() { ssh "${SSH_OPTS[@]}" "$REMOTE" "$@"; }

# `docker compose` (v2) or `docker-compose` (v1) — resolved once on the remote.
COMPOSE_CMD=""

resolve_compose() {
  if rsh "docker compose version" >/dev/null 2>&1; then
    COMPOSE_CMD="docker compose"
  elif rsh "command -v docker-compose" >/dev/null 2>&1; then
    COMPOSE_CMD="docker-compose"
  else
    die "docker compose is not available on $REMOTE (tried 'docker compose' and 'docker-compose')"
  fi
}

# ---- preflight --------------------------------------------------------------

step "Checking $REMOTE"

rsh "true" 2>/dev/null \
  || die "cannot reach $REMOTE over SSH.
    Check the host, and that your key is authorised:  ssh $REMOTE"
ok "SSH reachable"

rsh "command -v git" >/dev/null 2>&1 || die "git is not installed on $REMOTE"
rsh "command -v docker" >/dev/null 2>&1 || die "docker is not installed on $REMOTE"

rsh "docker info" >/dev/null 2>&1 \
  || die "docker is installed on $REMOTE but not usable by this user.
    Either add the user to the docker group, or run the deploy as root."
ok "docker usable"

resolve_compose
ok "compose: $COMPOSE_CMD"

# ---- non-deploy actions -----------------------------------------------------

case "$ACTION" in
  status)
    step "Status"
    rsh "cd '$DIR' 2>/dev/null && $COMPOSE_CMD ps" \
      || die "nothing deployed at $DIR on $REMOTE"
    exit 0 ;;
  logs)
    step "Logs (ctrl-c to stop)"
    exec ssh "${SSH_OPTS[@]}" -t "$REMOTE" "cd '$DIR' && $COMPOSE_CMD logs -f --tail=100"
    ;;
  down)
    step "Stopping"
    rsh "cd '$DIR' 2>/dev/null && $COMPOSE_CMD down" \
      || die "nothing deployed at $DIR on $REMOTE"
    ok "container stopped and removed"
    exit 0 ;;
esac

# ---- fetch the code ---------------------------------------------------------

step "Syncing $REPO ($BRANCH) into $DIR"

# Refuse to touch a directory that is not our own checkout. A deploy should
# never clobber whatever else happens to live at that path.
GUARD=$(rsh "
  set -e
  if [ -d '$DIR/.git' ]; then
    url=\$(git -C '$DIR' remote get-url origin 2>/dev/null || echo '')
    echo \"EXISTS \$url\"
  elif [ -e '$DIR' ] && [ -n \"\$(ls -A '$DIR' 2>/dev/null)\" ]; then
    echo 'OCCUPIED'
  else
    echo 'FREE'
  fi
")

case "$GUARD" in
  FREE)
    rsh "mkdir -p '$DIR' && git clone --branch '$BRANCH' '$REPO' '$DIR'" \
      || die "clone failed"
    ok "cloned"
    ;;
  OCCUPIED)
    die "$DIR on $REMOTE exists, is not empty, and is not a git checkout.
    Refusing to overwrite it. Pick another path with --dir, or clear that one yourself."
    ;;
  EXISTS*)
    existing="${GUARD#EXISTS }"
    # Compare ignoring the ssh/https form and any trailing .git
    norm() { echo "$1" | sed -e 's#^git@github.com:#https://github.com/#' -e 's#\.git$##'; }
    if [ "$(norm "$existing")" != "$(norm "$REPO")" ]; then
      die "$DIR on $REMOTE is a checkout of a different repository:
      found:    ${existing:-<none>}
      expected: $REPO
    Refusing to reset it. Use --dir to deploy elsewhere."
    fi
    rsh "
      set -e
      cd '$DIR'
      git fetch --prune origin '$BRANCH'
      git checkout -B '$BRANCH' 'origin/$BRANCH'
      git reset --hard 'origin/$BRANCH'
    " || die "update failed"
    ok "updated to origin/$BRANCH"
    ;;
  *)
    die "unexpected response while inspecting $DIR: $GUARD" ;;
esac

DEPLOYED_SHA=$(rsh "git -C '$DIR' rev-parse --short HEAD")
DEPLOYED_MSG=$(rsh "git -C '$DIR' log -1 --pretty=%s")
ok "at $DEPLOYED_SHA — $DEPLOYED_MSG"

# ---- build and start --------------------------------------------------------

step "Building image and starting container on port $PORT"
printf '%s    (first build pulls node and nginx images; it can take a few minutes)%s\n' "$DIM" "$OFF"

rsh "cd '$DIR' && SPIDERMAN_PORT='$PORT' $COMPOSE_CMD up -d --build" \
  || die "build or start failed. Inspect with:  $0 $REMOTE --logs"
ok "container up"

# ---- verify -----------------------------------------------------------------

step "Verifying"

HEALTHY=""
for _ in $(seq 1 20); do
  if rsh "curl -fsS -o /dev/null http://localhost:$PORT/" 2>/dev/null; then
    HEALTHY="yes"; break
  fi
  sleep 2
done

if [ -z "$HEALTHY" ]; then
  warn "the container is running but did not answer on port $PORT within 40s"
  warn "check the logs:  $0 $REMOTE --logs"
  exit 1
fi

# Confirm it is actually our page and not something else already on that port.
if rsh "curl -fsS http://localhost:$PORT/" 2>/dev/null | grep -q "Spider"; then
  ok "serving the reading tree"
else
  warn "port $PORT answers, but the response does not look like this app"
fi

HOST_ONLY="${REMOTE#*@}"
printf '\n%sDeployed.%s  http://%s:%s\n\n' "$GREEN$BOLD" "$OFF" "$HOST_ONLY" "$PORT"
