import { useState } from "react";

export default function Exercise2() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Exercise 2 – Counter</h2>
      <p>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
