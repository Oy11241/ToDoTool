import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'active' : ''}
            end
          >
            ダッシュボード
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/todos" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Todo管理
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/calendar" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            カレンダー
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};