import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./Components/MainPage";


function App() {
  return (
    <div className="App">
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<MainPage/>} />
    </Routes>
</div>
  );
}
export default App;