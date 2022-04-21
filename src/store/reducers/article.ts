interface ChannelI {
  id: number;
  name: string;
}
export interface ArticleStateI {
  // 推荐频道
  channels: ChannelI[];
}
const initState: ArticleStateI = {
  channels: [],
};
const article = (state = initState, action: any) => {
  switch (action.type) {
    case 'article/getChannels':
      return {
        ...state,
        channels: action.payload,
      };
    default:
      return state;
  }
};
export default article;
