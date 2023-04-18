import React from 'react'

import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)

function App() {

  return (
    <div className="app">
      <Sidebar />

      <MainContent />

    </div>
  )
}

export default App
