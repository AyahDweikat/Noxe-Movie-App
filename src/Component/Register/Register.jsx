import axios from "axios";
import React, { useState } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";


function Register() {
  let navigate = useNavigate();
  function gotoLogin(){
    let path ='/login';
    navigate(path);
  }
  let [user, setUser] = useState({
    name:"",
    password:"",
    age:"",
    email:"",
  });
  let [loading, setLoading]= useState(false)


  let [errorList, setErrorList]= useState([])
  let submitFormData = async(e)=>{
    e.preventDefault();
    setLoading(true);
    let validateResult = validationForm();
    if(validateResult.hasOwnProperty('error')){
      setErrorList(validateResult.error.details);
    }
    let {data} = await axios.post('https://knowledge-saraha.herokuapp.com/users/signUp', user);
    // console.log(data);
    if(data.message === 'success'){
    console.log(data.message);
    setLoading(false);
    gotoLogin();
    }
  }
  let getDataForm =(e)=>{
    let myUser = {...user};
    myUser[e.target.name]= e.target.value;
    setUser(myUser);
  }
  function validationForm(){
    const schema = Joi.object({
      name:Joi.string().alphanum().min(3).max(20).required(),
      age: Joi.number().required().min(20).max(75),
      email: Joi.string().required().email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required(),
    });
    return schema.validate(user, {abortEarly: false});
  }
  return (
    
    <div>
      {/* {console.log(errorList)} */}
      {errorList.map((error, idx)=>{
        return (
          <div className="alert alert-danger" key={idx}>{error.message}</div>
        )
      })}
      <form onSubmit={submitFormData}>
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            type="text" onChange={getDataForm}
            name="name"
            className="form-control"
            id="name"
            aria-describedby="name"
            placeholder="Name"
          />
          {/* {errorList[0]?.message? 
          <small id="emailHelp" className="form-text text-danger">
          {errorList[0].message}
          </small>
          : null} */}
        </div>
        <div className="form-group my-3">
          <label htmlFor="age">Age</label>
          <input
            type="number" onChange={getDataForm}
            name="age"
            className="form-control"
            id="age"
            aria-describedby="emailHelp"
            placeholder="Age"
          />
          {/* {errorList[1]?.message? 
          <small id="emailHelp" className="form-text text-danger">
          {errorList[1].message}
          </small>
          : null} */}
        </div>
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
          
          {
          // errorList[2]?.message? 
          // <small id="emailHelp" className="form-text text-danger">
          // {errorList[2].message}
          // </small>
          // :
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
          }
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
          {/* {errorList[3]?.message? 
          <small id="emailHelp" className="form-text text-danger">
          {errorList[3].message}
          </small>
          : null} */}
        </div>

        <button type="submit" className="btn btn-primary">
          {loading? <i className="fa-solid fa-spinner fa-spin"></i>: "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
