import { useEffect, useRef, useState } from "react";
import { Icons } from "../../lib/icons";
import './Toast.css';

interface ToastProps {
  type: ToastTypes;
  id: string;
  visible: boolean;
  children: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export enum ToastTypes {
  ERROR = "Red",
  WARNING = "Orange",
  SUCCESS = "Green",
  INFO = "Blue"
}


const Toast: React.FC<ToastProps> = ({ type, id, visible, children, setVisible }) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const [icon, setIcon] = useState("");
  let timeout: NodeJS.Timeout | null = null;
  useEffect(() => {
    setIcon(type === ToastTypes.ERROR ? Icons.TOAST_RED :
      type === ToastTypes.WARNING ? Icons.TOAST_ORANGE :
        type === ToastTypes.SUCCESS ? Icons.TOAST_GREEN :
          type === ToastTypes.INFO ? Icons.TOAST_BLUE : '');
    if(!toastRef.current) return;
    if (visible) {
      show();
    } else {
      hide();
    }

    return () => {
      if(timeout) clearTimeout(timeout);
    };
  }, [type, visible, setVisible, timeout]);  

  const start = () => {
    if(!toastRef.current) return;
    toastRef.current!.classList.add('draw-in');
    
    timeout = setTimeout(() => {
      if(!toastRef.current) return;
      hide();
      setVisible(false);
    }, Math.max(100 * children.length, 2000));
  }

  const show = () => {
    toastRef.current!.classList.remove('draw-out');
    toastRef.current!.classList.add('draw-in');
  }
  const hide = () => {
    toastRef.current!.classList.remove('draw-in');
    toastRef.current!.classList.add('draw-out');
  }

  return (
    <div className={`toast ${type}`} id={id} ref={toastRef}>
      <img className="toast-icon" id={id} src={icon} alt={type} ref={iconRef} onLoad={start} />
      <div className="toast-separator"></div>
      <div className="toast-text" id={id}>{children}</div>
    </div>
  );
}

export default Toast;