import "./App.css";
import CurrencyConverter from "./components/currencyconverter/CurrencyConverter.jsx";
import Header from "./components/header/Header.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<CurrencyConverter />} />
      </Routes>
    </>
  );
}

export default App;


