import { useEffect, useState } from "react";
import { TileProps } from "../../../components/Tile/Tile";
import axios from "axios";
import api from "../../../lib/api";
import ItemBrowser from "../../../components/ItemBrowser/ItemBrowser";
import Spacer from "../../../components/Spacer/Spacer";
import { Trainer } from "../../../lib/models/Trainer";

interface TrainerBrowserProps {

}

const TrainerBrowser: React.FC<TrainerBrowserProps> = () => {
  const [tiles, setTiles] = useState<TileProps[]>([]);
  useEffect(() => {
    document.title = 'Trainers Browser';
    axios.get(api.path('/trainers/all'), { withCredentials: true }).then((res) => {
      if (res.status === 200) {
        const trainer = res.data.trainers as Trainer[];
        // console.log(trainer);
        const newTiles = []
        for(const t of trainer) {
          newTiles.push({
            id: 't-'+t.trainer_email,
            title: `${t.first_name} ${t.last_name}`,
            description: '',
            href: '/trainers/'+t.trainer_email,
          });
        }
        console.log(newTiles);
        setTiles(newTiles);
      }
    })

  }, []);
  return (
    <div className="trainer-browser">
      <Spacer />
      <ItemBrowser title="Trainers" tiles={tiles} />
    </div>
  )
}

export default TrainerBrowser;