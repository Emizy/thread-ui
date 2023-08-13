export const getToken = () => {
    return window.localStorage.getItem('biteToken')
}
export const setToken = (token) => {
    return window.localStorage.setItem('biteToken', token)
}
export const removeToken = () => {
    return window.localStorage.removeItem('biteToken')
}