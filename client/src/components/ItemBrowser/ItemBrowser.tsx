import './ItemBrowser.css';
import Tile, { TileProps } from "../Tile/Tile";
import InputBox, { InputType } from '../InputBox/InputBox';
import { useEffect, useState } from 'react';

export interface ItemBrowserProps {
  title: string;
  tiles: TileProps[];
}


const ItemBrowser: React.FC<ItemBrowserProps> = ({ title, tiles }) => {
  const [visibleTiles, setVisibleTiles] = useState<boolean[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(0);
  useEffect(() => {
    setVisibleTiles(Array(tiles.length).fill(true));
    setVisibleCount(tiles.length);
  }, [tiles]);

  const searchHandler = (value: string) => {
    const newTiles = Array(tiles.length).fill(false);
    let newvisible = 0;
    for(let i = 0; i < tiles.length; i++) {
      if(tiles[i].title.toLowerCase().includes(value.toLowerCase())) {
        newTiles[i] = true;
        newvisible++;
      }
    }
    setVisibleTiles(newTiles);
    setVisibleCount(newvisible);
  }

  return (
    <div className="item-browser">
      <div className="item-browser-section item-browser-title">{title}</div>
      <div className="item-browser-section item-browser-search">
        <InputBox id="search" inputType={InputType.INPUT} optional placeholder={`Search for ${title.toLowerCase()}`} onInput={searchHandler}/>
        <p>Showing {visibleCount} {title.toLowerCase()}</p>
      </div>
      <div className="item-browser-section item-browser-body">
        {tiles.map((e, i) => (
          <div className="tile-wrapper" key={e.id}>
          {visibleTiles[i] ?
            <Tile key={e.id} title={e.title} description={e.description} href={e.href} id={e.id} img={e.img} />
            : <></>
          }
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default ItemBrowser;