import './App.scss';

import { Route, Router, Switch } from 'react-router-dom';

import AuthRoute from '@/components/AuthRoute';
import Layout from '@/pages/Layout';
import Login from '@/pages/Login';
import { customHistory } from '@/utils/history';
function App() {
  return (
    <Router history={customHistory}>
      <div className="app">
        <Switch>
          <Route path="/login" component={Login}></Route>
          <AuthRoute path="/" component={Layout}></AuthRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
