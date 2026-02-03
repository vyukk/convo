import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/Firebase";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ user, setActiveChat }) {
  const [creating, setCreating] = React.useState(false);
  const [roomName, setRoomName] = React.useState("");

  const logout = async () => await signOut(auth);

  const createRoom = () => {
    if (!roomName.trim()) return;
    setActiveChat(roomName.trim());
    setRoomName("");
    setCreating(false);
  };

  return (
    <aside className="w-80 h-screen flex flex-col bg-gradient-to-b from-white to-indigo-50 border-r">
      {/* Brand Header */}
      <div className="px-6 py-5 flex items-center justify-between border-b bg-white/70 backdrop-blur">
        <h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Convo
        </h2>
        <button
          onClick={logout}
          className="text-xs font-medium text-red-500 hover:text-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* User Card */}
      <div className="px-4 mt-5">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border">
          <img
            src={user.photoURL || "https://www.gravatar.com/avatar/?d=mp"}
            alt="avatar"
            className="w-12 h-12 rounded-full border"
          />
          <div className="min-w-0">
            <p className="font-semibold text-gray-800 truncate">
              {user.displayName || "User"}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <div className="flex-1 px-3 mt-6 overflow-y-auto">
        <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Chats
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => setActiveChat("global")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
          hover:bg-indigo-100 hover:text-indigo-700 transition"
        >
          🌍 Global
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => setActiveChat(user.uid)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
          hover:bg-indigo-100 hover:text-indigo-700 transition"
        >
          👤 My Space
        </motion.button>
      </div>

      {/* Create / Join */}
      <div className="p-4 border-t bg-white/70 backdrop-blur">
        <AnimatePresence>
          {creating ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex gap-2"
            >
              <input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter Room ID"
                className="flex-1 px-3 py-2 rounded-lg border
                focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                onClick={createRoom}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white
                hover:bg-indigo-700 transition font-medium"
              >
                Go
              </button>
            </motion.div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setCreating(true)}
              className="w-full py-3 rounded-xl font-medium
              bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              + Create / Join Room
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
