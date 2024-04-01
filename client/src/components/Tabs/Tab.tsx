interface TabProps {
  title: string;
  children: any;
}


const Tab: React.FC<TabProps> = ({ title, children }) => {
  return(
    <div className="tab-content">
      {children}
    </div>
  )
}

export default Tab;