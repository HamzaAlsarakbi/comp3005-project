import { RefObject, useImperativeHandle, useRef, useState } from "react";

import './ComboBox.css';
import React from "react";
import { Color } from "../../lib/colors";

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
export interface ComboBoxRef {
  clearValue: () => void;
  value: () => string;
  setText: (text: string, color: Color) => void;
  hideText: () => void;
  textVisible: () => boolean;
}

const ComboBox: React.ForwardRefRenderFunction<ComboBoxRef, ComboBoxProps> = ({ id, name, options, optional, onChange }, ref) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState<string>('');
  const changeHandler = () => {
    if (!selectRef.current) return;
    if (onChange) onChange(selectRef.current!.value);
  }

  useImperativeHandle(ref as RefObject<ComboBoxRef>, () => ({
    clearValue: () => {
      if (selectRef.current) {
        console.log('clearing value');
        selectRef.current.value = '';
        console.log(selectRef.current.value);
      }
    },
    value: () => selectRef.current!.value,
    setText: (text: string, color: Color) => {
      console.log(text);
      setText(text.trim());
      textRef.current!.setAttribute('style', `color: ${color}`);
      textRef.current!.classList.add('show');
    },
    hideText: () => {
      setText('');
      textRef.current!.classList.remove('show');
    },
    textVisible: () => selectRef.current!.value === '',
  }));


  return (
    <div className="combo-box-container" id={id}>
      <span className="combo-box-placeholder">{name + (optional ? '' : '*')}</span>
      <select ref={selectRef} name={name ?? id} id={id} className="combo-box" onChange={changeHandler} defaultValue={-1}>
        {options.map((item: ComboBoxOption, i: number) => (
          <option className="combo-box-option" key={i} value={item.value}>{item.name}</option>
        ))}
      </select>
      <span className="combo-box-hint" id={id} ref={textRef}>{text}</span>
    </div>
  );
};

export default React.forwardRef(ComboBox);