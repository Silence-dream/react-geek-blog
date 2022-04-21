import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// 让 redux 支持异步 action
import thunk from 'redux-thunk';

import rootReducer from '@/store/reducers';
const middlewares = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, middlewares);
// 导出 Dispatch 类型
export type AppDispatch = typeof store.dispatch;
// 导出 Store 类型
export type AppStore = ReturnType<typeof rootReducer>;
export default store;
