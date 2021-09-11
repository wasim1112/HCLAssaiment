import axios from 'axios';
import moment from 'moment-hijri';
import queryString from 'query-string';
import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useLocation, withRouter } from 'react-router-dom';

import { withGlobalState } from '../../AppGlobalState';
import setLoadingState from '../../utils/setLoadingState';
import Footer from '../Footer/Footer';
import EsForm, { EsFormElement } from '../shared/esform/EsForm';

const LoginComponent = ({user, signOut, signIn, history}) => {
  const [loginError, setLoginError] = useState(false);
  const [loginErrorEnter, setLoginErrorEnter] = useState(false);
  

  if(user){
    history.push('/');
  }
  const onLogin = form => {
    if( !form.username || !form.password )
    {
     setLoginErrorEnter(true)
    return ;
    }
   var password =form.password;
   var username=form.username
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username , password })
    };

    fetch(`https://613b3c71110e000017a45522.mockapi.io/api/v1/singin`, requestOptions)
    .then(handleResponse).then(res => {
      signIn(res);
      history.push('/booksManagement');
    })
    .catch(err => setLoginError(true))
    .finally(() => setLoadingState(false));
     
}
 

  function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                useLocation.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
  }

  const loginForm = () => (
    <EsForm onSubmit={onLogin} className='bg-white py-4 px-5 shadow-sm login-box'>
      {loginError && <Alert variant='danger'><FormattedMessage id='badCredentials' /></Alert>}
      {loginErrorEnter && <Alert variant='danger'><FormattedMessage id='needEnterUsernameAndPassword' /></Alert>}
      <EsFormElement type='text' name='username' labelId='username' maxlength='25' className='p-0' labelClassName='m-0' inputClassName='m-0' stretch />
      <EsFormElement type='password' name='password' labelId='password' className='p-0 pt-3' labelClassName='m-0' inputClassName='m-0' stretch />
      <Button type='submit' block className='mt-3 mb-3 mr-0'><FormattedMessage id='login' /></Button>
      <div className="small d-flex justify-content-between mt-2">
      </div>
     
    </EsForm>
  )



  const logout = () => {
    axios.post('/api/logout').then(res => {
      signOut();
      history.push('/');
    })
  }
  return (
    <>
      <div className="login__wrapper">
        <div className="login__right">
          <div className="login__content">
            <div  className="my-4 text-primary">
            </div>
            <br></br><br></br>
            {loginForm()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withGlobalState(withRouter(LoginComponent));
