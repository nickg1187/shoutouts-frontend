import { useContext } from "react";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <header className="Header">
      <h1>Shoutout App</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <img src={user.photoURL || ""} alt="profile image" />
        </div>
      ) : (
        <p>Please sign in</p>
      )}
      <button onClick={signInWithGoogle}>Sign in</button>
      <button onClick={signOut}>Sign out</button>
    </header>
  );
};

export default Header;
