
export const isValidEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email) || "Email must be in the format: john@example.com"
}

export const isValidPhone = (phone) => {
    const regex = /^\d{11}$/;
    return regex.test(phone) || "Phone number must be exactly 11 digits"
}

export const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password) ||    "Password must be at least 6 characters, include 1 uppercase letter & 1 number"
}