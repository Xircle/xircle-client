import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Intro from './pages/Intro';

const Secure = React.lazy(() => import('./pages/Secure'));
const Auth = React.lazy(() => import('./pages/Auth/Auth'));
const Login = React.lazy(() => import('./pages/Auth/Login'));
const FindAuth = React.lazy(() => import('./pages/Auth/FindAuth'));
const Start = React.lazy(() => import('./pages/Auth/Start'));
const SettingCotainer = React.lazy(() => import('./pages/SettingPages/SettingContainer'));
const MyProfile = React.lazy(() => import('./pages/HomePages/MyProfile'));
const FriendProfile = React.lazy(() => import('./pages/HomePages/FriendProfile'));
const DeveloperProfile = React.lazy(() => import('./pages/HomePages/DeveloperProfile'));
const AirpodEvent = React.lazy(() => import('./pages/HomePages/AirpodEvent'));

const App = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<div className="h-screen flex flex-row justify-center items-center" ><img style={{width: "200px", height: "200px"}} alt="splash" src="/Logo/Xircle_Logo.svg" /></div>}>
        <Switch>
            <Route path="/event" component={AirpodEvent} exact/>
            <Route path="/developer-profile" component={DeveloperProfile} exact/>
            <Route path="/friend-profile" component={FriendProfile} exact/>
            <Route path="/my-profile" component={MyProfile} exact/>
            <Route path="/setting/:questionNum" component={SettingCotainer} exact/>
            <Route path="/auth" component={Auth} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/start" component={Start} exact/>
            <Route path="/find-auth" component={FindAuth} exact/>
            <Route path="/secure" component={Secure} exact/>
            <Route path="/" component={Intro} exact/> 
            <Redirect from="*" to="/"/>
        </Switch>
      </Suspense>
    </React.Fragment>
  )  
}

export default App;
