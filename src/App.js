import "./styles.css";
import styled from "styled-components";
import { useEffect, useState } from "react";

/* {
  _id: "c2hvcHBpbmcuaXRlbTox",
  _type: "shopping.item",
  category: { _type: "ref", _ref: "c2hvcHBpbmcuY2F0ZWdvcnk6MA==" },
  name: { en: "Pineapple", de: "Ananas" },
},
{
  _id: "c2hvcHBpbmcuaXRlbToy",
  _type: "shopping.item",
  category: { _type: "ref", _ref: "c2hvcHBpbmcuY2F0ZWdvcnk6MA==" },
  name: { en: "Apples", de: "Äpfel" },
}, */

export default function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [shoppingList, setShoppingList] = useState(() => {
    const valueFromLocalStorage = localStorage.getItem("shoppingList");
    const converted = JSON.parse(valueFromLocalStorage) || [];
    return converted;
  });

  useEffect(() => {
    fetch("https://fetch-me.vercel.app/api/shopping/items")
      .then((currywurst) => currywurst.json())
      .then((items) => {
        setItems(items.data);
      })
      .catch((error) => {
        console.log(error);
        // other logic
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [shoppingList]);

  function handleOnChange(event) {
    const newInput = event.target.value;
    setInput(newInput);
  }

  function handleOnSaveShoppingItem(item) {
    const foundShoppingItem = shoppingList.filter(
      (shoppingItem) => shoppingItem._id === item._id
    );
    if (foundShoppingItem.length === 0) {
      setShoppingList([...shoppingList, item]);
    }
  }

  function removeItem(id) {
    setShoppingList(
      shoppingList.filter((shoppingItem) => shoppingItem._id !== id)
    );
  }

  const foundItems = items.filter((item) =>
    item.name.en.toLowerCase().includes(input.toLowerCase())
  );

  console.log(foundItems);
  return (
    <div className="App">
      <h1>Shopping List</h1>
      Current Shopping List
      <ul>
        {shoppingList.map((shoppingItem) => (
          <li key={shoppingItem._id}>
            <button onClick={() => removeItem(shoppingItem._id)}>
              {shoppingItem.name.de}
            </button>
          </li>
        ))}
      </ul>
      Search for items
      <input onChange={handleOnChange} value={input} />
      <ItemList>
        {foundItems.length === 0
          ? "We could not find anything."
          : foundItems.map((item) => (
              <li key={item._id}>
                <button onClick={() => handleOnSaveShoppingItem(item)}>
                  {item.name.de}
                </button>
              </li>
            ))}
      </ItemList>
    </div>
  );
}

const ItemList = styled.ul`
  list-style: none;
`;
