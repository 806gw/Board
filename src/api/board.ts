import axios from "axios"
import customAxios from "."

const boardAPI = {
  fetchAll: async () => {
    const { data } = await customAxios.get<any>(`/posts`)

    return data
  },

  fetchDetail: async (id:any) => {
    const { data } = await customAxios.get(`/posts/${id}`)
    return data
  }
}

export default boardAPI