import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Start from './pages/Start';

const Secure = React.lazy(() => import('./pages/Secure'));
const Login = React.lazy(() => import('./pages/Login'));
const SettingCotainer = React.lazy(() => import('./pages/SettingPages/SettingContainer'));
const MyProfile = React.lazy(() => import('./pages/HomePages/MyProfile'));



const App = () => {
  return (
    <div>
      <Suspense fallback={<div className="h-screen flex flex-row justify-center items-center" ><img style={{width: "200px", height: "200px"}} src="/yk-logo.png" /></div>}>
        <Switch>
        
            <Route path="/my-profile" component={MyProfile}/>
            <Route path="/setting/:questionNum" component={SettingCotainer}/>
            <Route path="/login" component={Login}/>
            <Route path="/secure" component={Secure}/>
            <Route path="/" component={Start} exact/> 
        </Switch>
      </Suspense>
    </div>
  )  
}

export default App;
