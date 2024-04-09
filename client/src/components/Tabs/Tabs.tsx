import './Tabs.css';
import React, { useEffect, useState } from "react";

interface TabsProps {
  id: string;
  children: React.ReactNode;

}


const Tabs: React.FC<TabsProps> = ({ id, children }) => {
  const tabs = React.Children
    .toArray(children)
    .filter(child => React.isValidElement(child) && (child.type as any).name === 'Tab');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [visibleTabs, setVisibleTabs] = useState(Array(tabs.length).fill(false));
  useEffect(() => {
    const newVisible = Array(tabs.length).fill(false);
    newVisible[0] = true;
    setVisibleTabs(newVisible);
  }, [])


  const setVisible = (e: EventTarget, index: number) => {
    const newVisible = Array(tabs.length).fill(false);
    newVisible[index] = true;
    setVisibleTabs(newVisible);
  }

  return (
    <div className="tabs" id={id}>
      <div className="tabs-wrapper">
        <div className="tabs-selector">
        {tabs.map((tab, index) => (
          <div className="tabs-selector-item" id={`tab-${index}`} key={index} onClick={(e) => setVisible(e.target, index)}>
            {/* Title */}
            {React.cloneElement(tab as React.ReactElement<any>, { key: index }).props.title}
          </div>
        ))}
        </div>
      </div>
      <div className="tabs-content">
        {tabs.map((tab, index) => (
          <div className="tab-wrapper" key={index}>
            {visibleTabs[index] ? <>{ tab }</> : <></>}
          </div>
        ))}
      </div>
    </div>
  )
};

export default Tabs;