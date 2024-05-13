import React from "react";
import { Route, NavLink, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Run from "../pages/Run";
import Edit from "../pages/Edit";
import Result from "../pages/Result";

export const NavBar = () => (
  <>
    <NavLink className="sjs-nav-button" to="/">
      <span>My Surveys</span>
    </NavLink>
  </>
);

const NoMatch = () => (
  <>
    <h1>404</h1>
  </>
);

const Content: React.FC = (): React.ReactElement => (
  <>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/run/:id" element={<Run />}></Route>
      <Route path="/edit/:id" element={<Edit />}></Route>
      <Route path="/result/:id" element={<Result />}></Route>
      <Route element={<NoMatch />}></Route>
    </Routes>
  </>
);

export default Content;
