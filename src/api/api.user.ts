import axios, { AxiosRequestConfig } from "axios";
import {
  UserApiResponse,
  UserUpdateRequest,
  UserUpdateResponse,
  LoginCredentials,
  RegisterCredentials,
} from "./api.interfaces";

const getUser = async (data: string) => {
  const requestConfig: AxiosRequestConfig = {
    method: "get",
    url: "http://localhost:3000/api/user",
    headers: { Authorization: `Bearer ${data}` },
    data,
  };
  try {
    const { data: response } = await axios.request<UserApiResponse>(
      requestConfig
    );
    return {
      userData: response.user,
    };
  } catch (err: any) {
    return { error: err.response.data.errors };
  }
};

const updateUser = async (data: UserUpdateRequest) => {
  let token = sessionStorage.getItem("token") ?? "";
  const requestConfig: AxiosRequestConfig = {
    method: "put",
    url: "http://localhost:3000/api/user",
    headers: { Authorization: `Bearer ${token}` },
    data,
  };
  try {
    const { data: response } = await axios.request<UserUpdateResponse>(
      requestConfig
    );
    return {
      userData: response,
    };
  } catch (err: any) {
    return { error: err.response.errors };
  }
};

const loginUser = async (data: LoginCredentials) => {
  const requestConfig: AxiosRequestConfig = {
    method: "post",
    url: "http://localhost:3000/api/users/login",
    data,
  };
  try {
    const { data: response } = await axios.request<UserApiResponse>(
      requestConfig
    );
    return {
      user: response.user,
    };
  } catch (err: any) {
    return { error: JSON.stringify(Object.values(err.response.data.errors)) };
  }
};

const createUser = async (data: RegisterCredentials) => {
  const requestConfig: AxiosRequestConfig = {
    method: "post",
    url: "http://localhost:3000/api/users",
    data,
  };
  try {
    const { data: response } = await axios.request<UserApiResponse>(
      requestConfig
    );
    return {
      user: response.user,
    };
  } catch (err: any) {
    if (err.response.data.errors) {
      return { error: JSON.stringify(Object.values(err.response.data.errors)) };
    } else {
      return {
        error: JSON.stringify(Object.values(err.response.data._errors)),
      };
    }
  }
};

const deleteUser = async (data: string) => {
  let token = sessionStorage.getItem("token") ?? "";
  const requestConfig: AxiosRequestConfig = {
    method: "delete",
    url: `http://localhost:3000/api/users/${data}`,
    headers: { Authorization: `Bearer ${token}` },
    data,
  };
  try {
    const { data: response } = await axios.request(requestConfig);
    return {
      res: response,
    };
  } catch (err: any) {
    return { error: JSON.stringify(err.response.data.message) };
  }
};

const userApi = {
  getUser,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};

export default userApi;
