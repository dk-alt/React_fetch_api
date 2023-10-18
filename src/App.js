import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { Todo } from "./Todo";

export default function App() {
  const [data, setData] = useState([]);
  const [showList, setShowList] = useState(false);
  const nameRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  const handleFetch = async () =>
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(json));
  console.log("ttt", data);
  useEffect(() => {
    handleFetch();
  }, []);
  if (!showList) {
    return (
      <div className="App">
        <h1>Fetch API Example</h1>
        <h3>Search, Sort, Refetch & Reset</h3>

        <label>{"Enter your name: "}</label>
        <input type="text" ref={nameRef} />
        <button onClick={() => setShowList(true)}>Next</button>
      </div>
    );
  }
  return (
    <div className="App">
      <h1>Fetch API Example</h1>
      {nameRef?.current?.value && (
        <h2>{`Welcome ${nameRef?.current?.value}`}</h2>
      )}
      <button
        onClick={() => {
          setData([]);
        }}
      >
        Reset
      </button>
      <button
        onClick={() => {
          handleFetch();
        }}
      >
        Refetch
      </button>
      <button onClick={() => setShowList(false)}>Back</button>
      <button
        onClick={() => {
          setData([...data.sort((a, b) => a.title.localeCompare(b.title))]);
        }}
      >
        Sort A-Z
      </button>
      <br />
      <br />
      <input
        type="text"
        placeholder="Search.."
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <br />
      <br />
      <div className="todo-container">
        {data &&
          data
            .filter(
              (item) =>
                item.title.startsWith(searchValue) ||
                item.title.includes(searchValue)
            )
            .map((item) => (
              <Todo
                title={item.title}
                key={item.id}
                onClick={() =>
                  setData([...data.filter((x) => x.id !== item.id)])
                }
              />
            ))}
      </div>
    </div>
  );
}
