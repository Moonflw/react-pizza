import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./page/Home";
import NotFound from "./page/NotFound";
import "./scss/app.scss";
import Cart from "./page/Cart";
import { useState } from "react";
export const SearchContext = React.createContext();
function App() {
  const [searctValue, setSearctValue] = useState("");
 
  return (
    <div className="wrapper">      
      <SearchContext.Provider value={{ searctValue, setSearctValue }}>
        <Header  />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
