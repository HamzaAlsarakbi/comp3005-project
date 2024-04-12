import axios from "axios";
import { Icons } from "../../../lib/icons"
import IconButton from "../../IconButton/IconButton"
import api from "../../../lib/api";
import InputBox, { InputPolicy, InputType } from "../../InputBox/InputBox";
import { useEffect, useRef } from "react";
import { Routine } from "../../../lib/models/Routine";

interface RoutineProps {
  routine: Routine;
  id: number;
  onUpdate(): void;
}


const RoutineC: React.FC<RoutineProps> = ({ routine, id, onUpdate }) => {
  const descriptionRef = useRef<InputBox>(null);
  useEffect(() => {

  }, [routine, id]);
  const updateHandler = () => {
    if(descriptionRef.current!.hasError()) {
      descriptionRef.current!.emphasizeText();
      return;
    }
    const data = {
      routine: {
        routine_id: routine.routine_id,
        member_email: routine.member_email,
        description: descriptionRef.current!.value(),
      }
    }
    axios.put(api.path('/routines/update'), data, { withCredentials: true }).then((res) => {
      onUpdate();
    });
  }

  const deleteHandler = () => {
    axios.delete(api.path('/routines/delete/'+routine.routine_id), { withCredentials: true }).then((res) => {
      onUpdate();
    });
  }
  return (
    <div className="routines" key={id} id={`routines-${id}`}>
      <h3>Health Goal {id + 1}</h3>
      <h4>Description</h4>
      <InputBox ref={descriptionRef} id="description" inputType={InputType.TEXTAREA} inputPolicy={InputPolicy.WORDS} placeholder="Description" value={routine.description} />
      <IconButton icon={Icons.TOAST_ORANGE} id={`update-${id}`} onClick={updateHandler}>Update</IconButton>
      <IconButton icon={Icons.TOAST_RED} id={`delete-${id}`} onClick={deleteHandler}>Delete</IconButton>
    </div>
  )
}

export default RoutineC;