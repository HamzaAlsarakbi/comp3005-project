import React from 'react';
import { Icons } from '../../lib/icons';
import './IconButton.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface IconButtonProps {
  name: string;
  icon: Icons;
  href: string;
  className: string;
  id: string;
}


const IconButton: React.FC<IconButtonProps> = ({ name, icon, href, className, id }) => {
  return (
    <a className={`icon-button ${className}`} id={id} href={href}>
      <div className={`icon-button-icon ${className}`} id={id}>
        <LazyLoadImage src={icon} alt={id} className={`icon-button-img ${className}`} id={id}/>
      </div>
      <span className={`icon-button-span ${className}`} id={id}>
        {name}
      </span>
    </a>
  )
};

export default IconButton