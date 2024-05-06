'use client'

import { useChat } from 'ai/react'
import { Input } from "@/components/ui/input";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat();

  // Log the state variables
  console.log("data:", data);
  console.log("messages:", messages);

  return (
    <div className="flex flex-col min-h-[90dvh] w-full max-w-md py-24 mx-auto stretch relative">
      <div className="overflow-auto mb-4 flex-grow">
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        {messages.map((m) => {
            // Log each message
          console.log('message:', m);
          return (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
            );
})}
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-2  bg-white dark:bg-gray-950 shadow rounded-lg absolute bottom-0"
      >
        <Input
          className="w-full"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}