import React from "react";
import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [firstRender, setFirstRender] = useState(true);

  console.log("Count = ", count);
  useEffect(() => {
    console.log("Effect Count:", count);
    if (firstRender) {
      setCount(count + 1);
      setFirstRender(false);
    }
  }, [count]); // <- add the count variable here

  return (
    <>
      <p>Count: {count}</p>
      <button
        onClick={() => {
          setCount((c) => c + 1);
          setFirstRender(true);
        }}
      >
        +
      </button>
    </>
  );
}

export default Counter;
