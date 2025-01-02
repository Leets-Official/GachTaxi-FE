import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main className="max-w-[360px] w-full h-screen mx-auto">
      <Outlet />
    </main>
  );
};

export default Layout;
