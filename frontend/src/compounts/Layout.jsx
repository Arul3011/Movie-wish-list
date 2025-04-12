// components/Layout.jsx
import { Outlet, NavLink } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full h-16 bg-gray-800 text-white flex items-center px-4 z-50">
       Movie list
      </nav>

      <div className="flex pt-16">
        <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-gray-100 p-4 shadow-md overflow-y-auto">
          <ul className="space-y-2 grid justify-center">
            <li className='text-center p-2'>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'text-blue-600 font-semibold' : 'text-gray-800'
                }
              >
                Home
              </NavLink>
            </li>
            <li className='text-center p-2'>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? 'text-blue-600 font-semibold' : 'text-gray-800'
                }
              >
                favorites
              </NavLink>
            </li>
            <li className='text-center p-2'>
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

        {/* Main content */}
        <main className="ml-64 p-6 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
