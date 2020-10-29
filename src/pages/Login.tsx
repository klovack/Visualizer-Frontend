import React from 'react'

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  return (
    <div className="login-page">
      <div className="wrapper p-grid p-align-center vertical-container p-justify-center">
        <div className="login-page__hero p-col-4">
          <h1 className="login-page__hero-text">Visualize Your Important Data</h1>
        </div>
        <div className="login-page__oauth p-col-4">

        </div>
      </div>
    </div>
  );
}