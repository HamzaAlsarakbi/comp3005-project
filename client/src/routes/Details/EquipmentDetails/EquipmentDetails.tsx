import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./../Details.css";
import { Icons } from "../../../lib/icons";
import axios from "axios";
import api from "../../../lib/api";
import { Equipment } from "../../../lib/models/Equipment";
import Spacer from "../../../components/Spacer/Spacer";
import InputBox, {
  InputPolicy,
  InputType,
} from "../../../components/InputBox/InputBox";
import IconButton from "../../../components/IconButton/IconButton";
import { Color } from "../../../lib/colors";

const EquipmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const conditionRef = useRef<InputBox>(null);
  useEffect(() => {
    document.title = `${equipment?.name} details`;
    fetchEquipment();
  }, [equipment?.condition]);

  const fetchEquipment = () => {
    axios
      .get(api.path(`/equipment/${id}`), { withCredentials: true })
      .then((res) => {
        setEquipment(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getEquipment = () => {
    if (!equipment) return;
    console.log("equipment", equipment.name);
    const normalized = equipment.name
      .split("#")[0]
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-");
    console.log(normalized);
    return `/img/icons/equipment/${normalized}.png`;
  };

  const validateInput = (value: string) => {
    const num = Number(value);
    if (isNaN(num)) return;
    if (conditionRef.current!.hasError()) return;
    console.log('test');
    if (num < 0 || num > 100) {
      conditionRef.current!.showText(
        "Condition must be between 0 and 100",
        Color.Red
      );
    } else {
      conditionRef.current!.hideText();
    }
  };

  const updateHandler = () => {
    if (conditionRef.current!.hasError()) {
      conditionRef.current!.emphasizeText();
      return;
    }
    const data = {
      equipment: {
        equipment_id: equipment?.equipment_id,
        condition: Number(conditionRef.current!.value()),
      },
    };
    axios
      .put(api.path(`/equipment/update`), data, { withCredentials: true })
      .then((res) => {
        console.log("success");
        fetchEquipment();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Spacer />
      <div className="details-container">
        <div className="details-overview">
          <img
            className="overview-item"
            id="details-icon"
            src={getEquipment()}
            alt={equipment?.name ?? "Equipment Picture"}
          />
          <div className="overview-item" id="details-title">
            {equipment?.name}
          </div>
        </div>
        <div className="details-content">
          <div className="content-item" id="details-title">
            Details
          </div>
          <div className="content-item" id="details-body">
            <div className="details-body-item" id="equipment-name">
              <h4 className="details-body-item-header" id="equipment-name">Name</h4>
              <p className="details-body-item-body" id="equipment-name">{equipment?.name}</p>
            </div>
            <div className="details-body-item" id="equipment-condition">
              <h4 className="details-body-item-header" id="equipment-condition">Condition</h4>
              <p className="details-body-item-body" id="equipment-condition">{equipment?.condition}%</p>
              <InputBox
                onInput={validateInput}
                ref={conditionRef}
                id="equipment-condition"
                inputType={InputType.INPUT}
                inputPolicy={InputPolicy.NUMBERS}
                placeholder="New Condition"
              />
            </div>
            <IconButton
              icon={Icons.TOAST_ORANGE}
              id="update"
              onClick={updateHandler}
            >
              Update
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default EquipmentDetails;
