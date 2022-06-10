import { useEffect, useState } from "react";
import ShoppingItem from "./components/ShoppingItem";
import styled from "styled-components";

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
      <p>Type to filter the list:</p>
      <input
        id="filter"
        name="filter"
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      ></input>
      <ul>
        {shoppingList
          .filter((item2) => item2.toString().includes(filter) || filter === "")
          .map((item2) => (
            <li key={item2}>{item2}</li>
          ))}
      </ul>
      <h1>Shopping List:</h1>
      <ShoppingList>
        {shoppingList.map((item) => (
          <ShoppingItem key={item._id} name={item.name.de} />
        ))}
      </ShoppingList>
    </div>
  );
}

const ShoppingList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
`;
