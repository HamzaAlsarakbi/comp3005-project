import './DashboardComponent.css';

export interface DashboardComponentItem {
  title: string;
  body: string[];
}

interface DashboardComponentProps {
  title: string;
  id: string;
  items: DashboardComponentItem[];
}

const DashboardComponent: React.FC<DashboardComponentProps> = ({ title, id, items }) => {
  return (
    <div className="dashboard-component" id={id}>
      <h2 className="dc-title">{title}</h2>
      <div className="dc-body">
        {items.length > 0 ? items.map((item, i) => (
          <div className="dc-item" key={`${id}-${i}-item`} id={`${id}-${i}`}>
            <div className="dc-metadata" key={`${id}-${i}-metadata`}>
              <h3 className="dc-item-title" key={`${id}-${i}-title`} id={`${id}-${i}`}>{item.title}</h3>
              {item.body.map((b, j) => (
                <p className="dc-item-body" key={`${id}-${i}-body-${j}`} id={`${id}-${i}-${j}`}>{b}</p>
              ))}
            </div>
          </div>
        )) : <p>None to show.</p>}
      </div>
    </div>
  );
}

export default DashboardComponent;