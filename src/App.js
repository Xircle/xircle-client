import React, { Suspense } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
// import Intro from './pages/Intro';
import Start from './pages/Start';

const Login = React.lazy(() => import('./pages/Login'));
const Univ = React.lazy(() => import('./pages/SettingPages/Univ'));
const SettingCotainer = React.lazy(() => import('./pages/SettingPages/SettingContainer'));

const Person = React.lazy(() => import('./pages/Person'));
const FriendPage = React.lazy(() => import('./pages/FriendPage'));
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
            <Route path="/friend" component={FriendPage} exact/>
            <Route path="/person" component={Person} exact/>
            <Route path="/create-article" component={CreateArticle}/>
            <Route path="/profile/:id" component={Profile}/>
            <Route path="/article/:cnt" component={Article}/> 
            
            <Route path="/people-circle" component={People_circle}/>

            <Route path="/globe" component={Globe} />

            <Route path="/love-me" component={Love_me}/>

            <Route path="/my-profile" component={MyProfile}/>

            {/* <Route path="/" component={Intro}/> */}
            <Route path="/setting/:questionNum" component={SettingCotainer}/>
            <Route path="/univ" component={Univ}/>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Start} exact/> 
        </Switch>
      </Suspense>
    </div>
  )  
}

export default App;
