
const ChatMessage = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isUser
            ? "bg-echoTeal-100 dark:bg-echoTeal-900/30 text-gray-800 dark:text-gray-100 rounded-br-none"
            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none"
        }`}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
