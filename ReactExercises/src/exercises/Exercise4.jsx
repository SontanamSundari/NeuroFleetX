export default function Exercise4() {
  const fruits = ["Apple", "Banana", "Mango"];

  return (
    <div>
      <h2>Exercise 4 – Fruit List</h2>
      <ul>
        {fruits.map((f, index) => (
          <li key={index}>{f}</li>
        ))}
      </ul>
    </div>
  );
}
