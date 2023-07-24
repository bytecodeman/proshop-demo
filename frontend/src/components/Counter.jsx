import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const buttonclick = () => {
    setCount(count + 1);
  };

  console.log(count);
  return (
    <>
      <p>{false}</p>
      <p>{null}</p>
      <p>{undefined}</p>
      <p>{""}</p>
      <p>{0}</p>
      <p>
        {(function () {
          switch (count % 2) {
            case 0:
              return "Even";
            case 1:
              return "Odd";
            default:
          }
        })()}
      </p>
      <button type="button" onClick={buttonclick}>
        Increment
      </button>
    </>
  );
};

export default Counter;
