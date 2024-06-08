import { dataType } from "../components/setup/Setup";
import React, { createContext, useState, useContext, ReactNode } from "react";

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
