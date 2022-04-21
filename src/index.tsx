import './index.scss';
//解决无法中文 dist 下面的是 ejs 的
//https://github.com/ant-design/ant-design/issues/23891
import 'moment/dist/locale/zh-cn';

import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/zh_CN';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from '@/store';

import App from './App';
ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.querySelector('#root'),
);
