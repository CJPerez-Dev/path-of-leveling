import { version } from '../../../../package.json';
import './HomePage.css';

function HomePage() {
  return (
    <div className="centered-container">
      <h1 className="title">Path of Leveling</h1>
      <p className="author">Created by Chase Perez</p>
      <h5 className="version">Version: {version}</h5>
    </div>
  );
}

export default HomePage;
