import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import EsNavigationBreadcrumbs from '../../shared/EsNavigationBreadcrumbs/EsNavigationBreadcrumbs';
import InfiniteLoadingGrid from './InfiniteLoadingGrid';

const BooksListComponent = ({history}) => {
  return (
    <>
      <EsNavigationBreadcrumbs title='booksManagement'>
       </EsNavigationBreadcrumbs>
      <InfiniteLoadingGrid history={history}></InfiniteLoadingGrid>
    </>
  );
}

export default withRouter(BooksListComponent);
