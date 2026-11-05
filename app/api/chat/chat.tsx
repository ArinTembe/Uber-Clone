"use client";
import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! How can I help you with your ride today?" },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // slice(1) skips the greeting, because the chat history must start with the user
        body: JSON.stringify({ messages: newMessages.slice(1) }),
      });
      const data = await res.json();
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.reply ?? "Sorry, something went wrong." },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, I couldn't connect. Try again." },
      ]);
    }
    setLoading(false);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat window */}
      {open && (
        <div className="w-80 h-96 bg-white shadow-2xl rounded-xl border flex flex-col mb-3">
          <div className="bg-black text-white p-3 rounded-t-xl flex justify-between items-center">
            <p className="font-semibold">Ride Assistant</p>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] p-2 rounded-lg text-sm ${
                  m.role === "user"
                    ? "bg-black text-white ml-auto"
                    : "bg-slate-100 text-black"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="bg-slate-100 text-gray-500 p-2 rounded-lg text-sm w-fit">
                Typing...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 outline-none bg-slate-100 rounded-lg px-3 text-sm"
            />
            <button
              onClick={sendMessage}
              className="bg-black text-white px-3 py-2 rounded-lg active:scale-95 transition duration-150"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Round button */}
      <button
        onClick={() => setOpen(!open)}
        className="ml-auto flex items-center justify-center w-14 h-14 rounded-full bg-black text-white text-2xl shadow-xl active:scale-95 transition duration-150"
      >
        {open ? "✕" : "🗣️"}
      </button>
    </div>
    
  );
}