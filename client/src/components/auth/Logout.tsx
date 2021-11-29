import { useNavigate } from 'react-router-dom';

import { logout } from './helpers/logout';

export const Logout = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => logout().then(() => navigate('/'));

  return  (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};
