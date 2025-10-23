// import { useEffect, useState } from 'react'
// import { fetchUsers } from '../api/userService.js'
// import { Link } from 'react-router-dom'

// export default function Home(){
//   const [users, setUsers] = useState([])
//   const [search, setSearch] = useState('')
//   useEffect(()=>{
//     const load = async()=>{
//       const apiUsers = await fetchUsers()
//       const stored = JSON.parse(localStorage.getItem('users')) || []
//       setUsers([...stored, ...apiUsers])
//     }
//     load()
//   },[])

//   const filtered = users.filter(u=>u.name.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase()))
//   return (
//     <div>
//       <div className="flex justify-between mb-4">
//         <input type="text" placeholder="Search" value={search} onChange={e=>setSearch(e.target.value)} className="border p-2 rounded w-1/3"/>
//         <Link to="/add" className="bg-green-600 text-white px-4 py-2 rounded">+ Add User</Link>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filtered.map(u=>(
//           <Link key={u.id} to={`/user/${u.id}`} className="bg-white p-4 rounded shadow hover:shadow-md">
//             <h3 className="text-lg font-semibold">{u.name}</h3>
//             <p>{u.email}</p>
//             <p>{u.phone}</p>
//             <p>{u.company?.name || u.company}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// }
import { useEffect, useState } from 'react';
import { fetchUsers } from '../api/userService.js';
import { Link } from 'react-router-dom';

const USERS_PER_PAGE = 6;

export default function Home() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const load = async () => {
      const apiUsers = await fetchUsers();
      const stored = JSON.parse(localStorage.getItem('users')) || [];
      setUsers([...stored, ...apiUsers]);
    };
    load();
  }, []);

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  const pageCount = Math.ceil(filtered.length / USERS_PER_PAGE);
  const currentUsers = filtered.slice((page - 1) * USERS_PER_PAGE, page * USERS_PER_PAGE);

  return (
    <div>
      <div className="flex justify-between mb-4 flex-col sm:flex-row gap-2">
        <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} className="border p-2 rounded w-full sm:w-1/3"/>
        <Link to="/add" className="bg-green-600 text-white px-4 py-2 rounded">+ Add User</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentUsers.map(u => (
          <Link key={u.id} to={`/user/${u.id}`} className="bg-white dark:bg-gray-700 p-4 rounded shadow hover:shadow-md">
            <h3 className="text-lg font-semibold">{u.name}</h3>
            <p>{u.email}</p>
            <p>{u.phone}</p>
            <p>{u.company?.name || u.company}</p>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <button onClick={() => setPage(p => Math.max(p-1,1))} disabled={page===1} className="px-3 py-1 border rounded">Prev</button>
        <span className="px-3 py-1">{page}/{pageCount || 1}</span>
        <button onClick={() => setPage(p => Math.min(p+1,pageCount))} disabled={page===pageCount} className="px-3 py-1 border rounded">Next</button>
      </div>
    </div>
  );
}
