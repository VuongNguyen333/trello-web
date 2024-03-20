import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// khong try catch nhieu` ma` dung` interceptor trong axios
//interceptor danh chan. vao` giua req va res
export const fetchBoardDetailsAPI = async (boardId) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  // lay data qua property data cua axios
  return request.data
}