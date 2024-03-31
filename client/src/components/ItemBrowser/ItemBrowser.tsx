import './ItemBrowser.css';
import Tile, { TileProps } from "../Tile/Tile";

export interface ItemBrowserProps {
  title: string;
  tiles: TileProps[];
}


const ItemBrowser: React.FC<ItemBrowserProps> = ({ title, tiles }) => {
  return (
    <div className="item-browser">
      <div className="item-browser-section item-browser-title">{title}</div>
      <div className="item-browser-section item-browser-body">
        {tiles.map(e => (
          <Tile key={e.id} title={e.title} description={e.description} href={e.href} id={e.id} img={e.img}></Tile>
        ))
        }
      </div>
    </div>
  )
}

export default ItemBrowser;