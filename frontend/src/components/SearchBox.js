import { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert, Box, Button, Input, Stack } from "@mui/material";
import PredictionContext from "../store";

const SearchBox = () => {
  const [input, setInput] = useState("");
  const { preds, setPreds } = useContext(PredictionContext);

  const predict = async () => {
    try {
      if (!input) {
        toast("Enter some text to predict");
        setInput("");
        return;
      }
      const { data: prediction } = await axios.post("/predict", {
        text: input,
      });

      toast(prediction);
      console.log(preds);
      console.log([...preds]);
      console.log([...preds].push({ input, prediction }));
      const newPreds = [...preds];
      newPreds.push({ input, prediction });
      setPreds(newPreds);
      setInput("");
      console.log(preds);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack direction={"column"} alignItems={"center"} justifyContent={"center"}>
      <Input
        size="small"
        width="10px"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <Button onClick={predict}>Predict the Sentiment</Button>
      <ToastContainer />
    </Stack>
  );
};

export default SearchBox;
