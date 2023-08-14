import React, { createContext, useContext, useState } from "react";

const ModelContext = createContext();

export default function ModelProvider({ children }) {
  const [isModelOpen, setIsModelOpen] = useState(false);

  return (
    <ModelContext.Provider value={{ isModelOpen, setIsModelOpen }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModel() {
  const { isModelOpen, setIsModelOpen } = useContext(ModelContext);

  return {
    isModelOpen,
    setIsModelOpen,
  };
}
