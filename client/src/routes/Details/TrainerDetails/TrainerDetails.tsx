import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './../Details.css';
import axios from "axios";
import api from "../../../lib/api";
import { Trainer } from "../../../lib/models/Trainer";
import Spacer from "../../../components/Spacer/Spacer";
import { Icons } from "../../../lib/icons";
import { useSession } from "../../../components/SessionProvider/SessionProvider";
import Tabs from "../../../components/Tabs/Tabs";
import Tab from "../../../components/Tabs/Tab";


const TrainerDetails = () => {
  const { email } = useParams<{ email: string }>();
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const session = useSession();
  useEffect(() => {
    document.title = 'Trainer Profile';
    axios.get(api.path(`/trainers/${email}`)).then((res) => {
      setTrainer(res.data.trainer);
      document.title = `${trainer?.first_name ?? 'Trainer'}'s  Profile`;
    }).catch((err) => {
      console.error(err);
    });
  }, [email, trainer?.first_name, session?.email]);

  return (
    <>
      <Spacer />
      <div className="details-container" >
        <div className="details-overview">
          <img className="overview-item" id="details-icon" src={Icons.MEMBER} alt={trainer?.first_name ?? "Trainer Picture"} />
          <div className="overview-item" id="details-title">{trainer?.first_name ?? 'Unkown Trainer'} {trainer?.last_name}</div>
        </div>
        <div className="details-content">
          <div className="content-item" id="details-title">Details</div>
          <Tabs id="trainer-details">
            <Tab title="Summary">
              <div className="content-item" id="details-body">
                <div className="details-body-item" id="trainer-name">Name: {trainer?.first_name} {trainer?.last_name}</div>
                <div className="details-body-item" id="trainer-email">Email: {trainer?.trainer_email}</div>
                <div className="details-body-item" id="trainer-phone">Phone: {trainer?.phone}</div>
                <div className="details-body-item" id="trainer-gender">Gender: {trainer?.gender}</div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default TrainerDetails;