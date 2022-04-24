interface ChannelI {
  id: number;
  name: string;
}
interface ArticleI {
  page: number;
  per_page: number;
  total_count: number;
  results: {
    id: number;
    title: string;
    status: number;
    comment_count: number;
    pubdate: string;
    cover: {
      type: number;
      images: [];
    };
    like_count: number;
    read_count: number;
  }[];
}
export interface ArticleStateI {
  // 推荐频道
  channels: ChannelI[];
  articleList: Partial<ArticleI>;
}
const initState: ArticleStateI = {
  // 频道
  channels: [],
  // 文章列表
  articleList: {},
};
const article = (state = initState, action: any) => {
  switch (action.type) {
    case 'article/getChannels':
      return {
        ...state,
        channels: action.payload,
      };
    case 'article/getArticleList':
      return {
        ...state,
        articleList: action.payload,
      };
    default:
      return state;
  }
};
export default article;
