import { message } from 'antd';
import axios from 'axios';

import store from '@/store';
import { logout } from '@/store/actions';
import { customHistory } from '@/utils/history';
const http = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
  timeout: 5000,
});
// 响应拦截器
http.interceptors.response.use(
  (res) => {
    return res.data.data || res;
  },
  (e) => {
    if (e.response.status === 401) {
      message.error('登录失效');
      store.dispatch(logout());
      customHistory.push({
        pathname: '/login',
        state: { from: customHistory.location.pathname },
      });
    }
    return Promise.reject(e);
  },
);
// 请求拦截器
http.interceptors.request.use((config) => {
  const state = store.getState();
  if (state.user.token) {
    config.headers!.Authorization = `Bearer ${state.user.token}`;
  }
  return config;
});
export { http };
