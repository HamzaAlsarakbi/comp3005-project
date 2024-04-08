import { useEffect, useRef, useState } from "react";
import InputBox, { InputPolicy, InputType } from "../InputBox/InputBox";
import IconButton from "../IconButton/IconButton";
import { Icons } from "../../lib/icons";
import api from "../../lib/api";
import axios from "axios";
import { FitnessAchievement } from "../../lib/models/FitnessAchievement";
import { useSession } from "../SessionProvider/SessionProvider";
import FitnessAchievementC from "./FitnessAchievement/FitnessAchievement";

const FitnessAchievements = () => {
  const session = useSession();
  const descriptionRef = useRef<InputBox>(null);
  const [fitnessAchievement, setFitnessAchievements] = useState<FitnessAchievement[]>([]);

  useEffect(() => {
    fetchFitnessAchievements();
  }, []);

  const fetchFitnessAchievements= () => {
    axios.get(api.path('/fitness-achievements/all'), { withCredentials: true }).then((res) => {
      const fa: FitnessAchievement[] = res.data;
      fa.sort((a, b) => a.fitness_achievements_id - b.fitness_achievements_id);
      setFitnessAchievements([]);
      setFitnessAchievements(fa);
      // rebuild ui here
      console.log(fa);
    });
  }
  const addHandler = () => {
    if(descriptionRef.current!.hasError()) {
      descriptionRef.current!.emphasizeText();
      return;
    }
    const data = {
      fitness_achievement: {
        member_email: session?.email,
        description: descriptionRef.current!.value(),
      }
    }
    axios.post(api.path('/fitness-achievements/add'), data, { withCredentials: true }).then((res) => {
      fetchFitnessAchievements();
    });
  };

  

  return (
    <div className="fitness-achievements">
      <div className="new-fitness-achievements">
        <h2>New Fitness Achievements</h2>
        <InputBox ref={descriptionRef} id="description" inputType={InputType.TEXTAREA} inputPolicy={InputPolicy.WORDS} placeholder="Fitness Achievements Description" />
        <IconButton icon={Icons.TOAST_ORANGE} id="update" onClick={addHandler}>Add</IconButton>
      </div>
      {fitnessAchievement.length > 0 ?
        <div className="current-fitness-achievement">
          <h2>My Fitness Achievements</h2>
          {fitnessAchievement.map((fa) => (
            <FitnessAchievementC fitnessAchievement={fa} id={fa.fitness_achievements_id} key={fa.fitness_achievements_id} onUpdate={fetchFitnessAchievements}/>
          ))}
        </div> : <></>}
    </div>
  );
};

export default FitnessAchievements;