import { createContext, useState } from "react";

const PredictionContext = createContext();

export const PredictionProvider = ({ children }) => {
  const [preds, setPreds] = useState([]);
  return (
    <PredictionContext.Provider value={{ preds, setPreds }}>
      {children}
    </PredictionContext.Provider>
  );
};

export default PredictionContext;
