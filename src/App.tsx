import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonList from "./PokemonList";
import PokemonDailyFight from "./PokemonDailyFight";
import { Navbar } from "./Navbar";
import { Fight } from "./Fight";

const App = () => {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/daily" element={<PokemonDailyFight />} />
          <Route path="/daily/fight" element={<Fight />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
