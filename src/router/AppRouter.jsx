// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// import Home from '../pages/Home.jsx'
// import UserDetails from '../pages/UserDetails.jsx'
// import AddUser from '../pages/AddUser.jsx'

// export default function AppRouter() {
//   return (
//     <BrowserRouter>
//       <header className="bg-white shadow">
//         <div className="container mx-auto p-4 flex justify-between items-center">
//           <Link to="/" className="text-xl font-bold">User Management</Link>
//           <nav>
//             <Link to="/add" className="px-3 py-1 rounded bg-blue-600 text-white">Add User</Link>
//           </nav>
//         </div>
//       </header>
//       <main className="container mx-auto p-4">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/user/:id" element={<UserDetails />} />
//           <Route path="/add" element={<AddUser />} />
//         </Routes>
//       </main>
//     </BrowserRouter>
//   )
// }
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import UserDetails from '../pages/UserDetails.jsx';
import AddUser from '../pages/AddUser.jsx';
import { useState, useEffect } from 'react';

export default function AppRouter() {
  const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <BrowserRouter>
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">User Management</Link>
          <nav className="flex items-center gap-3">
            <button onClick={() => setDark(!dark)} className="px-2 py-1 border rounded">{dark ? 'Light' : 'Dark'}</button>
            <Link to="/add" className="px-3 py-1 rounded bg-blue-600 text-white">Add User</Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/add" element={<AddUser />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
