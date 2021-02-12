import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  let routes = (
    <Suspense fallback={<p> Loading...</p>}>
        <Switch>
            <Route path="/checkout" component={asyncCheckout}/>
            <Route path="/orders" component={asyncOrders}/>
            <Route path="/Logout" component={Logout}/>
            <Route path="/" component={BurgerBuilder}/>
        </Switch>
    </Suspense>
  )
  return (
    <div>

    </div>
  )  
}

export default App;
