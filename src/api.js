import axios from "axios"


export const fetchLogin = async(input) => {
    const {data } = await axios.post(`https://localhost:44373/Auth/Login`,input);
    return data
};

