import store from '@/store';
import axios from 'axios';
import qs from 'qs';

import {
  getToken
} from '@/utils/authority';


const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 20000,
});

//请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getToken();
  }
  return config;
}, error => {
  return Promise.reject(error);
});


// 响应拦截器
service.interceptors.response.use(config => {
  return config;
}, error => {
  console.log('err' + error) // for debug
  return Promise.reject(error);
});


export default service;
