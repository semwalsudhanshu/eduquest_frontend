import { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from '../../utils/AuthenticationService';

export default class AuthenticatedRoute extends Component {
    render() {
        console.log(AuthenticationService.isUserLoggedIn());
        if (AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/" />
        }

    }
}

