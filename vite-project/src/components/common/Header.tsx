import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">TodoApp</Link>
      </div>
    </header>
  );
};