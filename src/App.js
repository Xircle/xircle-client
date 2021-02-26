import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './styles/main.css';
import Intro from './pages/Intro';

const Start = React.lazy(() => import('./pages/Start'));
const Secure = React.lazy(() => import('./pages/Secure'));
const Login = React.lazy(() => import('./pages/Login'));
const SettingCotainer = React.lazy(() => import('./pages/SettingPages/SettingContainer'));
const MyProfile = React.lazy(() => import('./pages/HomePages/MyProfile'));



const App = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<div className="h-screen flex flex-row justify-center items-center" ><img style={{width: "200px", height: "200px"}} src="/yk-logo.png" /></div>}>
        <Switch>
            <Route path="/my-profile" component={MyProfile} exact/>
            <Route path="/setting/:questionNum" component={SettingCotainer} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/secure" component={Secure} exact/>
            <Route path="/start" component={Start} exact/>
            <Route path="/" component={Intro} exact/> 
            <Redirect from="*" to="/"/>
        </Switch>
      </Suspense>
    </React.Fragment>
  )  
}

export default App;
