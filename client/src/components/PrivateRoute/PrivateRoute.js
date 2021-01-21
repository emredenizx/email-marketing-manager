import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Auth } from '../../context/auth'
import { injectAuthorization } from "../../api/api.config";

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { currentUser } = useContext(Auth);
    injectAuthorization();

    return (
        <Route
            {...rest}
            render={props =>
                !!currentUser ?
                    (<Component {...props} />)
                    :
                    (<Redirect to={'/login'} />)} />
    );
}

export default PrivateRoute;
