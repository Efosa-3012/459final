import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const Logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    alert("User logged out");
    navigate("/auth");
  };

  return (
    <div>
      <Link to="/">Home</Link>

      <Link to="/createbook">Create Book</Link>
      <Link to="/savedbooks">Saved Books</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <button onClick={Logout}>Loogout</button>
      )}
    </div>
  );
};
