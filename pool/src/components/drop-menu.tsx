import React, { useState } from 'react';
import Ball from '../engine/render/actors/ball';

interface MenuProps {
  x: number;
  y: number;
  onClose: () => void;
  ballsR: any;
}

const CustomMenu: React.FC<MenuProps> = ({ x, y, onClose, ballsR }) => {
  const balls = ballsR.current;
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(false);
    onClose();
  };

  const handleItem = () => {
    console.log(`Ball speed ${balls[0].getSpeed()}`);
    balls[0].setSpeed(2);
  };
  return isOpen ? (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        backgroundColor: 'white',
        border: '1px solid black',
        padding: '8px',
        width: '200px',
        height: '100px',
        zIndex: 3000,
      }}
      onClick={handleClick}
    >
      <ul>
        <li onClick={handleItem}>Menu Item 1</li>
        <li>Menu Item 2</li>
        <li>Menu Item 3</li>
      </ul>
    </div>
  ) : null;
};

export default CustomMenu;