export const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
}

export const getInitials = (name) => {
    return name.split(' ').map((n) => n[0]).join('')
}