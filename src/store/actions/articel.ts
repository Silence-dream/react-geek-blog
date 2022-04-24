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

// 获取文章列表
interface GetArticlesParamsI {
  status: number;
  channel_id: number;
  begin_pubdate: string;
  end_pubdate: string;
  page: number; // 页码
  per_page: number; // 每页数量
}
export const getArticles = (
  {
    page,
    per_page,
    status,
    channel_id,
    begin_pubdate,
    end_pubdate,
  }: Partial<GetArticlesParamsI> = {
    page: 1,
    per_page: 10,
    status: undefined,
    channel_id: undefined,
    begin_pubdate: undefined,
    end_pubdate: undefined,
  },
) => {
  return async (dispatch: AppDispatch) => {
    let res = await http.get<any, ArticleStateI['articleList']>('/mp/articles', {
      params: {
        page,
        per_page,
        status,
        channel_id,
        begin_pubdate,
        end_pubdate,
      },
    });
    dispatch({ type: 'article/getArticleList', payload: res });
  };
};

// 删除文章
export const delArticle = (id: string) => {
  return async (dispatch: AppDispatch) => {
    let res = await http.delete<any>(`/mp/articles/${id}`);
    dispatch({ type: 'article/delArticle', payload: res });
  };
};
interface ArticleI {
  title: string;
  content: string;
  cover: { type: string | number; images: any[] | string };
  channel_id: number;
}
// 添加文章
export const addArticle = (data: ArticleI, draft?: boolean) => {
  return async () => {
    await http.post(`/mp/articles?draft=${draft}`, data);
  };
};

// 获取文章
export const getArticle = (id: number | string) => {
  return async () => {
    const data = await http.get(`/mp/articles/${id}`);
    return data;
  };
};

// 修改文章
/**
 *
 * @param data
 * @param draft 是否存为草稿 true: 存为草稿 false: 否
 */
export const editArticle = (data: ArticleI & { id: string }, draft: boolean) => {
  return async () => {
    await http.put(`/mp/articles/${data.id}?draft=${draft}`, data);
  };
};
