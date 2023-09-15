import { Box } from "@mui/material";
import "./App.css";
import Heading from "./components/Heading";
import SearchBox from "./components/SearchBox";
import PredictionList from "./components/PredictionList";

function App() {
  return (
    <>
      <Heading />
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <SearchBox />
        <PredictionList />
      </Box>
    </>
  );
}

export default App;
