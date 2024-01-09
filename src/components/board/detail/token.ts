import { Buffer } from "buffer"

export const decodeToken = (token:any) => {
  try{
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')

    return JSON.parse(String(payload))
  } catch (error) {}
}