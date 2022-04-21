import { UserInfoI } from '@/store/actions';
import { getToken } from '@/utils';

export interface UserStateI {
  token: string;
  useInfo: UserInfoI;
}
// 登录功能，只需要存储 token 即可，所以，状态默认值为：''
const initialState: Partial<UserStateI> = {
  token: getToken(),
};

const user = (state = initialState, action: any) => {
  switch (action.type) {
    case 'user/setToken':
      return {
        ...state,
        token: action.payload,
      };
    case 'user/setUserInfo':
      return { ...state, useInfo: action.payload };
    default:
      return state;
  }
};

export default user;
