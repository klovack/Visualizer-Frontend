import React from 'react'
import { Button } from 'primereact/button';
import { LoginMethod } from '../types';

interface LoginProps { }

const handleLogin = (loginMethod: LoginMethod) => {
  alert(`Login via ${loginMethod}`);
}

export const Login: React.FC<LoginProps> = () => {
  return (
    <div className="login-page">
      <div className="wrapper p-grid p-align-center p-mt-6 vertical-container p-justify-center">
        <div className="login-page__hero p-col-4">
          <h1 className="login-page__hero-text">
            <span>Visualize Your</span>
            <span>Important Data</span>
          </h1>

          <div className="login-page__hero-image"></div>
        </div>
        <div className="login-page__oauth p-p-6 p-col-4 p-d-flex p-flex-column">
          <Button
            onClick={() => handleLogin(LoginMethod.GOOGLE)}
            icon="pi pi-google"
            className="p-shadow-4"
            id="btn-oauth-google"
            label="Login with Google" />
          <Button
            onClick={() => handleLogin(LoginMethod.FACEBOOK)}
            icon="pi pi-facebook"
            className="p-shadow-4"
            id="btn-oauth-facebook"
            label="Login with Facebook" />
          <Button
            onClick={() => handleLogin(LoginMethod.GITHUB)}
            icon="pi pi-github"
            className="p-shadow-4"
            id="btn-oauth-github"
            label="Login with GitHub" />
        </div>
      </div>
    </div>
  );
}