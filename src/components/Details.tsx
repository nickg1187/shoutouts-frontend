import { useNavigate, useParams } from "react-router-dom";
import "./Details.css";
import { useContext, useEffect, useState } from "react";
import Shoutout from "../models/Shoutout";
import ListOfShoutouts from "./ListOfShoutouts";
import {
  getMyShoutouts,
  getShoutoutsByName,
} from "../services/shoutoutApiService";
import NewSOForm from "./NewSOForm";
import AuthContext from "../context/AuthContext";

const Details = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();

  const nameFromPathParam: string | undefined = useParams().name;
  // console.log(nameFromPathParam);

  const [shoutoutsToSomebody, setShoutoutsToSomebody] = useState<Shoutout[]>(
    []
  );

  const updateShoutouts = async (): Promise<void> => {
    if (nameFromPathParam) {
      // we're at /user/:name
      const res = await getShoutoutsByName(nameFromPathParam);
      console.log(res);
      setShoutoutsToSomebody(res);
    } else {
      // we're at /me
      // if google user is logged in:
      // && they have a displayName
      if (user && user.displayName) {
        const res = await getMyShoutouts(user.displayName);
        setShoutoutsToSomebody(res); // set state variable
      } else {
        // no path param -- we're at /me
        // also -- no google user
        // redirect the user with useNavigate
        setTimeout(() => {
          if (!user) {
            navigate("/");
          }
        }, 1000);
      }
    }
  };

  useEffect(() => {
    // call a fn that get all so's to a particular person
    updateShoutouts();
  }, [nameFromPathParam, user, updateShoutouts]);

  return (
    <main className="Details">
      <NewSOForm update={updateShoutouts} name={nameFromPathParam} />
      <ListOfShoutouts
        shoutouts={shoutoutsToSomebody}
        name={nameFromPathParam}
        update={updateShoutouts}
      />
    </main>
  );
};

export default Details;
