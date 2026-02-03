import React from 'react'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../services/Firebase'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'


export default function Login(){
const [email, setEmail] = React.useState('')
const [pass, setPass] = React.useState('')
const [error, setError] = React.useState('')
const nav = useNavigate()


const handleEmail = async (e)=>{
e.preventDefault()
setError('')
try{
await signInWithEmailAndPassword(auth, email, pass)
nav('/')
}catch(err){ setError(err.message) }
}


const handleGoogle = async ()=>{
try{ await signInWithPopup(auth, provider) }catch(err){ setError(err.message) }
}


return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600">
<motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} transition={{duration:0.35}} className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
<h2 className="text-2xl font-semibold mb-4">ChatFire — Login</h2>
{error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
<form onSubmit={handleEmail} className="space-y-3">
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 border rounded" />
<input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" type="password" className="w-full px-3 py-2 border rounded" />
<button className="w-full py-2 bg-indigo-600 text-white rounded">Sign in</button>
</form>
<div className="my-3 text-center">or</div>
<button onClick={handleGoogle} className="w-full py-2 border rounded mb-2">Continue with Google</button>
<div className="text-sm text-gray-600">Don't have an account? <Link to="/signup" className="text-indigo-600">Sign up</Link></div>
</motion.div>
</div>
)
}