import { useNavigate, useParams } from "react-router-dom";
import "./UserShout.css";
import { useContext, useEffect, useState } from "react";
import Shoutout from "../models/Shoutout";
import SingleShoutout from "./SingleShoutout";
import NewSOForm from "./NewSOForm";
import ShoutoutList from "./ShoutoutList";
import {
  getMyShoutouts,
  getShoutoutsByName,
} from "../services/shoutoutApiService";
import AuthContext from "../context/AuthContext";

interface Props {
  update: () => void;
}

const UserShout = ({ update }: Props) => {
  const { user } = useContext(AuthContext);
  const nameFromPathParam: string = useParams().name!;
  const [shout, setShout] = useState<Shoutout[]>([]);
  const navigate = useNavigate();

  const updateShoutouts = async (): Promise<void> => {
    if (nameFromPathParam) {
      const res = await getShoutoutsByName(nameFromPathParam);
      setShout(res);
    } else {
      if (user && user.displayName) {
        const res = await getMyShoutouts(user?.displayName);
        setShout(res);
      } else {
        setTimeout(() => {
          if (!user) {
            navigate("/");
          }
        }, 1000);
      }
    }
  };

  useEffect(() => {
    updateShoutouts();
  }, [nameFromPathParam, user]);

  return (
    <main className="UserShout">
      <NewSOForm update={updateShoutouts} name={nameFromPathParam} />
      <ShoutoutList
        shoutz={shout}
        name={nameFromPathParam}
        update={updateShoutouts}
      />
    </main>
  );
};

export default UserShout;
