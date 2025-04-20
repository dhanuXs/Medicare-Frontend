import SignUp from "./pages/SignUpPage/SignUp.jsx";
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="*" element={<ErrorPage />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
