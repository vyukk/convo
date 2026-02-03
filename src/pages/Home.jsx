import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatRoom from '../components/ChatRoom'


export default function Home({ user }){
const [activeChat, setActiveChat] = React.useState('global')


return (
<div className="flex h-screen">
<Sidebar user={user} setActiveChat={setActiveChat} />
<ChatRoom chatId={activeChat} user={user} />
</div>
)
}