import { Button } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Link as CLink} from '@chakra-ui/core';

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
      <div className="wrapper navbar-nav">
        <Link to={handleLinkHome}>
          <div id="home-logo" className="navbar-nav__start">
          </div>
        </Link>

        <ul className="navbar-nav__end">
          <CLink href="mailto:fikriansyah@mrizki.com">
            <Button 
              variant="ghost"
              >Contact</Button> 
          </CLink>
        </ul>
      </div>
    </div>
  );
}