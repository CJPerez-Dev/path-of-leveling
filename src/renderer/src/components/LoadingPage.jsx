import { version } from '../../../../package.json';
import CircularProgress from '@mui/material/CircularProgress';
import './LoadingPage.css';

function LoadingPage() {
  return (
    <div className="centered-container">
      <h1 className="title">Path of Leveling</h1>
      <p className="author">Created by Chase Perez</p>
      <h5 className="version">Version: {version}</h5>
      <CircularProgress className="circular-progress" size={50} color='inherit' />
    </div>
  );
}

export default LoadingPage;
