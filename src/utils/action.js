import axios from "axios"

// get data
export const getData = async (url) => {
    const { data } = await axios.get(url)
    return data
}

// get single data
export const singleData = async(id,url) => {
    const { data } = await axios.put(url, {
        id: id
    })
    return data
}

// post data
export const postData = async (value,url) => {
    const { data } = await axios.post(url, value)
    let response
    if (data.status) {
        response = {
            status: true,
            color: 'info',
            message: data.message
        }
    } else {
        response = {
            status: true,
            color: 'danger',
            message: data.message
        }
    }
    return response
}

// delete data
export const deleteData = async(id,url) => {
    const { data } = await axios.delete(url, {
        data: {
            id: id
        }
    })

    let response
    if (data.status) {
        response = {
            status: true,
            color: 'info',
            message: data.message
        }
    } else {
        response = {
            status: true,
            color: 'danger',
            message: data.message
        }
    }
    return response
}

// reload
export const afterAction = (interval) => {
    setInterval(() => {window.location.reload()},Number(interval))
}