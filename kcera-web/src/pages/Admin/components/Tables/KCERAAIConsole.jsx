import React, { useState, useEffect } from "react";
import { useDashboard } from "../../DashboardContext";

const KCERAAIConsole = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello Admin 👋 I'm KCERA AI. You can ask me questions about emergency reports — for example, 'What month had the most traffic incidents?'",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { aiResponse, aiResponsesFn } = useDashboard();

  useEffect(() => {
    if (aiResponse) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse },
      ]);
      setLoading(false);
    }
  }, [aiResponse]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    await aiResponsesFn(userMessage.content);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[90vh] rounded-lg shadow-md overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black   text-white">
      {/* Header */}
      <div className="p-4 text-lg font-semibold ">KCERA AI Console</div>

      {/* Chat Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-800 text-gray-200 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm italic text-gray-400">Analyzing...</div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-2 p-4 bg-transparent border-t border-gray-700 h-[100px]">
        <textarea
          className="flex-1 p-2 text-white border border-white border-gray-600 rounded-lg resize-none bg-black/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
          placeholder="Ask KCERA AI something..."
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default KCERAAIConsole;
