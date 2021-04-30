import cookie from 'js-cookie'

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

export const getCookie = (key) => {
    if (process.browser) {
        cookie.get(key)
    }
}

export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value))
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
        if (cookieCheked && user) {
            return JSON.parse(user)
        }
        return false
    }
}
