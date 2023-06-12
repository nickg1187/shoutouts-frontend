// import "./Main.css";
import { useEffect, useState } from "react";
import Shoutout from "../models/Shoutout";
import ListOfShoutouts from "./ListOfShoutouts";
import NewSOForm from "./NewSOForm";
import { getAllShoutouts } from "../services/shoutoutApiService";

const Main = () => {
  const [allShoutouts, setAllShoutouts] = useState<Shoutout[]>([]);

  const updateShoutouts = async (): Promise<void> => {
    // getAllShoutouts().then((res) => {
    //   console.log(res);
    //   setAllShoutouts(res);
    // });
    const res = await getAllShoutouts();
    console.log(res);
    setAllShoutouts(res);
  };

  useEffect(() => {
    updateShoutouts();
  }, []);
  return (
    <main className="Main">
      <NewSOForm update={updateShoutouts} />
      <ListOfShoutouts shoutouts={allShoutouts} update={updateShoutouts} />
    </main>
  );
};

export default Main;
