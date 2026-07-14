export default function ChatWindow({ title, messages }) {
    return (
      <div className="chat-window">
        <p>{title}</p>
        <div className="chat-window__messages">
          {messages.map((msg) => (
            <div key={msg.id} className="chat-window__bubble">
              <p>{msg.sender} — {msg.time}</p>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }