import React, {Component} from 'react'
import { logout } from '../actions/auth';
import { connect } from 'react-redux';

class LogoutPage extends Component {

  logout() {
    this.props
    .logout()
    .then(() => { window.location.href = '/'; })
    .catch((err) => {  });
  }

  componentWillMount() {
    this.logout();
  }

  componentDidMount() {
    this.logout();
  }

  render () {
    return <div id="spinner-logout" className="spinner"><h1 className="color-lochinvar text-center">Déconnexion en cours</h1></div>;

  }
}

export default LogoutPage;