import React, { useEffect, useState } from 'react';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';


import './../Theme/Theme.css'
import './TextSplit.css'
import clamp from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger)
export enum TextAlign {
  LEFT, CENTER, RIGHT
}
interface TextSplitProps {
  id: string,
  className: string
  children: string,
  align?: TextAlign,
  options?: {
    delay?: number,
    y?: string | number,
    x?: string | number,
    intervalFactor?: number,
  }
}

const TextSplit: React.FC<TextSplitProps> = ({ id, className, children, options, align}) => {
  const [done, setDone] = useState(false);
  let charIndex = 0;
  useEffect(() => {
    let delayIndex = 0;
    const text = children;
    let animationLength = 0;
    for(let i = 0; i < text.length; i++) {
      if(text[i] === ' ') continue;
      const duration = clamp((delayIndex+1) / text.length, 0.25, .75);
      const delay = options?.delay ?? 0 + clamp(0.001 * delayIndex, .0001 * text.length, .1 * text.length);
      animationLength = delay + duration
      const selector = `.textsplit-char#${id}-char-${i}`;
      gsap.fromTo(selector, {
        opacity: 0,
        y: options?.y ?? '100%',
        x: options?.x ?? 0,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: duration,
        delay: delay,
        scrollTrigger: {
          trigger: selector,
          toggleActions: 'play play resume none'
        },
      });
      delayIndex++;
    }

    // does not work, supposed to switch to a normal paragraph after animation ends
    // console.log(animationLength);
    // setTimeout(() => {
    //   setDone(true);
    // }, animationLength*1000 + 100);
  }, [children, id, options?.delay, options?.x, options?.y]);


  return (
    <div className={`${className} textsplit-wrapper textsplit-align-${align === TextAlign.CENTER ? 'center' : align === TextAlign.RIGHT ? 'right' : 'left'}`} id={id}>
      {!done ? children.split(/(\s+)/).map((word: string, i: number) => (
        <div className="textsplit-word" id={`${id}-word-${i}`} key={`${id}-word-${i}`}>
          {word.split('').map((character: string) => (
            <div className="textsplit-char" id={`${id}-char-${charIndex}`} key={`${id}-char-${charIndex++}`}>{character === ' ' ? '\u00A0' : character}</div>
          ))}
        </div>
        )) : <div className="textsplit-paragraph">{children}</div>}
    </div>
  );
}

export default TextSplit;