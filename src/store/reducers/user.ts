import { getToken } from '@/utils';

interface UserStateI {
  token: string;
}
// 登录功能，只需要存储 token 即可，所以，状态默认值为：''
const initialState: UserStateI = {
  token: getToken(),
};

const user = (state = initialState, action: any) => {
  switch (action.type) {
    case 'user/setToken':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default user;
