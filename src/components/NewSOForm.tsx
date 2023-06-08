import { FormEvent, useState } from "react";
import "./NewSOForm.css";
import { submitShoutout } from "../services/shoutoutApiService";

interface Props {
  update: () => void;
}

const NewSOForm = ({ update }: Props) => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await submitShoutout({ to, from, text });
    update();
    setTo("");
    setFrom("");
    setText("");
  };
  return (
    <form className="Form" onSubmit={handleSubmit}>
      <h3>Leave A Shoutout</h3>
      <label htmlFor="to">To</label>
      <input
        type="text"
        name="to"
        id="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <label htmlFor="name">From</label>
      <input
        type="text"
        name="from"
        id="from"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <label htmlFor="name">Shout Out</label>
      <input
        type="text"
        name="shoutout"
        id="shoutout"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button>Submit Shout Out!</button>
    </form>
  );
};

export default NewSOForm;
