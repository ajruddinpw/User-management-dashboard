import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function AddUser(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [company,setCompany] = useState('')
  const navigate = useNavigate()
  const handleSubmit = e=>{
    e.preventDefault()
    const newUser = {id:Date.now(), name, email, phone, company}
    const stored = JSON.parse(localStorage.getItem('users'))||[]
    localStorage.setItem('users',JSON.stringify([newUser,...stored]))
    navigate('/')
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add User</h2>
      <input className="border p-2 w-full mb-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required/>
      <input className="border p-2 w-full mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
      <input className="border p-2 w-full mb-2" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} required/>
      <input className="border p-2 w-full mb-2" placeholder="Company" value={company} onChange={e=>setCompany(e.target.value)} required/>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Add User</button>
    </form>
  )
}
