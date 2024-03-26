import React, { useEffect } from 'react';
import { Icons } from '../../lib/icons';
import './IconButton.css';

interface IconButtonProps {
  children: string;
  icon: Icons;
  className: string;
  id: string;
  onClick(): void;
}


const IconButton: React.FC<IconButtonProps> = ({ children, icon, onClick, className, id }) => {
  return (
    <div className={`icon-button ${className}`} id={id} onClick={onClick}>
      <div className={`icon-button-icon ${className}`} id={id}>
        <img src={icon} alt={id} className={`icon-button-img ${className}`} id={id}/>
      </div>
      <span className={`icon-button-span ${className}`} id={id}>
        {children}
      </span>
    </div>
  )
};

export default IconButton