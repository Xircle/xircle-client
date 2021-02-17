import React, { Suspense } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
// import Intro from './pages/Intro';
import Start from './pages/Start';
// import Login from './pages/Login';
// import Iam from './pages/Iam';

const Login = React.lazy(() => import('./pages/Login'));
const Iam = React.lazy(() => import('./pages/Iam'));

const Person = React.lazy(() => import('./pages/Person'));
const People_circle = React.lazy(() => import('./pages/People-circle'));
const Globe = React.lazy(() => import('./pages/Globe'));
const Love_me = React.lazy(() => import('./pages/Love-me'));
const MyProfile = React.lazy(() => import('./pages/MyProfile'));
const Profile = React.lazy(() => import('./pages/Profile'));
const CreateArticle = React.lazy(() => import('./pages/CreateArticle'));
const Article = React.lazy(() => import('./pages/Article'));


const App = () => {
  return (
    <div>
      <Suspense fallback={<p> Loading...</p>}>
        <Switch>
            <Route path="/person" component={Person} exact/>
            <Route path="/create-article" component={CreateArticle}/>
            <Route path="/profile/:id" component={Profile}/>
            <Route path="/article/:cnt" component={Article}/> 
            
            <Route path="/people-circle" component={People_circle}/>

            <Route path="/globe" component={Globe} />

            <Route path="/love-me" component={Love_me}/>

            <Route path="/my-profile" component={MyProfile}/>

            {/* <Route path="/" component={Intro}/> */}
            <Route path="/Iam" component={Iam}/>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Start}/>
        </Switch>
      </Suspense>
    </div>
  )  
}

export default App;
