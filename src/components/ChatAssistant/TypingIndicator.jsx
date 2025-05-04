
const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none">
        <div className="flex space-x-1 items-center h-5">
          <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
