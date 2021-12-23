import React from 'react';
import { Navigate, useLocation, Route } from 'react-router-dom';

import { useAuthState } from '../Context';

function RequireAuth({children}) {
    let user = useAuthState();
    let location = useLocation();
  
    if (!user.token) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} />;
    }
  
    return children;
  }

export default RequireAuth