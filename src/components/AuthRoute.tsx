import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { getToken } from '@/utils';
interface PropsI {
  path: string;
  component: React.ComponentType;
  // 剩余参数
  [key: string]: any;
}
export default function AuthRoute({ path, component: Components }: PropsI) {
  return (
    <Route
      path={path}
      render={(props) => {
        if (!getToken()) {
          return <Redirect to={{ pathname: '/login', state: props.location.pathname }} />;
        }
        return <Components />;
      }}
    ></Route>
  );
}
