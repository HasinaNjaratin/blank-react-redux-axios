import React, { Component } from 'react';
import './styles/app.scss';
import AnonymousRoute from './routes/anonymousRoute';
import ClientRoute from './routes/clientRoute';
// pages
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import HomePage from './pages/HomePage';

class App extends Component {
  render() {
    const { location } = this.props
    return (
      <div>
        <ClientRoute location = { location } exact path='/' component={HomePage}/>
        <AnonymousRoute location = { location } exact path='/login' component={LoginPage}/>
        <ClientRoute location = { location } exact path='/logout' component={LogoutPage}/>
      </div>
    );
  }
}

export default App;
