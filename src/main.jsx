import React from 'react'
import { createRoot } from 'react-dom/client'

import { boot } from './lib/character.js'

import './styles/tokens.css'
import './styles/global.css'
import './styles/halftone.css'

// The tree has to be chosen before the app is imported: everything that reads
// it builds from it once, at module load. See src/lib/character.js.
boot()
  .then((ready) => ready && import('./App.jsx'))
  .then((mod) => {
    if (!mod) return
    const App = mod.default
    createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  })
