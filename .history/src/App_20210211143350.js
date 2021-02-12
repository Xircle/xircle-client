import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import IntroPage from './Containers/IntroPage';

const App = () => {
  let routes = (
    <Suspense fallback={<p> Loading...</p>}>
      <Switch>
          <Route path="/apps" component={}/>
          <Route path="/" component={IntroPage} exact/>
      </Switch>
    </Suspense>
  )
  return (
    <div>
      {routes}
    </div>
  )  
}

export default App;
