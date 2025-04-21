// components/Layout.jsx
import { useEffect, useRef, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LoginForm from '../Pages/LoginForm';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dialogRef = useRef(null);
  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };
  useEffect(()=>{
  openDialog()
  },[])
  return (
    <>
    <div className="relative min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4 z-50">
        <div className="text-lg font-semibold">Movie list</div>
        {/* Hamburger Icon (Mobile) */}
        <button className="md:hidden block" onClick={() => setSidebarOpen((prv) => !prv)}>
          <Bars3Icon className="h-6 w-6" />
        </button>
      </nav>

      {/* Sidebar (Mobile Drawer) */}
      <Transition
        as="div"
        show={sidebarOpen}
        enter="transition ease-out duration-300"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in duration-200"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        className="fixed inset-0 z-40 flex md:hidden"
      >
        <div className="relative flex-1 flex flex-col w-64 bg-gray-100 shadow-md p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4"
          >
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          </button>
          <ul className="space-y-2 mt-12">
            <li className="text-center p-2">
              <NavLink
                to="/"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'text-blue-600 font-semibold' : 'text-gray-800'
                }
              >
                Home
              </NavLink>
            </li>
            <li className="text-center p-2">
              <NavLink
                to="/favorites"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'text-blue-600 font-semibold' : 'text-gray-800'
                }
              >
                Favorites
              </NavLink>
            </li>
            <li className="text-center p-2">
              <NavLink
                to="/stars"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'text-blue-600 font-semibold' : 'text-gray-800'
                }
              >
                Watched
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Overlay */}
        <div className="flex-shrink-0 w-full" onClick={() => setSidebarOpen(false)} />
      </Transition>

      <div className="flex pt-16">
        {/* Sidebar for Desktop */}
        <aside className="hidden md:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-gray-100 p-4 shadow-md overflow-y-auto">
          <ul className="space-y-2 grid justify-center">
            <li className="text-center p-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'text-blue-600 font-semibold' : 'text-gray-800'
                }
              >
                Home
              </NavLink>
            </li>
            <li className="text-center p-2">
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? 'text-blue-600 font-semibold' : 'text-gray-800'
                }
              >
                Favorites
              </NavLink>
            </li>
            <li className="text-center p-2">
              <NavLink
                to="/stars"
                className={({ isActive }) =>
                  isActive ? 'text-blue-600 font-semibold' : 'text-gray-800'
                }
              >
                Watched
              </NavLink>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="md:ml-64 p-6 w-full">
          <Outlet />
        </main>
      </div>
      {/* <dialog 
      ref={dialogRef}
      className="backdrop:bg-black/100 w-[90%] max-w-md border-none"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        margin: 0,
        padding: "1.5rem",
        borderRadius: "12px",
        background: "white",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      }}
    >
        <LoginForm />
      </dialog> */}
    </div>
       
    </>
  );
};

export default Layout;
