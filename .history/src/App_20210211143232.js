import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';


const App = () => {
  let routes = (
    <Suspense fallback={<p> Loading...</p>}>
      <Switch>
          <Route path="/" component={asyncCheckout}/>
          <Route path="/" component={BurgerBuilder} exact/>
      </Switch>
    </Suspense>
  )
  return (
    <div>
      {routes}
    </div>
  )  
}

export default App;
