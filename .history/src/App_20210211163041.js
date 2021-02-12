import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Intro from './pages/Intro';
import Home from './pages/Home';

const App = () => {
  return (
    <div>
      <Suspense fallback={<p> Loading...</p>}>
        <Switch>
            <Route path="/home" component={Home} exact/>
            <Route path="/" component={Intro} exact/>
        </Switch>
      </Suspense>
    </div>
  )  
}

export default App;
