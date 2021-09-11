import axios from 'axios';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { store } from './AppGlobalState';
import Footer from './components/Footer/Footer';
import Header from './components/header/HeaderComponent';
import BooksListComponent from './components/management/book/BooksListComponent';
import ViewBookComponent from './components/management/book/ViewBookComponent';
import LoginComponent from './components/not-signed-in/LoginComponent';
import en from './i18n/en';
import Home from './modules/Home/home';

// logout after 403 or 500
axios.interceptors.response.use(response => response, error => {
  if((error.response.status === 403  || error.response.status === 500) && !error.request.responseURL.includes('/api/login')){
    store.dispatch({type: 'SIGN_OUT'})
    window.location.replace('/');
  }
  return Promise.reject(error);
});

// language
const html = document.getElementsByTagName('html')[0];
html.dir = store.getState().lang == 'ar' ? 'rtl' : 'ltr';

const PrivateRoute = props => {
  const user = store.getState().user;
  if(props.allowedPrivileges && (!user)){
    return <Redirect to='/' />
  }else{
    if(props.noWrapper){
      return <Route {...props} />;
    }else{
      return (
       <>
          <Header />
          <div className="hcl__wrapper container main-padding-bottom">
            <Route {...props} />
          </div>
          <Footer />
          </>
      
      );
    }
    
  }
}

export default () =>
<ReduxProvider store={store}>
  <IntlProvider locale={store.getState().lang} messages={en}>
    <BrowserRouter>
      <Switch>

          <PrivateRoute
            exact
            path='/'
            component={Home} />



          
          <PrivateRoute
            noWrapper
            exact
            path='/login'
            component={LoginComponent} />


         
          <PrivateRoute
            exact
            path='/booksManagement'
            component={BooksListComponent}
             />
          <PrivateRoute
            exact
            path='/viewBook'
            component={ViewBookComponent}
             />
        
      

          <Redirect to='/login' />

      </Switch>
    </BrowserRouter>
  </IntlProvider>
</ReduxProvider>
