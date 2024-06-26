import { useEffect, useState } from "react";
import { TileProps } from "../../../components/Tile/Tile";
import axios from "axios";
import api from "../../../lib/api";
import ItemBrowser from "../../../components/ItemBrowser/ItemBrowser";
import Spacer from "../../../components/Spacer/Spacer";
import { Equipment } from "../../../lib/models/Equipment";



interface EquipmentBrowserProps {

}

const EquipmentBrowser: React.FC<EquipmentBrowserProps> = () => {
  const [tiles, setTiles] = useState<TileProps[]>([]);
  useEffect(() => {
    document.title = 'Equipment Browser';
    axios.get(api.path('/equipment/all'), { withCredentials: true }).then((res) => {
      if (res.status === 200) {
        const equipment = res.data.equipment as Equipment[];
        // console.log(equipment);
        const newTiles = []
        for(const e of equipment) {
          newTiles.push({
            id: 'e-'+e.equipment_id,
            title: e.name,
            description: '',
            href: '/equipment/'+e.equipment_id,
          });
        }
        console.log(newTiles);
        setTiles(newTiles);
      }
    })

  }, []);
  return (
    <div className="equipment-browser">
      <Spacer />
      <ItemBrowser title="Equipment" tiles={tiles} />
    </div>
  )
}

export default EquipmentBrowser;