import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed'
import Contacts from './components/Contacts'
import Login from './components/Login';

function App() {
  return (
    <div className="app">
      <Login />
      {/* <Header />
      <div className="body">
        <Sidebar />
        <Feed />
        <Contacts />
      </div> */}
    </div>
  );
}

export default App;
