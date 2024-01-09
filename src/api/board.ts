import axios from "axios"
import customAxios from "."

const boardAPI = {
  fetchAll: async (page:any) => {
    const { data } = await customAxios.get<any>(`/posts`, {
      params: {
        page,
        size: 10
      }
    })
    return data
  },

  fetchDetail: async (id:any) => {
    const { data } = await customAxios.get(`/posts/${id}`)
    return data
  },

  createPost: async (request:any) => {
    const { data } = await customAxios.post('/posts', request)
    return data
  },

  deletePost: async (id:any) => {
    const { data } = await customAxios.delete(`/posts/${id}`)
    return data
  },

  updatePost: async (id: any, request: any) => {
    const { data } = await customAxios.patch(`/posts/${id}`,request)
    return data
  }
}

export default boardAPI