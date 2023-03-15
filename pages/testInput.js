import { useState } from "react";

function TestInput() {
  const [name, setName] = useState();

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const buttonHandler = (e) => {
    e.preventDefault();
    console.log(name);

    const response = fetch("http://localhost:3000/api/requests/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(name),
    });

    response
      .then((res) => {
        console.log(res, "Successful!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form onSubmit={buttonHandler}>
      <input onChange={nameHandler} />
      <button>Submit</button>
    </form>
  );
}

export default TestInput;
