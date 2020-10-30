import { Button, Heading } from '@chakra-ui/core';
import React from 'react'
import { LoginMethod } from '../types';
import { AiFillFacebook, AiFillGithub, AiFillGoogleSquare } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

interface LoginProps { }


export const Login: React.FC<LoginProps> = () => {
  
  let history = useHistory();
  const handleLogin = (loginMethod: LoginMethod) => {
    alert(`Login via ${loginMethod} temporary function`);

    // Simulate success
    history.push('/dashboard');
  }
  
  return (
    <div className="login-page">
      <div className="login-page__container wrapper">
        <div className="login-page__hero">
          <Heading className="login-page__hero-text">
            <span>Visualize Your</span>
            <span>Important Data</span>
          </Heading>

          <div className="login-page__hero-image"></div>
        </div>
        <div className="login-page__oauth">
          <Button
            leftIcon={AiFillGoogleSquare}
            onClick={() => handleLogin(LoginMethod.GOOGLE)}
            height="48px"
            id="btn-oauth-google"
            >Login with Google</Button>
          <Button
            leftIcon={AiFillFacebook}
            onClick={() => handleLogin(LoginMethod.FACEBOOK)}
            height="48px"
            id="btn-oauth-facebook"
            >Login with Facebook</Button>
          <Button
            leftIcon={AiFillGithub}
            onClick={() => handleLogin(LoginMethod.GITHUB)}
            height="48px"
            id="btn-oauth-github"
            >Login with Github</Button>
        </div>
      </div>
    </div>
  );
}