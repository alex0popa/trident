import { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';
import { User } from './types';

export const PrivateRoute = ({ element }: { element:JSX.Element }) => {
  const [destination, setDestination] = useState(<></>);
  
  useEffect(() => {
    const getUser = async () => {
      fetch('/api/user')
        .then(response => response.json())
        .then((user: User | null) => {
          setDestination(user?.name ? element : <Navigate to="/unauthorized" />)
        })
        .catch(() => setDestination(<Navigate to="/unauthorized" />))
    };

    getUser();
  }, [element]);

  return destination;
};
