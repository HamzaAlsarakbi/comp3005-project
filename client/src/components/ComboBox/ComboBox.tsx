import { useRef } from "react";

import './ComboBox.css';

export type ComboBoxOption = {
  value: string;
  name: string;
}

interface ComboBoxProps {
  id: string;
  name: string;
  options: ComboBoxOption[];
  optional?: boolean;
  onChange?(value: string): void;
}

const ComboBox: React.FC<ComboBoxProps> = ({ id, name, options, optional, onChange }) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const changeHandler = () => {
    if (!selectRef.current || !onChange) return;
    onChange(selectRef.current!.value);
  }


  return (
    <div className="combo-box-container" id={id}>
      <span className="combo-box-placeholder">{name + (optional ? '' : '*')}</span>
      <select name={name ?? id} id={id} className="combo-box" onChange={changeHandler}>
        {options.map((item: ComboBoxOption, i: number) => (
          <option className="combo-box-option" value={item.value}>{item.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ComboBox;