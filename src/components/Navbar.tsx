import React from 'react';
import {Button} from 'primereact/button';

interface NavbarProps {
  title?: String
}

export const Navbar: React.FC<NavbarProps> = ({title="visualizer"}) => {

  

  return (
    <div className="navbar">
      <div className="wrapper p-d-flex p-jc-between p-ai-center">
        <div id="home-logo" className="navbar__start">
        </div>

        <ul className="navbar__end">
          <a href="mailto:fikriansyah@mrizki.com">
            <Button label="Contact" className="p-button-text" />
          </a>
        </ul>
      </div>
    </div>
  );
}