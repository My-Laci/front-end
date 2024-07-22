/* eslint-disable no-unused-vars */
import './App.css'
import Sidebar from './components/sidebar'
import AccountInfo from './components/account-info'
import Aside from './components/aside'
import Navbar from './components/Navbar'


function App() {

  return (
    <>
      <Navbar />
      <div className="container">
        <Sidebar />
        <div className="content">
          <AccountInfo />
          <button className="edit-button">Edit Profile</button>
        </div>
        <Aside />
      </div>
    </>
  )
}

export default App
