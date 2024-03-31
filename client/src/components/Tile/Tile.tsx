import { Link } from 'react-router-dom';
import './Tile.css';

export interface TileProps {
  id: string;
  title: string;
  description: string;
  href: string;
  img?: string;
}


const Tile: React.FC<TileProps> = ({ id, title, description, href, img }) => {
  return (
    <Link to={href}>
      <div className="tile" id={id}>
        <div className="tile-title" id={id}>{title}</div>
        <div className="tile-description" id={id}>{description}</div>
      </div>
    </Link>
  )
}

export default Tile;