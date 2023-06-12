import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import "./NewSOForm.css";
import { addAShoutout } from "../services/shoutoutApiService";
import Shoutout from "../models/Shoutout";
import AuthContext from "../context/AuthContext";
import { getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import { ref } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { log } from "console";

interface Props {
  update: () => void;
  name?: string;
}

const NewSOForm = ({ update, name }: Props) => {
  const { user } = useContext(AuthContext);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    const newShoutout: Shoutout = { to, from, text };

    // file upload...
    const someFiles = fileUploadRef.current?.files;
    // if there is a files array, and there is anything in that files array:
    if (someFiles && someFiles[0]) {
      console.log(someFiles[0]); // first thing - only thing - image we uploaded
      const newFile = someFiles[0];
      const storageRef = ref(storage, newFile.name);
      // uploadBytes is async
      uploadBytes(storageRef, newFile).then((snapshot) => {
        console.log(snapshot.ref.fullPath);
        // when the promise is returned, get download url
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          newShoutout.shoutoutPhoto = url;
          console.log(newShoutout.shoutoutPhoto);
          // if user is logged in with Google:
          // && the user has a photoURL
          if (user && user.photoURL) {
            newShoutout.authorPhoto = user.photoURL;
          }
          addAShoutout(newShoutout).then((res) => {
            console.log(res);
            update();
            setTo("");
            setFrom("");
            setText("");
          });
        });
      });
    }

    // post a shoutout
    // addAShoutout({ to, from, text }).then((res) => {
    //   console.log(res);
    //   // update all shoutouts
    //   update();
    //   setTo("");
    //   setFrom("");
    //   setText("");
    // });
  };

  useEffect(() => {
    if (user) {
      setFrom(user.displayName || "");
    } else {
      setFrom("");
    }
  }, [user]);

  useEffect(() => {
    if (name) {
      setTo(name || "");
    } else {
      setTo("");
    }
  }, [name]);

  return (
    <form className="NewSOForm" onSubmit={submitHandler}>
      <label htmlFor="to">To:</label>
      <input
        type="text"
        name="to"
        id="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={name ? true : false}
      />
      <label htmlFor="from">From:</label>
      <input
        type="text"
        name="from"
        id="from"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={user ? true : false}
      />
      <label htmlFor="so">Shout out:</label>
      <textarea
        name="so"
        id="so"
        cols={30}
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <label htmlFor="photo">Upload a photo:</label>
      <input type="file" name="photo" id="photo" ref={fileUploadRef} />
      <button>Submit Shout Out</button>
    </form>
  );
};

export default NewSOForm;
