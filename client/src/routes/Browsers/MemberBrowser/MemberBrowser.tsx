import { useEffect, useState } from "react";
import { TileProps } from "../../../components/Tile/Tile";
import axios from "axios";
import api from "../../../lib/api";
import ItemBrowser from "../../../components/ItemBrowser/ItemBrowser";
import Spacer from "../../../components/Spacer/Spacer";
import { Member } from "../../../lib/models/Member";


interface MemberBrowserProps {

}

const MemberBrowser: React.FC<MemberBrowserProps> = () => {
  const [tiles, setTiles] = useState<TileProps[]>([]);
  useEffect(() => {
    axios.get(api.path('/members/all'), { withCredentials: true }).then((res) => {
      if (res.status === 200) {
        const member = res.data.members as Member[];
        // console.log(member);
        const newTiles = []
        for(const m of member) {
          newTiles.push({
            id: 'm-'+m.member_email,
            title: `${m.first_name} ${m.last_name}`,
            description: '',
            href: '/members/'+m.member_email,
          });
        }
        console.log(newTiles);
        setTiles(newTiles);
      }
    })

  }, []);
  return (
    <div className="member-browser">
      <Spacer />
      <ItemBrowser title="Members" tiles={tiles} />
    </div>
  )
}

export default MemberBrowser;