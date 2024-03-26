import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// khong try catch nhieu` ma` dung` interceptor trong axios
//interceptor danh chan. vao` giua req va res
export const fetchBoardDetailsAPI = async (boardId) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  // lay data qua property data cua axios
  return request.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const request = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  // lay data qua property data cua axios
  return request.data
}
export const moveCardToDiffColumnAPI = async (updateData) => {
  const request = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  // lay data qua property data cua axios
  return request.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const request = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  // lay data qua property data cua axios
  return request.data
}
export const deleteColumnDetailsAPI = async (columnId, updateData) => {
  const request = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  // lay data qua property data cua axios
  return request.data
}


//Column
export const createNewColumnAPI = async (newColumnData) => {
  const request = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return request.data
}

//Card
export const createNewCardAPI = async (newCardData) => {
  const request = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return request.data
}