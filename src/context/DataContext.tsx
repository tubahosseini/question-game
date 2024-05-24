// src/context/DataContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { dataType } from "../components/setup/Setup";

interface DataContextType {
  data: dataType[];
  setData: React.Dispatch<React.SetStateAction<dataType[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<dataType[]>([]);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
