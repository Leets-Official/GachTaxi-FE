import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main className="max-w-[430px] w-full min-h-screen relative flex flex-col mx-auto text-white">
      <Outlet />
    </main>
  );
};

export default Layout;
