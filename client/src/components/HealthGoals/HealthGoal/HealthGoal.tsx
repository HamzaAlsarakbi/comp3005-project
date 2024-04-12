import axios from "axios";
import { Icons } from "../../../lib/icons"
import IconButton from "../../IconButton/IconButton"
import api from "../../../lib/api";
import { HealthGoal } from "../../../lib/models/HealthGoal";
import InputBox, { InputPolicy, InputType } from "../../InputBox/InputBox";
import { useEffect, useRef } from "react";

interface HealthGoalProps {
  healthGoal: HealthGoal;
  id: number;
  onUpdate(): void;
}


const HealthGoalC: React.FC<HealthGoalProps> = ({ healthGoal, id, onUpdate }) => {
  const descriptionRef = useRef<InputBox>(null);
  useEffect(() => {

  }, [healthGoal, id]);
  const updateHandler = () => {
    if(descriptionRef.current!.hasError()) {
      descriptionRef.current!.emphasizeText();
      return;
    }
    const data = {
      health_goal: {
        health_goal_id: healthGoal.health_goal_id,
        member_email: healthGoal.member_email,
        description: descriptionRef.current!.value(),
      }
    }
    axios.put(api.path('/health-goals/update'), data, { withCredentials: true }).then((res) => {
      onUpdate();
    });
  }

  const deleteHandler = () => {
    axios.delete(api.path('/health-goals/delete/'+healthGoal.health_goal_id), { withCredentials: true }).then((res) => {
      onUpdate();
    });
  }
  return (
    <div className="health-goal" key={id} id={`health-goal-${id}`}>
      <h3>Health Goal {id + 1}</h3>
      <h4>Description</h4>
      <InputBox ref={descriptionRef} id="description" inputType={InputType.TEXTAREA} inputPolicy={InputPolicy.WORDS} placeholder="Description" value={healthGoal.description} />
      <IconButton icon={Icons.TOAST_ORANGE} id={`update-${id}`} onClick={updateHandler}>Update</IconButton>
      <IconButton icon={Icons.TOAST_RED} id={`delete-${id}`} onClick={deleteHandler}>Delete</IconButton>
    </div>
  )
}

export default HealthGoalC;