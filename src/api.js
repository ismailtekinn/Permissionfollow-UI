import axios from "axios"

axios.interceptors.request.use(function (config) {
    const { origin } = new URL(config.url);
    const allowedOrigin = "https://localhost:44373";
    
    if (allowedOrigin.includes(origin)) {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
    }
    return config;
  });
  
export const fetchLogin = async(input) => {
    const {data } = await axios.post(`https://localhost:44373/Auth/Login`,input);
    return data
};


export const fetchMe = async () => {
    const { data } = await axios.get("https://localhost:44373/auth/me");
    return data;
  };

  export const fetchDepartments = async () => {
    const {data} = await axios.get("https://localhost:44373/api/department/departments");
    return (data);
  }
  export const fetchRegister = async (model) => {
    const {data} = await axios.post("https://localhost:44373/auth/register", model);
    return data;
  };

  export const fetchPersonelList = async() => {
    const {data} = await axios.get("https://localhost:44373/api/user/personel-list");
    return data;
  }
