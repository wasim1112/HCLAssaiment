import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

const EsNavigationBreadcrumbs = ({intermediatePaths, title, children}) => {
  return(
    <div className='hcl__wrapper container'>
      <nav className='hcl__BQ'>
       
      </nav>
      <section className='content__header center mt-2 mb-4'>
        <h2 className='page__title'><FormattedMessage id={title} /></h2>
        {children}
      </section>
    </div>
  );
}

export default withRouter(EsNavigationBreadcrumbs);
