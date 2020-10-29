import React from 'react';
import {Button} from 'primereact/button';
import { Link } from 'react-router-dom';

interface NavbarProps {
  title?: String
}

const handleLinkHome = (location: any) => {

  // TODO checks whether the user logs in
  // go to dashboard if he is,
  // otherwise go to login
  return {...location, pathname: '/'};
}

export const Navbar: React.FC<NavbarProps> = ({title="visualizer"}) => {
  return (
    <div className="navbar">
      <div className="wrapper p-d-flex p-jc-between p-ai-center">
        <Link to={handleLinkHome}>
          <div id="home-logo" className="navbar__start">
          </div>
        </Link>

        <ul className="navbar__end">
          <a href="mailto:fikriansyah@mrizki.com">
            <Button label="Contact" className="p-button-text" />
          </a>
        </ul>
      </div>
    </div>
  );
}