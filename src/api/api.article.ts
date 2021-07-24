import axios, { AxiosRequestConfig } from "axios";
import { ArticleCredentials, ArticleApiResponse } from "./api.interfaces";

const getArticles = async () => {
  const requestConfig: AxiosRequestConfig = {
    method: "get",
    url: "http://localhost:3000/api/articles",
  };
  try {
    const { data: response } = await axios.request(requestConfig);
    return {
      articles: response.articles,
    };
  } catch (err) {
    return { error: err.response };
  }
};

const getArticleBySlug = async (data: string) => {
  const requestConfig: AxiosRequestConfig = {
    method: "get",
    url: `http://localhost:3000/api/articles/${data}`,
    data,
  };
  try {
    const { data: response } = await axios.request(requestConfig);
    return {
      article: response.article,
    };
  } catch (err) {
    return { error: JSON.stringify(err.response.data.message) };
  }
};

const createArticle = async (data: ArticleCredentials) => {
  let token = sessionStorage.getItem("token") ?? "";
  const requestConfig: AxiosRequestConfig = {
    method: "post",
    url: "http://localhost:3000/api/articles",
    headers: { Authorization: `Bearer ${token}` },
    data,
  };
  try {
    const { data: response } = await axios.request<ArticleApiResponse>(
      requestConfig
    );
    return {
      article: response,
    };
  } catch (err) {
    return { error: JSON.stringify(err.response.data.message) };
  }
};

const updateArticleBySlug = async (data: ArticleCredentials) => {
  let token = sessionStorage.getItem("token") ?? "";
  const requestConfig: AxiosRequestConfig = {
    method: "put",
    url: `http://localhost:3000/api/articles/${data.slug}`,
    headers: { Authorization: `Bearer ${token}` },
    data,
  };
  try {
    const { data: response } = await axios.request(requestConfig);
    return {
      article: response.article,
    };
  } catch (err) {
    return { error: JSON.stringify(err.response.data.message) };
  }
};

const deleteArticle = async (data: string) => {
  let token = sessionStorage.getItem("token") ?? "";
  const requestConfig: AxiosRequestConfig = {
    method: "delete",
    url: `http://localhost:3000/api/articles/${data}`,
    headers: { Authorization: `Bearer ${token}` },
    data,
  };
  try {
    const { data: response } = await axios.request(requestConfig);
    return {
      res: response,
    };
  } catch (err) {
    return { error: JSON.stringify(err.response.data.message) };
  }
};

const articleApi = {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticleBySlug,
  deleteArticle,
};

export default articleApi;
