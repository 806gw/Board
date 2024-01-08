import axios from 'axios'
import customAxios from '.'

const authAPI = {
  register: (request:any) => {
    const response = customAxios.post(
      `/auth/sign-up`, 
      request
    )

    return response
  },

  login: async(request:any) => {
    const response = customAxios.post(
      `/auth/sign-in`, 
      request
    )

    return response
  }
}

export default authAPI