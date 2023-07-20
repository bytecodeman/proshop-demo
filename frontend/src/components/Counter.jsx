import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const buttonclick = () => {
    setCount(count + 1);
  };

  console.log(count);
  return (
    <>
      <p>{count}</p>
      <button type="button" onClick={buttonclick}>
        Increment
      </button>
    </>
  );
};

export default Counter;
