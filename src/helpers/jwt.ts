/* eslint-disable quotes */
import * as jsonwebtoken from 'jsonwebtoken'

const JWT_SECRET = 'yUNH@h4e4YvVK0jiA5Js8@g'

export const encodeJWT = (data: any, expiresIn: string | number = "3h") => {
  try {
    const token = jsonwebtoken.sign(data, JWT_SECRET, { expiresIn: expiresIn })
    return token
  } catch (error) {
    console.log(error)
    return null
  }
}

export const decodeJWT = (token: any, secret: string = JWT_SECRET) => {
  try {
    const decode = jsonwebtoken.verify(token, secret)
    return decode
  } catch (error) {
    console.log(error)
    return null
  }
}