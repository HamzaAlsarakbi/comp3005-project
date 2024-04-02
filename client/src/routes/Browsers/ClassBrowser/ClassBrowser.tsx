import { useEffect, useState } from "react";
import { TileProps } from "../../../components/Tile/Tile";
import axios from "axios";
import api from "../../../lib/api";
import ItemBrowser from "../../../components/ItemBrowser/ItemBrowser";
import Spacer from "../../../components/Spacer/Spacer";
import { Class } from "../../../lib/models/Class";





interface ClassBrowserProps {

}

const ClassBrowser: React.FC<ClassBrowserProps> = () => {
  const [tiles, setTiles] = useState<TileProps[]>([]);
  useEffect(() => {
    document.title = 'Classes Browser';
    axios.get(api.path('/classes/all'), { withCredentials: true }).then((res) => {
      if (res.status === 200) {
        const classes = res.data.classes as Class[];
        // console.log(class);
        const newTiles = []
        for(const c of classes) {
          newTiles.push({
            id: 'c-'+c.class_id,
            title: c.name,
            description: c.description,
            href: '/classes/'+c.class_id,
          });
        }
        console.log(newTiles);
        setTiles(newTiles);
      }
    })

  }, []);
  return (
    <div className="class-browser">
      <Spacer />
      <ItemBrowser title="Classes" tiles={tiles} />
    </div>
  )
}

export default ClassBrowser;