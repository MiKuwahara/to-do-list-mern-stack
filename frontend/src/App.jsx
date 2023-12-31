import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import DeleteToDo from "./pages/DeleteToDo.jsx";
import CreateToDo from './pages/CreateToDo.jsx';
import EditToDo from './pages/EditToDo.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/todolist/delete/:id" element={<DeleteToDo />}></Route>
      <Route path="/todolist/create" element={<CreateToDo />} ></Route>
      <Route path="/todolist/edit/:id" element={<EditToDo />}></Route>
    </Routes>
  )
}

export default App