import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { logout } from '../actions/auth';

class ClientRoute extends Component {

	componentWillUpdate(){
		if(document.cookie.indexOf("myuser_authenticated=")  < 0 && localStorage.getItem('user_uid') > 0){
			this.props
			.logout()
			.then(() => { window.location.href = '/'; })
			.catch((err) => { console.error(err); });
		}
	}

	componentDidUpdate(){
		let current_location = document.getElementById('current_location');
		window.scrollTo(0, 0);
		document.getElementById('current_location').value = window.location.href;
		setTimeout(()=>{
			document.getElementById("spinner").classList.add("d-none");
		},1000)
	}


	loadPage(){
		let current_location = document.getElementById('current_location');
		if(current_location.value != window.location.href){
			document.getElementById("spinner").classList.remove("d-none");
		}
	}


	render() {
		const { isAuthenticated, component: Component, navbar, childComponent, ...rest } = this.props;
		return (
			<div>
				<Route onChange={this.loadPage()}
					{...rest}
					render={props =>
						isAuthenticated ? 
							(
							<div>
								<main id="page-wrap">
									{childComponent ? <Component child={childComponent} {...props} />  : <Component {...props} />}
								</main>
							</div>
							) 
							: 
							(
							<Redirect to={{pathname: '/login'}} />
							)
						}
				/>
			</div>
		);
	}
}

ClientRoute.propTypes = {
	component: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.user.csrf_token,
		auth: state.auth
	};
}

export default connect(mapStateToProps, { logout }, null, { pure: false })(ClientRoute);
