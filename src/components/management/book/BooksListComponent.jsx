import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import EsNavigationBreadcrumbs from '../../shared/EsNavigationBreadcrumbs/EsNavigationBreadcrumbs';
import InfiniteLoadingGrid from './InfiniteLoadingGrid';
import { store } from '../../../AppGlobalState';
const BooksListComponent = ({history}) => {
  let user = localStorage.getItem('user')
  if(user== 'null')
  {
    store.dispatch({type: 'SIGN_OUT'})
    window.location.replace('/');
  }
  return (
    <>
      <EsNavigationBreadcrumbs title='booksManagement'>
       </EsNavigationBreadcrumbs>
      <InfiniteLoadingGrid history={history}></InfiniteLoadingGrid>
    </>
  );
}

export default withRouter(BooksListComponent);
