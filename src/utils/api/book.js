import { get, post, put } from '../axiosConfig.js'
export default {
    getBooks() {
        return get('/book')
    },
    getBook(params) {
        return get('/book/'+params)
    },
    addBook(params) {
        return post('/book', params)
    },
    updateBook(params) {
        const {id, formData} = params
        return put('/book/'+id, formData)
    }
}