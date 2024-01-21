import { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  TextField,
  TextareaAutosize,
  Tooltip,
} from "@mui/material";
import PredictionContext from "../store";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

const SearchBox = () => {
  const [input, setInput] = useState("");
  const [link, setLink] = useState(false);
  const [language, setLanguage] = useState("English");
  const { preds, setPreds } = useContext(PredictionContext);

  const predict = async () => {
    try {
      if (!input) {
        link
          ? toast("Enter a link to predict")
          : toast("Enter some text to predict");
        setInput("");
        return;
      }
      const apiLink = !link
        ? "https://senti-x-server.vercel.app/predict"
        : "https://senti-x-server.vercel.app/predict/link";
      console.log("posted");
      const { data: prediction } = await axios.post(apiLink, {
        text: input,
      });

      toast(prediction);

      const newPreds = [...preds];

      if (link) {
        const { heading, ans } = prediction;
        newPreds.unshift({ input: heading, prediction: ans });
      } else {
        newPreds.unshift({ input, prediction });
      }
      setPreds(newPreds);
      setInput("");
      console.log(preds);
    } catch (err) {
      link ? toast("Not a Valid Link") : toast("Oops seems to be an error");
      console.error(err);
    }
  };

  return (
    <Stack direction={"column"} alignItems={"center"} justifyContent={"center"}>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <FormControl margin="dense">
          <FormLabel>Language</FormLabel>
          <Input
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            size="medium"
            width="20px"
            onChange={(e) => setInput(e.target.value)}
            placeholder={link ? "Enter your link here" : "Enter your text here"}
            value={input}
          />
        </FormControl>
        <Tooltip title="Click for link analysis" placement="right-end">
          <InsertLinkIcon
            color={link ? "success" : "secondary"}
            onClick={() => setLink(!link)}
          />
        </Tooltip>
      </Box>
      <Button onClick={predict}>Predict the Sentiment</Button>
      <ToastContainer />
    </Stack>
  );
};

export default SearchBox;
