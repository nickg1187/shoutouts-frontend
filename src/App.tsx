import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ShoutoutList from "./components/ShoutoutList";
import NewSOForm from "./components/NewSOForm";
import Shoutout from "./models/Shoutout";
import { getAllShoutouts } from "./services/shoutoutApiService";

function App() {
  const [allShoutouts, setAllShoutouts] = useState<Shoutout[]>([]);
  const refreshShoutouts = async () => {
    await getAllShoutouts().then((res) => {
      setAllShoutouts(res);
    });
  };
  useEffect(() => {
    refreshShoutouts();
  }, []);
  return (
    <div className="App">
      <h2>All Shout Outs</h2>
      <ShoutoutList shoutz={allShoutouts} />
      <NewSOForm update={refreshShoutouts} />
    </div>
  );
}

export default App;
