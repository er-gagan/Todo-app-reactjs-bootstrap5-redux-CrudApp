const checkPassword = (password, confirmPassword) => {
    if ((password === confirmPassword) && (password.length!==0) ) {
        return true
    }
    else {
        return false
    }
}



export { checkPassword }