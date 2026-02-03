import {
collection,
addDoc,
query,
orderBy,
onSnapshot,
serverTimestamp,
doc,
setDoc,
getDoc,
} from 'firebase/firestore'
import { db } from './Firebase'


export async function ensureChatExists(chatId, meta = {}){
const ref = doc(db, 'chats', chatId)
const snap = await getDoc(ref)
if(!snap.exists()){
await setDoc(ref, { createdAt: serverTimestamp(), ...meta })
}
}


export async function sendMessage(chatId, text, user){
const ref = collection(db, 'chats', chatId, 'messages')
await addDoc(ref, {
text,
senderId: user.uid,
senderName: user.displayName || user.email,
timestamp: serverTimestamp(),
})
}


export function listenMessages(chatId, cb){
const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp'))
return onSnapshot(q, (snap)=>{
const msgs = snap.docs.map(d=>({ id: d.id, ...d.data() }))
cb(msgs)
})
}