import axios from "axios";
import { Icons } from "../../../lib/icons"
import IconButton from "../../IconButton/IconButton"
import api from "../../../lib/api";
import { FitnessAchievement } from "../../../lib/models/FitnessAchievement";
import InputBox, { InputPolicy, InputType } from "../../InputBox/InputBox";
import { useEffect, useRef } from "react";

interface FitnessAchievementProps {
  fitnessAchievement: FitnessAchievement;
  id: number;
  onUpdate(): void;
}



const  FitnessAchievementC: React.FC<FitnessAchievementProps> = ({ fitnessAchievement, id, onUpdate }) => {
  const descriptionRef = useRef<InputBox>(null);
  useEffect(() => {

  }, [fitnessAchievement, id]);
  const updateHandler = () => {
    if(descriptionRef.current!.hasError()) {
      descriptionRef.current!.emphasizeText();
      return;
    }
    const data = {
        fitness_achievement: {
            fitness_achievements_id: fitnessAchievement.fitness_achievements_id,
        member_email: fitnessAchievement.member_email,
        description: descriptionRef.current!.value(),
      }
    }
    axios.put(api.path('/fitness-achievements/update'), data, { withCredentials: true }).then((res) => {
      onUpdate();
    });
  }

  const deleteHandler = () => {
    axios.delete(api.path('/fitness-achievements/delete/'+fitnessAchievement.fitness_achievements_id), { withCredentials: true }).then((res) => {
      onUpdate();
    });
  }
  return (
    <div className="fitness-achievement" key={id} id={`fitness-achievement-${id}`}>
      <h3>Fitness Achievements {id + 1}</h3>
      <h4>Description</h4>
      <InputBox ref={descriptionRef} id="description" inputType={InputType.TEXTAREA} inputPolicy={InputPolicy.WORDS} placeholder="Description" value={fitnessAchievement.description} />
      <IconButton icon={Icons.TOAST_ORANGE} id={`update-${id}`} onClick={updateHandler}>Update</IconButton>
      <IconButton icon={Icons.TOAST_RED} id={`delete-${id}`} onClick={deleteHandler}>Delete</IconButton>
    </div>
  )
}

export default FitnessAchievementC;