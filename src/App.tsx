/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Intro from './pages/Intro';
import { Global, css } from '@emotion/react';
import normalize from 'emotion-normalize';
import { PortalProvider } from './providers/PortalProviders';

const Secure = React.lazy(() => import('./pages/Secure'));
const Splash = React.lazy(() => import('./pages/Splash'));
const Auth = React.lazy(() => import('./components/Auth/Auth'));
const Login = React.lazy(() => import('./pages/Auth/Login'));
const FindAuth = React.lazy(() => import('./pages/Auth/FindAuth'));
const Start = React.lazy(() => import('./pages/Auth/Start'));
const MyProfile = React.lazy(() => import('./pages/HomePages/Profile/MyProfile_'));
const FriendProfile = React.lazy(() => import('./pages/HomePages/Profile/FriendProfile'));
const AirpodEvent = React.lazy(() => import('./pages/HomePages/Profile/AirpodEvent'));
const CreateArticle = React.lazy(() => import('./pages/HomePages/Profile/createArticle'));
const ProfileEdit = React.lazy(() => import('./pages/HomePages/Profile/ProfileEdit'));
const ArticleDetail = React.lazy(() => import('./pages/HomePages/Profile/ArticleDetail'));
const ArticleEdit = React.lazy(() => import('./pages/HomePages/Profile/ArticleEdit'));
const SearchFriend = React.lazy(() => import('./pages/HomePages/Search/SearchFriend'));
const Chatting = React.lazy(() => import('./pages/HomePages/Chatting/Chatting'));
const ChattingRoom = React.lazy(() => import('./components/Chatting/ChattingRoom/ChattingRoomContainer'));

const App = () => {
  return (
    <PortalProvider>
      <Global 
        styles={css`
          ${normalize}
          body {
            background-color: #E4E4E4;
          }
          div, p, h1, h2, h3, h4, h5 {
            margin: 0px;
            font-size: 1em;
            font-weight: normal;
            font-family: 'Noto Sans KR', sans-serif
          }
          p {
            font-family: 'Noto Sans KR', sans-serif;
          }
          input {
            font-size: 17px !important;
          }
        `}
      />
      <Suspense fallback={<div css={css`min-height: 100vh; display: flex; justify-content: center; align-items: center;`} ><img style={{width: "200px", height: "200px"}} alt="splash" src="/Logo/Xircle_Logo.svg" /></div>}>
        <Switch>
          <Route path="/select" component={Splash} exact/>
          <Route path="/secure" component={Secure} exact/>
          <Route path="/auth" component={Auth} exact/>
          <Route path="/login" component={Login} exact/>
          <Route path="/find-auth" component={FindAuth} exact/>
          <Route path="/start" component={Start} exact/>
          <Route path="/event" component={AirpodEvent} exact/>
          <Route path="/friend-profile" component={FriendProfile} exact/>
          <Route path="/my-profile" component={MyProfile} exact/>
          <Route path="/chat" component={Chatting} exact/>
          <Route path="/chat/:displayName" component={ChattingRoom} exact/>
          <Route path="/my-profile/edit" component={ProfileEdit} exact/>
          <Route path="/createArticle/:questionNum" component={CreateArticle} exact/>
          <Route path="/:who/article/:interest/:postNum" component={ArticleDetail} exact/>
          <Route path="/article/edit" component={ArticleEdit} exact/>
          <Route path="/search" component={SearchFriend} exact/>
          <Route path="/" component={Intro} exact/> 
        </Switch>
      </Suspense>
    </PortalProvider>
  )  
}

export default App;
