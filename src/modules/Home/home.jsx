import React from 'react';
import {withGlobalState} from '../../AppGlobalState';

export default withGlobalState(({user, history}) => {

  if (!user) {
    history.push('/login');
  }

  return (
      <div />
  )
});
