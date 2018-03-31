import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class AnonymousRoute extends Component {


    render() {
        const { isAuthenticated, component: Component, ...rest } = this.props
        return (
            <div>
                <Route
                    {...rest}
                    render={props =>
                        !isAuthenticated || (window.location.href.indexOf('landing') > 0) || (window.location.href.indexOf('mentionslegales') > 0) ? 
                            (
                            <main id='page-wrap'>
                                <div className="mx-auto main-wrapper">
                                    Mode deconnecté !!!!!
                                    <Component {...props} />
                                </div>
                            </main>

                            ) 
                        : 
                            (
                                <Redirect to="/" />
                            )
                    }
                />
            </div>
        );
    }
}

AnonymousRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.csrf_token
    };
}

export default connect(mapStateToProps)(AnonymousRoute);