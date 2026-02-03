import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const REACTIONS = ["❤️", "😂", "👍"];

export default function Message({ msg, prevMsg, user }) {
  const isOwn = msg.senderId === user.uid;
  const isGrouped = prevMsg && prevMsg.senderId === msg.senderId;

  const [showReactions, setShowReactions] = React.useState(false);

  const toggleReaction = (emoji) => {
    // Firebase-ready logic (pseudo)
    // reactions: { "❤️": ["uid1", "uid2"] }
    // Toggle current user uid
    console.log("React:", emoji);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className={`flex ${isOwn ? "justify-end" : "justify-start"} px-2`}
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      <div className="max-w-xs md:max-w-md relative">
        {/* Sender name (only if not grouped & not own) */}
        {!isOwn && !isGrouped && (
          <p className="text-xs text-gray-500 mb-1 ml-2">
            {msg.senderName}
          </p>
        )}

        {/* Message Bubble */}
        <div
          className={`px-4 py-2 text-sm leading-relaxed rounded-2xl shadow-sm ${
            isOwn
              ? "bg-gradient-to-br from-indigo-600 to-indigo-500 text-white rounded-br-md"
              : "bg-white border text-gray-800 rounded-bl-md"
          }`}
        >
          {msg.text}
        </div>

        {/* Existing Reactions */}
        {msg.reactions && (
          <div className="flex gap-1 mt-1 ml-2">
            {Object.entries(msg.reactions).map(([emoji, users]) => (
              <span
                key={emoji}
                className="text-xs bg-gray-100 px-2 py-0.5 rounded-full border"
              >
                {emoji} {users.length}
              </span>
            ))}
          </div>
        )}

        {/* Reaction Picker */}
        <AnimatePresence>
          {showReactions && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className={`absolute -top-8 ${
                isOwn ? "right-0" : "left-0"
              } flex gap-1 bg-white border shadow rounded-full px-2 py-1`}
            >
              {REACTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => toggleReaction(emoji)}
                  className="hover:scale-125 transition text-sm"
                >
                  {emoji}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
