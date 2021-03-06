import cookie from 'js-cookie'
import Router from 'next/router'

export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

export const removeCookie = (key) => {
    if (process.browser) {
        cookie.remove(key)
    }
}

export const getCookie = (key, req) => process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req)

export const getCookieFromBrowser = key => cookie.get(key)

export const getCookieFromServer = (key, req) => {
    if (!req.headers.cookie) {
        return undefined
    }
    let token = req.headers.cookie.split(';').find(cookie => cookie.trim().startsWith(`${key}=`))
    if (!token) {
        return undefined
    }
    let tokenValue = token.split('=')[1]
    return tokenValue
}

export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = (key) => {
    if (process.browser) {
        localStorage.removeItem(key)
    }
}

export const authenticate = (response, next) => {
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next()
}

export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie('token')
        const user = localStorage.getItem('user')
        if (cookieChecked && user) {
            return JSON.parse(user)
        }
        return false
    }
}

export const logout = () => {
    removeCookie('token')
    removeLocalStorage('user')
    Router.push('/login')
}
