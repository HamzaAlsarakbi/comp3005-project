import { useEffect, useState } from "react";
import { TileProps } from "../../../components/Tile/Tile";
import axios from "axios";
import api from "../../../lib/api";
import ItemBrowser from "../../../components/ItemBrowser/ItemBrowser";
import Spacer from "../../../components/Spacer/Spacer";
import { Room } from "../../../lib/models/Room";



interface RoomBrowserProps {

}

const RoomBrowser: React.FC<RoomBrowserProps> = () => {
  const [tiles, setTiles] = useState<TileProps[]>([]);
  useEffect(() => {
    document.title = 'Rooms Browser';
    axios.get(api.path('/rooms/all'), { withCredentials: true }).then((res) => {
      if (res.status === 200) {
        const room = res.data.rooms as Room[];
        // console.log(room);
        const newTiles = []
        for(const r of room) {
          newTiles.push({
            id: 'r-'+r.room_id,
            title: r.name,
            description: '',
            href: '/rooms',
          });
        }
        console.log(newTiles);
        setTiles(newTiles);
      }
    })

  }, []);
  return (
    <div className="room-browser">
      <Spacer />
      <ItemBrowser title="Rooms" tiles={tiles} />
    </div>
  )
}

export default RoomBrowser;