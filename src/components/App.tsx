import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Editor from "./Editor";
import Home from "./Home";
import Faq from "./Faq";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
