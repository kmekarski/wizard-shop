import React from 'react'

import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'

import { Login, Logout } from './components/Login'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)

function App() {

  return (
    <div className="app">
      <Sidebar />
      <MainContent />
      {/* <Login /> */}
    </div>
  )
}

export default App
