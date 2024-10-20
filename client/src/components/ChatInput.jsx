import { useState } from "react";

const ChatInput = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full max-w-xl">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message here..."
        className="block px-3 w-full rounded-md border-0 py-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-transparent focus:outline-none focus:ring focus:ring-blue-300" // Use the specified color theme
      />
      <button
        type="submit"
        className="flex justify-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
