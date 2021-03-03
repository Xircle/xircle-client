import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Intro from './pages/Intro';

const Secure = React.lazy(() => import('./pages/Secure'));
const PhoneNumber = React.lazy(() => import('./pages/PhoneNumber'));
const Login = React.lazy(() => import('./pages/Login'));
const SettingCotainer = React.lazy(() => import('./pages/SettingPages/SettingContainer'));
const MyProfile = React.lazy(() => import('./pages/HomePages/MyProfile'));
const DeveloperProfile = React.lazy(() => import('./pages/HomePages/DeveloperProfile'));
const AirpodEvent = React.lazy(() => import('./pages/HomePages/AirpodEvent'));

const App = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<div className="h-screen flex flex-row justify-center items-center" ><img style={{width: "200px", height: "200px"}} src="/yk-logo.png" /></div>}>
        <Switch>
            <Route path="/event" component={AirpodEvent} exact/>
            <Route path="/developer-profile" component={DeveloperProfile} exact/>
            <Route path="/my-profile" component={MyProfile} exact/>
            <Route path="/setting/:questionNum" component={SettingCotainer} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/secure" component={Secure} exact/>
            <Route path="/phone-number" component={PhoneNumber} exact/>
            <Route path="/" component={Intro} exact/> 
            <Redirect from="*" to="/"/>
        </Switch>
      </Suspense>
    </React.Fragment>
  )  
}

export default App;
