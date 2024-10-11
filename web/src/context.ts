import React from "react";
interface DataContextType {
    REACT_APP_API_URL: string;
  }
  const DataContext = React.createContext<DataContextType>({
    REACT_APP_API_URL: ""
  });
export default DataContext;