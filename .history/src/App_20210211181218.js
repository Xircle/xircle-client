import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Intro from './pages/Intro';

const Person = React.lazy(() => import('./pages/Person'));
const People_circle = React.lazy(() => import('./pages/People-circle'));
const Globe = React.lazy(() => import('./pages/Globe'));
const Love_me = React.lazy(() => import('./pages/Love-me'));
const Profile = React.lazy(() => import('./pages/Profile'));

const App = () => {
  return (
    <div>
      <Suspense fallback={<p> Loading...</p>}>
        <Switch>
            <Route path="/person" component={Person} exact/>
            <Route path="/people-circle" component={People_circle} exact/>
            <Route path="/globe" component={Globe} exact/>
            <Route path="/love-me" component={Love_me} exact/>
            <Route path="/profile" component={Home} exact/>
            <Route path="/" component={Intro} exact/>
        </Switch>
      </Suspense>
    </div>
  )  
}

export default App;
