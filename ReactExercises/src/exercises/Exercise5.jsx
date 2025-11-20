import { useState } from "react";

export default function Exercise5() {
  const [text, setText] = useState("");

  return (
    <div>
      <h2>Exercise 5 – Text Input</h2>

      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <p>You typed: {text}</p>
    </div>
  );
}
