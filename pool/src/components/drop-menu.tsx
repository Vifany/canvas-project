import React, { useState } from 'react';
import Ball from '../engine/render/actors/ball';
import styled from 'styled-components';
import BouleGreen from '../assets/lesBoules/green-boule.png';
import BouleMagenta from '../assets/lesBoules/magenta-boule.png';
import BouleRed from '../assets/lesBoules/red-boule.png';
import Close from '../assets/icon.png';


interface MenuProps {
  x: number;
  y: number;
  onClose: () => void;
  selectedBall: React.RefObject<{ball:Ball | null}>;
}

const MenuContainer = styled.ul`
    padding: 8px;
    border: 1px solid black;
    border-radius: 10px;
    background: rgba(49, 54, 57, 0.9);
    width:100%;
    height:100%;
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 10px;

`
const MenuItem = styled.li`
    width:100%;
    height:100%;
    display: flex;
    justify-content: left;
    align-items: center;

`

const CustomMenu: React.FC<MenuProps> = ({ 
    x, y, onClose, 
    selectedBall 
    }) => {
  const ball = selectedBall.current? selectedBall.current.ball : null;
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(false);
    onClose();
  };

  const handleItem = (s: string) => {
    ball?.swapSprite(s);
  };
  return isOpen ? (
    <div
    style={{
        position: 'absolute',
        left: x,
        top: y,
        background: 'transparent',
        zIndex: 3000,
    }}
    onClick={handleClick}
    >
        <MenuContainer>
            <MenuItem  onClick={()=>{handleItem(BouleGreen)}}>
                <img src={BouleGreen} style={{width:30, height:30}}/>
            </MenuItem >
            <MenuItem  onClick={()=>{handleItem(BouleRed)}}>
                <img src={BouleRed} style={{width:30, height:30}}/>
            </MenuItem >
            <MenuItem  onClick={()=>{handleItem(BouleMagenta)}}>
                <img src={BouleMagenta} style={{width:30, height:30}}/>
            </MenuItem >
            <MenuItem  onClick={onClose}>
                <img src={Close} style={{width:20, height:20}}/>
            </MenuItem >
        </MenuContainer>
    </div>
  ) : null;
};

export default CustomMenu;