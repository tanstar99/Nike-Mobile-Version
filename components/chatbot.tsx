import { useState } from "react";

const ChatBot = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Chat Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-red-600 text-white p-5 rounded-full shadow-lg hover:bg-red-700 transition-all text-2xl"
      >
        {open ? "✖" : "💬"}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="absolute bottom-16 right-0 w-96 bg-white shadow-xl rounded-lg p-4 border border-gray-300">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h2 className="text-lg font-semibold">ChatBot</h2>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">✖</button>
          </div>
          <div className="h-48 overflow-y-auto bg-gray-100 p-2 rounded">
            <p className="text-sm text-gray-700">Hello! How can I assist you?</p>
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 border rounded mt-2 text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default ChatBot;
