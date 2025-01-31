import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import AllSuperheroes from "./components/allSuperheroes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AllSuperheroes />
    </>
  );
}

export default App;
