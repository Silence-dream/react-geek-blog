import axios from 'axios';

import { setToken } from '@/utils';

export const login = (mobile: string, code: string) => {
  console.log(111);
  return async (dispatch: any) => {
    const res = await axios.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile,
      code,
    });
    console.log(res);
    // 注意：此处获取的是 token
    const { token } = res.data.data;
    setToken(token);
    dispatch({ type: 'user/setToken', payload: token });
  };
};
