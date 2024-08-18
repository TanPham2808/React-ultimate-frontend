import axios from "./axios.customize";

const fetchBookAPI = (current, pageSize) => {
    const URL_BACKEND = `api/v1/book?current=${current}&pageSize=${pageSize}`
    return axios.get(URL_BACKEND);
}

const createBookAPI = (mainText, author, price, quantity) => {
    const URL_BACKEND = "api/v1/book"
    const data = {
        mainText: mainText,
        author: author,
        price: +price,
        quantity: +quantity,
        thumbnail: "abc.png",
        category: "Arts"
    }

    return axios.post(URL_BACKEND, data);
}

const updateBookAPI = (id, mainText, author, price, quantity) => {
    const URL_BACKEND = "api/v1/book"
    const data = {
        _id: id,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity
    }

    return axios.put(URL_BACKEND, data);
}

const deleteBookAPI = (id) => {
    const URL_BACKEND = `api/v1/book/${id}`
    return axios.delete(URL_BACKEND);
}

export { fetchBookAPI, createBookAPI, updateBookAPI, deleteBookAPI }