import React from "react";
import logo from "./logo.svg";
import { ButtonElm } from "./features/shared/components/Button";
import { Highscore } from "./features/shared/components/Highscore";

const Button = ButtonElm;
const Bu = Highscore;

function App() {
  return (
    <div className="App">
      <Button
        additionalClasses="bg-blue-500 w-full"
        name="toggelGrid"
        id="toggleGrids"
        text="click"
      />
      <Bu />
      <header className="App-header"></header>
    </div>
  );
}

export default App;
