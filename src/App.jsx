import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './services/Firebase'


export default function App(){
const [user, setUser] = React.useState(null)
const [loading, setLoading] = React.useState(true)


React.useEffect(()=>{
const unsub = onAuthStateChanged(auth, (u)=>{
setUser(u)
setLoading(false)
})
return unsub
},[])


if(loading) return <div className="h-screen flex items-center justify-center">Loading...</div>


return (
<Routes>
<Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" replace />} />
<Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
<Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" replace />} />
<Route path="*" element={<Navigate to="/" replace />} />
</Routes>
)
}
