import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthRoute from '@/components/AuthRoute';
import Layout from '@/pages/Layout';
import Login from '@/pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login}></Route>
          <AuthRoute path="/" component={Layout}></AuthRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
