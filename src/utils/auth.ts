const TOKEN_KEY = 'geek-pc-token';
// 获取token
export const getToken = () => localStorage.getItem(TOKEN_KEY) || '';
// 设置token
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
// 清楚token
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);
