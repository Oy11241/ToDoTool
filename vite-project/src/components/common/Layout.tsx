import { ReactNode } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Navigation />
        <main className="content">{children}</main>
      </div>
    </div>
  );
};