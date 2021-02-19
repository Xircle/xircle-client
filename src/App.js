import React, { Suspense } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
// import Intro from './pages/Intro';
import Start from './pages/Start';

const Login = React.lazy(() => import('./pages/Login'));
const Univ = React.lazy(() => import('./pages/SettingPages/Univ'));
const SettingCotainer = React.lazy(() => import('./pages/SettingPages/SettingContainer'));



const App = () => {
  return (
    <div>
      <Suspense fallback={<div className="h-screen flex flex-row justify-center items-center" ><img style={{width: "200px", height: "200px"}} src="/ykring/yk-logo.png" /></div>}>
        <Switch>
           
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
