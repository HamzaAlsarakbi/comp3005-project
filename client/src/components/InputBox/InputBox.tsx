import React, { Component, RefObject } from "react";
import './InputBox.css';
import { Color } from '../../lib/colors';
import { EMAIL_REGEX, WORDS_REGEX } from "../../lib/utils";
import { phone } from 'phone';

export enum InputType {
  INPUT,
  TEXTAREA
}

interface InputBoxProps {
  id: string;
  inputType: InputType;
  placeholder: string;
  buttonText?: string;
  onClick?(input: string): void;
  onInput?(input: string): void;
  optional?: boolean;
  inputPolicy?: InputPolicy;
  hidden?: boolean;
}

export enum InputPolicy {
  NO_POLICY, // idk why i need this but code won't compile without it
  NUMBERS,
  PHONE_NUMBER,
  EMAIL,
  WORDS,
}

class InputBox extends Component<InputBoxProps> {
  private inputRef: RefObject<HTMLInputElement>;
  private textAreaRef: RefObject<HTMLTextAreaElement>;
  private textRef: RefObject<HTMLSpanElement>;

  constructor(props: InputBoxProps) {
    super(props);
    this.inputRef = React.createRef();
    this.textAreaRef = React.createRef();
    this.textRef = React.createRef();
  }

  handleInput = () => {
    const { onInput } = this.props;
    const value: string = this.inputRef.current?.value ?? this.textAreaRef.current!.value;
    if (onInput) {
      onInput(value);
    }
    if (!this.props.inputPolicy) return;
    switch (this.props.inputPolicy) {
      case InputPolicy.EMAIL:
        this.checkEmail(value);
        break;
      case InputPolicy.PHONE_NUMBER:
        this.checkPhoneNumber(value);
        break;
      case InputPolicy.WORDS:
        this.checkWords(value);
        break;
      default:
        console.log('ERROR InputBox ' + this.props.id + ', unknown input policy ' + this.props.inputPolicy);
    }
  };
  private checkEmail = (value: string) => {
    if (!EMAIL_REGEX.test(value)) {
      this.showText('Please enter a valid email address.', Color.Red);
    } else if (value.trim() === '') {
      if (this.props.optional) {
        this.hideText();
      } else {
        this.showText('Email address field cannot be empty.', Color.Red);
      }
    } else {
      this.hideText();
    }
  }
  private checkPhoneNumber = (value: string) => {
    const normalized = phone(value);
    if (!normalized.isValid) {
      this.showText('Please enter a valid phone number.', Color.Red);
    } else if (value.trim() === '') {
      if (this.props.optional) { 
        this.hideText();
      } else {
        this.showText('Phone number field cannot be empty.', Color.Red);
      }
    } else {
      this.hideText();
    }
  }
  private checkWords = (value: string) => {
    if (value.trim() === '') {
      if (this.props.optional) {
        this.hideText();
      } else {
        this.showText('Field cannot be empty.', Color.Red);
      }
    } else if (!WORDS_REGEX.test(value)) {
      this.showText('Input field must contain at least 1 word.', Color.Red);
    } else {
      this.hideText();
    }
  }

  handleClick = () => {
    const { onClick } = this.props;
    if (onClick && this.inputRef.current) {
      onClick(this.inputRef.current.value);
    }
  };

  hideText = () => {
    if (this.textRef.current == null) return;
    this.textRef.current.classList.remove('show');
  }

  showText = (text: string, color: Color) => {
    if (this.textRef.current == null) return;
    this.textRef.current.textContent = text.trim();
    this.textRef.current.setAttribute('style', `color: ${color}`);
    this.textRef.current.classList.add('show');
  }

  emphasizeText = () => {
    if (this.textRef.current == null) return;
    this.textRef.current.classList.add('emphasis');
    setTimeout(() => {
      if (this.textRef.current == null) return;
      this.textRef.current.classList.remove('emphasis');
    }, 1000);
  }

  render() {
    const { id, placeholder, buttonText, inputType, optional, hidden } = this.props;

    return (
      <div className="input-box-container" id={id}>
        <div className="input-box" id={id}>
          <span className="input-box-placeholder">{placeholder + (optional ? '' : '*')}</span>
          {inputType === InputType.TEXTAREA ?
            <textarea
              className="input-box-input"
              id={id}
              placeholder={""}
              ref={this.textAreaRef}
              onInput={this.handleInput}
            /> :
            <input
              className="input-box-input"
              id={id}
              placeholder={""}
              ref={this.inputRef}
              onInput={this.handleInput}
              type={hidden ? "password" : "text"}
            />
          }
          {buttonText ?
            <button className="input-box-button" id={id} onClick={this.handleClick}>
              {buttonText}
            </button>
            : ""}
        </div>
        <span className="input-box-hint" id={id} ref={this.textRef}>error</span>
      </div>
    );
  }
}

export default InputBox;