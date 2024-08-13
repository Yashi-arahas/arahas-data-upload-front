import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const DefaultHeader = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const onKnowYourCityClick = () => {
    navigate('/csi/kyc'); // Redirect to /csi/kyc
  };

  const onLogoutClick = () => {
    navigate('/csi'); // Redirect to /csi
  };

  return (
    <header className="flex align-items-center justify-content-end">
      <div className="w-3 p-1 ">
        <Button 
          label="Know Your City" 
          icon="pi pi-info-circle" 
          className="p-button-primary mr-3 ml-4" 
          onClick={onKnowYourCityClick} 
          size='small'
        />
        <Button 
          label="Logout" 
          icon="pi pi-sign-out" 
          className="p-button-secondary" 
          onClick={onLogoutClick} 
          size='small'
        />
      </div>
    </header>
  );
};

export default DefaultHeader;
