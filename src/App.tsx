import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from '@/pages/Layout';
import Login from '@/pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Layout}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
