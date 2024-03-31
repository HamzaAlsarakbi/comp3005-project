import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './../Details.css';
import axios from "axios";
import api from "../../../lib/api";
import { Equipment } from "../../../lib/models/Equipment";
import Spacer from "../../../components/Spacer/Spacer";


const EquipmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  useEffect(() => {
    axios.get(api.path(`/members/${id}`)).then((res) => {
      setEquipment(res.data);
    }).catch((err) => {
      console.error(err);
    })
    console.log(id);
  }, []);

  const getEquipment = () => {
    if (!equipment) return;
    console.log("equipment", equipment.name);
    const normalized = equipment.name.split('#')[0].toLowerCase().trim().replaceAll(' ', '-');
    console.log(normalized);
    return `/img/icons/equipment/${normalized}.png`;
  }


  return (
    <>
      <Spacer />
      <div className="details-container" >
        <div className="details-overview">
          <img className="overview-item" id="details-icon" src={getEquipment()} alt={equipment?.name ?? "Equipment Picture"} />
          <div className="overview-item" id="details-title">{equipment?.name}</div>
        </div>
        <div className="details-content">
          <div className="content-item" id="details-title">Details</div>
          <div className="content-item" id="details-body">
            <div className="details-body-item" id="equipment-name">Name: {equipment?.name}</div>
            <div className="details-body-item" id="equipment-name">Condition: {equipment?.condition}%</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EquipmentDetails;