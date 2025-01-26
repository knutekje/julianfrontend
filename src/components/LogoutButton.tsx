import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login'); 
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white bg-red-500 hover:bg-red-600 p-2 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
