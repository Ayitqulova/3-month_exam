import bcrypt from "bcrypt"

const salt_rounds = 10

export function hashPassword(password){
    return bcrypt.hash(password, salt_rounds)
}

export function comparePassword(password, hash){
    return bcrypt.compare(password,hash)
}