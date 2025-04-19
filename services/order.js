import axios from './axios'

export const loadingOrder = async () => axios.get('/order')

export const loadingOrderId = async (id) => axios.get(`/order/${id}`)

export const createOrder = async (order) => axios.post('/order', order)

export const updateOrder = async (order) => axios.put(`/order/${order._id}`, order)

export const deleteOrder = async (id) => axios.delete(`/order/${id}`)
