import { AppDispatch } from '@/store';
import { ArticleStateI } from '@/store/reducers/article';
import { http } from '@/utils';

// 获取频道
export const getChannels = () => {
  return async (dispatch: AppDispatch) => {
    let res = await http.get<any, Pick<ArticleStateI, 'channels'>>('/channels');
    dispatch({ type: 'article/getChannels', payload: res.channels });
  };
};
