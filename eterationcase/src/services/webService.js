import axios from "axios";

export const getSliderItems = () => {
    return axios.get(`https://5fc9346b2af77700165ae514.mockapi.io/products`)
}

export const applyForm = () => {
    return axios.post(`https://case.justdesignfx.com/team.php `)
}
