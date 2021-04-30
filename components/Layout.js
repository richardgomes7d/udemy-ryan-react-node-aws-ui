import React from 'react'
import NavTab from './NavTab'
import Router from 'next/router'
import { isAuth, logout } from '../helpers/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Layout = ({ children }) => {
    const head = () => (
        <React.Fragment>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
                integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
                crossOrigin="anonymous"
            />
        </React.Fragment>
    )
    

    const nav = () => (
        <ul className="nav nav-tabs">
            <NavTab content="Home" href="/"></NavTab>
            <NavTab content="Encrypt" href="/encrypt"></NavTab>
            {!isAuth() && (
                <React.Fragment>
                    <NavTab content="Login" href="/login"></NavTab>
                    <NavTab content="Register" href="/register"></NavTab>
                </React.Fragment>
            )}

            {isAuth() && isAuth().role === 'admin' && (
                <NavTab content={ isAuth().name } href="/admin" ml="ml-auto"></NavTab>
            )}
            {isAuth() && isAuth().role === 'subscriber' && (
                <NavTab content={ isAuth().name } href="/user" ml="ml-auto"></NavTab>
            )}
            {isAuth() && (
                <li className="nav-item">
                    <a onClick={logout} className="nav-link">
                        Logout
                    </a>
                </li>
            )}
        </ul>
    )
    return <React.Fragment>
        {head()}
        {nav()}
        <div className="container pt-5 pb-5">
            {children}
        </div>
    </React.Fragment>
}

export default Layout