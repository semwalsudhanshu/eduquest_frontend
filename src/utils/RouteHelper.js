import React, { Component } from 'react';
import { Route } from "react-router-dom";

export const withRoute = (WrappedComponent, extension) => {
    return class CompositeRoute extends Component {
        render() {
            let routePath = this.props.routePath;
            if (!routePath) {
                return <WrappedComponent {...this.props} />;
            }
            extension = 'html';
            return <Route path={'(.*' + routePath + '.' + extension} render={(routeProps) => {
                return <WrappedComponent {...this.props}{...routeProps} />;
            }} />
        }
    }
}