import { Box, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import PredictionContext from "../store";

const PredictionList = () => {
  const { preds, setPreds } = useContext(PredictionContext);
  const lastRef = useRef();
  useEffect(() => {
    lastRef?.current?.focus();
  }, []);
  console.log(preds);
  return (
    <Stack>
      {preds ? (
        preds.map((pred, idx) => (
          <Box
            width={600}
            textAlign={"center"}
            borderColor={"black"}
            p={2}
            borderRadius={5}
            border={1}
            key={idx}
            bgcolor={
              pred.prediction === "positive"
                ? "green"
                : pred.prediction === "negative"
                ? "red"
                : ""
            }
          >
            <Typography fontSize={50} fontWeight={"bold"}>
              {pred.input}
            </Typography>
            <Typography fontSize={30}>predn: {pred.prediction}</Typography>
          </Box>
        ))
      ) : (
        <Box></Box>
      )}
    </Stack>
  );
};

export default PredictionList;
