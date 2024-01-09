import axios from 'axios'
import customAxios from '.'

const authAPI = {
  register: async(request:any) => {
    const { data } = await customAxios.post(
      `/auth/sign-up`, 
      request
    )

    return data
  },

  login: async(request:any) => {
    const { data } = await customAxios.post(
      `/auth/sign-in`, 
      request
    )

    return data
  }
}

export default authAPI