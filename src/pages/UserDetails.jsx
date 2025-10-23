import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchUserById } from '../api/userService.js'
export default function UserDetails(){
  const {id} = useParams()
  const navigate = useNavigate()
  const [user,setUser] = useState(null)
  useEffect(()=>{
    const load = async()=>{
      const stored = JSON.parse(localStorage.getItem('users')) || []
      const found = stored.find(u=>String(u.id)===String(id))
      if(found){ setUser(found); return }
      setUser(await fetchUserById(id))
    }
    load()
  },[id])
  if(!user) return <p>Loading...</p>
  return (
    <div>
      <button onClick={()=>navigate(-1)} className="mb-4 bg-gray-200 px-3 py-1 rounded">⬅ Back</button>
      <h2 className="text-xl font-bold mb-2">{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Company: {user.company?.name || user.company}</p>
    </div>
  )
}
