import { useEffect, useRef, useState } from "react";
import InputBox, { InputPolicy, InputType } from "../InputBox/InputBox";
import IconButton from "../IconButton/IconButton";
import { Icons } from "../../lib/icons";
import api from "../../lib/api";
import axios from "axios";
import { useSession } from "../SessionProvider/SessionProvider";
import RoutineC from "./Routine/Routine";
import { Routine } from "../../lib/models/Routine";

const Routines = () => {
  const session = useSession();
  const descriptionRef = useRef<InputBox>(null);
  const [routines, setRoutines] = useState<Routine[]>([]);

  useEffect(() => {
    fetchHealthGoals();
  }, []);

  const fetchHealthGoals = () => {
    axios.get(api.path('/routines/all'), { withCredentials: true }).then((res) => {
      const routines: Routine[] = res.data;
      routines.sort((a, b) => a.routine_id - b.routine_id);
      setRoutines([]);
      setRoutines(routines);
      // rebuild ui here
      console.log(routines);
    });
  }
  const addHandler = () => {
    if(descriptionRef.current!.hasError()) {
      descriptionRef.current!.emphasizeText();
      return;
    }
    const data = {
      routine: {
        member_email: session?.email,
        description: descriptionRef.current!.value(),
      }
    }
    axios.post(api.path('/routines/add'), data, { withCredentials: true }).then((res) => {
      fetchHealthGoals();
    });
  };

  

  return (
    <div className="routines">
      <div className="new-routine">
        <h2>New Routine</h2>
        <InputBox ref={descriptionRef} id="description" inputType={InputType.TEXTAREA} inputPolicy={InputPolicy.WORDS} placeholder="Routine Description" />
        <IconButton icon={Icons.TOAST_GREEN} id="update" onClick={addHandler}>Add</IconButton>
      </div>
      {routines.length > 0 ?
        <div className="current-routines">
          <h2>My Routines</h2>
          {routines.map((r) => (
            <RoutineC routine={r} id={r.routine_id} key={r.routine_id} onUpdate={fetchHealthGoals}/>
          ))}
        </div> : <></>}
    </div>
  );
};

export default Routines;