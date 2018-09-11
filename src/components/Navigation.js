import React from 'react';

import NavigationAuth from './NavigationAuth';
import NavigationNonAuth from './NavigationNonAuth';



const Navigation = ({ authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>


export default Navigation;
