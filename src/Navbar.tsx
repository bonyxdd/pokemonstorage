import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Homepage</Link></li>
        <li><Link to="/daily">Daily Fight</Link></li>
      </ul>
    </nav>
  );
};
