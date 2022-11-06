import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import Home from "./Component/Home/Home";
import About from "./Component/About/About";
import Movies from "./Component/Movies/Movies";
import TvShows from "./Component/TvShows/TvShows";
import People from "./Component/People/People";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import Logout from "./Component/Logout/Logout";
import NotFound from "./Component/NotFound/NotFound";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoutes from "./Component/ProtectedRoutes/ProtectedRoutes";
import { useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';
import Details from './Component/Details/Details';



function App() {
  let [loginData, setLoginData] = useState(null);

  function setUserData(){
    let token = localStorage.getItem('token');
    let decoded = jwtDecode(token);
    setLoginData(decoded);
  }
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setUserData();
    }
  }, [])
  
  function logout(){
    localStorage.removeItem('token');
    setLoginData(null);
    Navigate('./login');
  }
  return (
    <div className="">
      <Navbar loginData={loginData} logout={logout} />
      <div className="container">
        <Routes>
          <Route element={<ProtectedRoutes loginData={loginData} />}>
          <Route path="/" element={<Home />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="movies" element={<Movies />}></Route>
            <Route path="tvshows" element={<TvShows />}></Route>
            <Route path="people" element={<People />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="details" element={<Details />}></Route>

          </Route>

          <Route path="login" element={<Login setUserData={setUserData} />}></Route>
          <Route path="register" element={<Register />}></Route>
          {/* <Route path="logout" element={<Logout />}></Route> */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
