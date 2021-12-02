import react, { useState } from "react";
import Navbar from "./components/navbar/navbar";
import './App.css'
import Selector from "./components/selector/selector";
import Payment from "./pages/payment/payment";
import Explorer from "./pages/explorer/explorer";
import PoS from "./pages/pos/pos.js";
import Entry from "./pages/entry/entry.js";
import axios from "axios";

function App() {

  const [selected, setSelected] = useState(0)
  axios.defaults.baseURL = 'https://dexters-coffee.herokuapp.com'
  return (
    <div className="App">
      <Navbar />
      <Selector setSelected={setSelected} />
      {selected == 0 ? <Payment /> : (selected == 1 ? <PoS /> : (selected == 2 ? <Entry /> : <Explorer />))}
    </div>
  );
}

export default App;
