import axios from "axios";
import React, { useState } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";


function Login({setUserData}) {
  let navigate = useNavigate();
  function gotoHome(){
    let path ='/home';
    navigate(path);
  }

  let [user, setUser] = useState({
    password:"",//same as in register
    email:"",
  });
  let [loading, setLoading]= useState(false);
  let [errorMsg, setErrorMsg] =  useState('')
  let submitFormData = async(e)=>{
    e.preventDefault();
    setLoading(true);
    // let validateResult = validationForm();
    // if(validateResult.hasOwnProperty('error')){
    //   setErrorList(validateResult.error.details);
    // }
    let {data} = await axios.post('https://knowledge-saraha.herokuapp.com/users/signIn', user);
    // console.log(data);
    if(data.message === 'login'){
    // setLoginData(true);
    localStorage.setItem('token', data.token);
    setLoading(false);
    setErrorMsg("");
    setUserData();
    gotoHome();
    } else {
      setErrorMsg(data.message);
      setLoading(false);
    }
  }
  let getDataForm =(e)=>{
    let myUser = {...user};
    myUser[e.target.name]= e.target.value;
    setUser(myUser);
  }
  function validationForm(){
    const schema = Joi.object({
      email: Joi.string().required().email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required(),
    });
    return schema.validate(user, {abortEarly: false});
  }
  return (
    <div>
      {/* {console.log(errorMsg)} */}
      {errorMsg?<div className="alert alert-danger">{errorMsg}</div> :""}
      <form onSubmit={submitFormData}>
        {/* <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            type="text" onChange={getDataForm}
            name="name"
            className="form-control"
            id="name"
            aria-describedby="name"
            placeholder="Name"
          />
        </div> */}
        {/* <div className="form-group my-3">
          <label htmlFor="age">Age</label>
          <input
            type="number" onChange={getDataForm}
            name="age"
            className="form-control"
            id="age"
            aria-describedby="emailHelp"
            placeholder="Age"
          />
        </div> */}
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email" onChange={getDataForm}
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input
            type="password" onChange={getDataForm}
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {loading? <i className="fa-solid fa-spinner fa-spin"></i>: "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
