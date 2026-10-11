import { useState, useRef, useEffect } from "react";

const CHIPS = ["Opening hours", "Services", "Location", "Book appointment"];

function answer(q, clinic, services) {
  const text = q.toLowerCase();
  const words = text.match(/[a-z']+/g) || [];
  const has = (keys) =>
    keys.some((k) => (k.includes(" ") ? text.includes(k) : words.some((w) => w.startsWith(k))));

  if (has(["emergency", "urgent", "pain", "toothache"]))
    return { text: `For urgent pain, call us on ${clinic.phone} or message us on WhatsApp and we'll find the earliest slot.` };
  if (has(["book", "appointment", "schedule", "reserve"]))
    return { text: "You can book in under a minute with the form on this page. I'll take you there now.", book: true };
  if (has(["hour", "open", "close", "when"]))
    return { text: `We're open ${clinic.hours}.` };
  if (has(["where", "location", "address", "directions"]))
    return { text: `You can find us at ${clinic.address}.` };
  if (has(["price", "cost", "how much", "fee", "charge"]))
    return { text: "Prices depend on the treatment. Book a consultation and we'll give you a clear quote before any work starts." };
  if (has(["service", "treatment", "offer", "do you do"]))
    return { text: `We offer: ${services.map((s) => s.title).join(", ")}.` };
  if (has(["kid", "child"]))
    return { text: "Yes, we see children and have a friendly, relaxed approach for young patients." };
  if (has(["phone", "call", "whatsapp", "contact"]))
    return { text: `Call us on ${clinic.phone} or message us on WhatsApp.` };
  if (has(["hello", "hey", "salam"]))
    return { text: "Hello! How can I help you today?" };
  return { text: `I'm not sure about that one. The team can help by phone on ${clinic.phone} or on WhatsApp.` };
}

export default function ChatWidget({ clinic, services }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: `Hi! I'm the ${clinic.name} assistant. Ask me about services, hours, location or booking.` },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = (value) => {
    const q = value.trim();
    if (!q) return;
    const reply = answer(q, clinic, services);
    setMessages((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: reply.text }]);
      if (reply.book) {
        setTimeout(() => {
          setOpen(false);
          document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
        }, 900);
      }
    }, 400);
  };

  return (
    <>
      {open && (
        <div className="chat">
          <div className="chat-head">
            <strong>{clinic.name} Assistant</strong>
            <button onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.from}`}>{m.text}</div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="chips">
            {CHIPS.map((c) => (
              <button key={c} onClick={() => send(c)}>{c}</button>
            ))}
          </div>
          <form
            className="chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question..." />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
      <button className="chat-fab" onClick={() => setOpen(!open)}>
        {open ? "×" : "Chat"}
      </button>
    </>
  );
}