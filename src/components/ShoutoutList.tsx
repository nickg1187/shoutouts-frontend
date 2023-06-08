import Shoutout from "../models/Shoutout";
import "./ShoutoutList.css";
import SingleShoutout from "./SingleShoutout";

interface Props {
  shoutz: Shoutout[];
}

const ShoutoutList = ({ shoutz }: Props) => {
  return (
    <div className="ShoutoutList">
      <ul>
        {shoutz.map((aShout) => (
          <SingleShoutout key={aShout._id} shoutObj={aShout} />
        ))}
      </ul>
    </div>
  );
};

export default ShoutoutList;
