import { AppDispatch } from '@/store';
import { clearToken, setToken } from '@/utils';
import { http } from '@/utils';
export const login = (mobile: string, code: string) => {
  return async (dispatch: AppDispatch) => {
    // https://docs.shanyuhai.top/frontend/typescript/change-axios-response-type.html
    const res = await http.post<any, { token: string; refresh_token: string }>(
      '/authorizations',
      {
        mobile,
        code,
      },
    );

    // console.log(res.token);
    let { token } = res;
    setToken(token);
    dispatch({ type: 'user/setToken', payload: token });
  };
};

export interface UserInfoI {
  birthday: string;
  gender: 0 | 1; // 0 男
  id: string;
  intro: string;
  mobile: string;
  // 用户名
  name: string;
  photo: string;
}
// 获取用户信息
export const getUserInfo = () => {
  return async (dispatch: AppDispatch) => {
    const res = await http.get<any, UserInfoI>('/user/profile');
    dispatch({ type: 'user/setUserInfo', payload: res });
  };
};

// 退出登录
export const logout = () => {
  return async (dispatch: AppDispatch) => {
    clearToken();
    dispatch({ type: 'user/setToken', payload: '' });
    dispatch({ type: 'user/setUserInfo', payload: {} });
  };
};
