import Shoutout from "../models/Shoutout";
import "./ShoutoutList.css";
import SingleShoutout from "./SingleShoutout";

interface Props {
  shoutz: Shoutout[];
  name?: string;
  update: () => void;
}

const ShoutoutList = ({ shoutz, name, update }: Props) => {
  return (
    <div className="ShoutoutList">
      {name ? <h2>Shoutouts to {name}</h2> : <h2>All Shoutouts</h2>}
      <ul>
        {shoutz.map((aShout) => (
          <SingleShoutout key={aShout._id} shoutout={aShout} update={update} />
        ))}
      </ul>
    </div>
  );
};

export default ShoutoutList;
