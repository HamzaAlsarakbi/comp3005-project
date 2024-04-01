import { Link } from 'react-router-dom';
import './NoPage.css'
import { Icons } from '../../lib/icons';

interface NoPageProps {
}

const NoPage: React.FC<NoPageProps> = () => {
  return (
    <div className="no-page">
      <img className="no-page-item" id="no-page-img" src={Icons.SAD_DUMBBELL} alt="Sad Dumbbell" />
      <p className="no-page-item" id="no-page-title">Oops!</p>
      <p className="no-page-item" id="no-page-subtitle">404 - the page you are looking for does not exist.</p>
      <Link className="no-page-item" id="no-page-action" to="/">back to the dashboard?</Link>
    </div>
  )
}

export default NoPage;