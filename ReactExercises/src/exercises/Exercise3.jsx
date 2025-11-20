import { useState } from "react";

export default function Exercise3() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <h2>Exercise 3 – Toggle Message</h2>
      <button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"} Message
      </button>

      {show && <p>This is a visible message!</p>}
    </div>
  );
}
