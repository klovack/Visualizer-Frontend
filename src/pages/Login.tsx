import React from 'react'
import { LoginMethod } from '../types';

interface LoginProps { }

const handleLogin = (loginMethod: LoginMethod) => {
  alert(`Login via ${loginMethod}`);
}

export const Login: React.FC<LoginProps> = () => {
  return (
    <div className="login-page">
      <div className="login-page__container wrapper">
        <div className="login-page__hero">
          <h1 className="login-page__hero-text">
            <span>Visualize Your</span>
            <span>Important Data</span>
          </h1>

          <div className="login-page__hero-image"></div>
        </div>
        <div className="login-page__oauth">
          <button
            onClick={() => handleLogin(LoginMethod.GOOGLE)}
            className=""
            id="btn-oauth-google"
            >Login with Google</button>
          <button
            onClick={() => handleLogin(LoginMethod.FACEBOOK)}
            className=""
            id="btn-oauth-facebook"
            >Login with Facebook</button>
          <button
            onClick={() => handleLogin(LoginMethod.GITHUB)}
            className=""
            id="btn-oauth-github"
            >Login with Github</button>
        </div>
      </div>
    </div>
  );
}