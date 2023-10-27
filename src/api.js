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
    console.log(data);
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

  export const fetchPersonelList = async(page,limit) => {
    const {data} = await axios.get(`https://localhost:44373/api/user/personel-list?page=${page}&limit=${limit}`);
    return data;
  }
  
  export const fetchUpdatePersonel = async(personel) => {
    const {data} = await axios.post("https://localhost:44373/api/user/personel-update", personel);
    return data;
  }
  export const fetchDeleteUser = async(userId) => {
    const {data} = await axios.delete(`https://localhost:44373/api/user/personel-delete?userId=${userId}`);
    return data;
  }
  export const fetchPermissionAdd = async(permissionModel) => {
    const {data} = await axios.post("https://localhost:44373/api/Dayoff/Add-Permission", permissionModel);
    return data;
  }

  export const fetchGetPermissions = async () => {
    const {data} = await axios.get("https://localhost:44373/api/Dayoff/Get-Permissions");
    return (data);
  }
  export const fetchGetUsers = async () => {
    const {data} = await axios.get("https://localhost:44373/api/user/Get-Users");
    console.log(data.id);
    return (data);
  }
  export const fetchdayoffList = async(page,limit) => {
    const {data} = await axios.get(`https://localhost:44373/api/Dayoff/dayoff-list?page=${page}&limit=${limit}`);
    return data;
  }
  export const fetchUpdatePermission = async(dayoff) => {
    const {data} = await axios.post("https://localhost:44373/api/Dayoff/Update-Permission",dayoff);
    return data;
  }

  export const fetchDeleteDayoff = async(dayofId) => {
    const{data} = await axios.delete(`https://localhost:44373/api/Dayoff/permission-Delete?dayoffId=${dayofId}`);
    return data;
  }

  export const fetchpermissionList = async(page,limit) => {
    const {data } = await axios.get(`https://localhost:44373/api/Dayoff/permission-list?page=${page}&limit=${limit}`);
    return data;
  }
  export const fetchConfirmPermission = async(dayofId) => {
    console.log(dayofId)
    const {data} = await axios.post(`https://localhost:44373/api/Dayoff/to-approve?dayofId=${dayofId}`);
    return data;
  }

  export const fetchDenyPermission = async(dayofId) => {
    const {data } = await axios.post(`https://localhost:44373/api/Dayoff/to-reject?dayofId=${dayofId}`);
    return data ;
  }

  export const fetchUpdateUserPassword = async(user) => {
    console.log(user)
    const {data} = await axios.post("https://localhost:44373/api/user/user-password",user)
    return data;
  }