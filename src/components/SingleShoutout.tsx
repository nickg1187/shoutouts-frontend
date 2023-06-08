import Shoutout from "../models/Shoutout";
import "./SingleShoutout.css";

interface Props {
  shoutObj: Shoutout;
}

const SingleShoutout = ({ shoutObj }: Props) => {
  return (
    <div className="SingleShoutout">
      <h3>Shout out to {shoutObj.to}</h3>
      <p className="from-text">- From {shoutObj.from}</p>
      <p>{shoutObj.text}</p>
    </div>
  );
};

export default SingleShoutout;
