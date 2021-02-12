import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Intro from './pages/Intro';
import a from './pages/Home';

const App = () => {
  return (
    <div>
      <Suspense fallback={<p> Loading...</p>}>
        <Switch>
            <Route path="/apps" component={IntroPage} exact/>
            <Route path="/" component={Intro} exact/>
        </Switch>
      </Suspense>
    </div>
  )  
}

export default App;
