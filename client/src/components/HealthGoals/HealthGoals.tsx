import { useEffect, useRef, useState } from "react";
import InputBox, { InputPolicy, InputType } from "../InputBox/InputBox";
import IconButton from "../IconButton/IconButton";
import { Icons } from "../../lib/icons";
import api from "../../lib/api";
import axios from "axios";
import { HealthGoal } from "../../lib/models/HealthGoal";
import { useSession } from "../SessionProvider/SessionProvider";
import HealthGoalC from "./HealthGoal/HealthGoal";

const HealthGoals = () => {
  const session = useSession();
  const descriptionRef = useRef<InputBox>(null);
  const [healthGoals, setHealthGoals] = useState<HealthGoal[]>([]);

  useEffect(() => {
    fetchHealthGoals();
  }, []);

  const fetchHealthGoals = () => {
    axios.get(api.path('/health-goals/all'), { withCredentials: true }).then((res) => {
      const hg: HealthGoal[] = res.data;
      hg.sort((a, b) => a.health_goal_id - b.health_goal_id);
      setHealthGoals([]);
      setHealthGoals(hg);
      // rebuild ui here
      console.log(hg);
    });
  }
  const addHandler = () => {
    if(descriptionRef.current!.hasError()) {
      descriptionRef.current!.emphasizeText();
      return;
    }
    const data = {
      health_goal: {
        member_email: session?.email,
        description: descriptionRef.current!.value(),
      }
    }
    axios.post(api.path('/health-goals/add'), data, { withCredentials: true }).then((res) => {
      fetchHealthGoals();
    });
  };

  

  return (
    <div className="health-goals">
      <div className="new-health-goal">
        <h2>New Health Goal</h2>
        <InputBox ref={descriptionRef} id="description" inputType={InputType.TEXTAREA} inputPolicy={InputPolicy.WORDS} placeholder="Health Goal Description" />
        <IconButton icon={Icons.TOAST_ORANGE} id="update" onClick={addHandler}>Add</IconButton>
      </div>
      {healthGoals.length > 0 ?
        <div className="current-health-goal">
          <h2>My Health Goals</h2>
          {healthGoals.map((hg) => (
            <HealthGoalC healthGoal={hg} id={hg.health_goal_id} key={hg.health_goal_id} onUpdate={fetchHealthGoals}/>
          ))}
        </div> : <></>}
    </div>
  );
};

export default HealthGoals;