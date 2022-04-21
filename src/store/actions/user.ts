import { setToken } from '@/utils';
import { http } from '@/utils';

export const login = (mobile: string, code: string) => {
  return async (dispatch: any) => {
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
    console.log(res);
    setToken(token);
    dispatch({ type: 'user/setToken', payload: token });
  };
};
