import axios from 'axios'

export const baseAxios = () => {
	return axios.create({
    baseURL: 'http://127.0.0.1:8000/',
  })
}