import { useEffect, useState } from "react";

export default function App() {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    loadShoppinglist();
    async function loadShoppinglist() {
      try {
        const response = await fetch(
          "https://fetch-me.vercel.app/api/shopping/items"
        );
        const data1 = await response.json();
        setShoppingList(data1.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const [filter, setFilter] = useState("");

  return (
    <div className="App">
      <p>
        Shopping List:
        <input
          id="filter"
          name="filter"
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </p>
      <ul>
        {shoppingList
          .filter((item) => item.name.de.includes(filter) || filter === "")
          .map((item) => (
            <li key={item._id}>{item.name.de}</li>
          ))}
      </ul>
    </div>
  );
}
