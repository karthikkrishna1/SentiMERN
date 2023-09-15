import "./App.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <SearchBox />
      <ToastContainer />
    </>
  );
}

const SearchBox = () => {
  const [input, setInput] = useState("");

  const predict = async () => {
    try {
      const { data: prediction } = await axios.post("/predict", {
        text: input,
      });
      console.log(prediction);
      toast(prediction);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <input onChange={(e) => setInput(e.target.value)} value={input} />
      <button onClick={predict}></button>
    </>
  );
};

export default App;
