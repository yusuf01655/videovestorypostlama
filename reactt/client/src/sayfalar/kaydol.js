import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (inputName) => (e) => {
    // Update the corresponding state based on the input field
    if (inputName === 'name') {
      setName(e.target.value);
    } else if (inputName === 'email') {
      setEmail(e.target.value);
    } else if (inputName === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/signup', {
  name,
  email,
  password,
})
  .then(function (response) {
    const data = response.data; // Extract data from the response
    console.log(data);

    if (data.success === true) {
      // Clear the form after successful registration
      setName('');
      setEmail('');
      setPassword('');
      toast.success('Sign up successfully, please Login!');
    }
  })
  .catch(function (error) {
    if (error.code === 11000 && error.keyPattern.username) {
      // Duplicate key error for the 'username' field
      console.log("Username already exists");
      
  }
  // Handle other errors
  console.error(error);
 
    toast.error(error.response.data.error);
  });

  };

  return (
    <div>
      <div className="container custom_className pt-5">
        <h2 className="signup_title text-center">SIGN UP</h2>
        <form className=" col-sm-6 offset-3 pt-5 signup_form">
          <div className="form-outline mb-4">
            <input
              onChange={handleChange('name')}
              type="text"
              id="form4Example1"
              className="form-control"
              value={name}
            />
            <label className="form-label" htmlFor="form4Example1">
              Isim
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              onChange={handleChange('email')}
              type="email"
              id="form4Example2"
              className="form-control"
              value={email}
            />
            <label className="form-label" htmlFor="form4Example2">
              Eposta
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              onChange={handleChange('password')}
              type="password"
              id="form4Example3"
              className="form-control"
              value={password}
            />
            <label className="form-label" htmlFor="form4Example3">
              Password
            </label>
          </div>

          <button
            onClick={handleSubmit}
            type="button"
            className="btn btn-primary btn-block mb-4"
          >
            Kaydol
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
