import { Link } from "react-router-dom";
import Shoutout from "../models/Shoutout";
import "./SingleShoutout.css";
import { deleteOneShoutout } from "../services/shoutoutApiService";

interface Props {
  shoutout: Shoutout;
  update: () => void;
}

const SingleShoutout = ({ shoutout, update }: Props) => {
  const deleteHandler = (): void => {
    deleteOneShoutout(shoutout._id!).then((zebra) => {
      console.log(zebra);
      update();
    });
  };

  return (
    <li className="SingleShoutout">
      <h3>
        Shoutout to{" "}
        <Link to={`/user/${encodeURIComponent(shoutout.to)}`}>
          {shoutout.to}
        </Link>
      </h3>
      <p className="from">
        — from{" "}
        {shoutout.authorPhoto && (
          <img
            className="author-img"
            src={shoutout.authorPhoto}
            alt="author profile"
          />
        )}
        <Link to={`/user/${encodeURIComponent(shoutout.from)}`}>
          {shoutout.from}
        </Link>
      </p>
      <p>{shoutout.text}</p>
      {shoutout.shoutoutPhoto && (
        <img src={shoutout.shoutoutPhoto} alt="shoutout" />
      )}
      <button onClick={deleteHandler}>delete</button>
    </li>
  );
};

export default SingleShoutout;
