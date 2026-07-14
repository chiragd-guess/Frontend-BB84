export default function MessageComposer() {
  return (
    <div className="message-composer">
      <label>Compose Message</label>
      <textarea placeholder="Message text area placeholder" rows={4} />
      <p>0 / 500</p>
      <button>Send Message</button>
    </div>
  );
}