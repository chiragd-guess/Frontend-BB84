export default function ChatWindow({
  title,
  messages,
  emptyText = "No messages yet",
}) {
  return (
    <div className="chat-window">

      <p>{title}</p>

      <div className="chat-window__messages">

        {messages.length === 0 ? (

          <p className="chat-window__empty">
            {emptyText}
          </p>

        ) : (

          messages.map((msg) => {

            if (msg.type === "system") {
              return (
                <div
                  key={msg.id}
                  className={`chat-window__system chat-window__system--${msg.variant || "warning"}`}
                >
                  <div className="chat-window__system-icon">{msg.icon || "⚠"}</div>
                  <div className="chat-window__system-body">
                    {msg.title && (
                      <p className="chat-window__system-title">{msg.title}</p>
                    )}
                    <p className="chat-window__system-text">{msg.text}</p>
                    <span className="chat-window__system-time">{msg.time}</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`chat-window__bubble chat-window__bubble--${
                  msg.sender === "Alice"
                    ? "alice"
                    : "bob"
                }`}
              >
                <p>
                  {msg.sender} — {msg.time}
                </p>

                <p>{msg.text}</p>

              </div>
            );

          })

        )}

      </div>

    </div>
  );
}