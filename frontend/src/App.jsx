import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import DeleteToDo from "./pages/DeleteToDo.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/todolist/delete/:id" element={<DeleteToDo />}></Route>
    </Routes>
  )
}

export default App