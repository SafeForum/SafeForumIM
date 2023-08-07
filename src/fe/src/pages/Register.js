import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utilities/hooks";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const CREATE_USER = gql`
  mutation CreateUser($userInput: UserInput!, $profileInput: ProfileInput) {
    createUser(userInput: $userInput, profileInput: $profileInput) {
      token
      userId
      tokenExpiration
      cityPortal
    }
  }
`;

const Register = (props) => {
  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const { login, currentCityPortal } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    setTimeout(() => {}, 8000);
    if (currentCityPortal) {
      navigate(`/dashboard/${currentCityPortal}`);
    }
  }, [currentCityPortal, navigate]);



  function loginUserCallback() {
    gql_login();
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    city: "",
    state: "",
    bio: "",
    occupation: "",
  });

  //3. separate values
  //replace with values.email... etc
  const userInput = {
    email: values.email,
    password: values.password,
    firstName: values.firstName,
    lastName: values.lastName,
    dob: values.dob,
    city: values.city,
    state: values.state,
  };

  const profileInput = {
    bio: values.bio,
    occupation: values.occupation,
  };

  const [gql_login, { loading }] = useMutation(CREATE_USER, {
    update(proxy, { data: { createUser: userData } }) {
      login(userData);
      setIsLoading(loading)
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    //4. send as variables to backend
    variables: {
      userInput: userInput,
      profileInput: profileInput,
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="text-center font-semibold font-serif mt-10">
        <img
          src="https://floatui.com/logo.svg"
          width={150}
          className="mx-auto font-serif mt-10"
          alt="logo"
        />
        <p className=" mt-10 mx-auto text-center font-bold">Register</p>
      </div>
      <form>
        <div className="max-w-md px-4 mx-auto">
          <label htmlFor="Email" className="font-medium">
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            id="email"
            onChange={onChange}
            required
            size="28"
            className="mx-auto my-auto w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div className="max-w-md px-4 mx-auto">
          <label htmlFor="Password" className="font-medium">
            Password
          </label>
          <input
            size="24"
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            onChange={onChange}
            required
            className="mx-auto my-auto w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div className="max-w-md px-4 mx-auto">
          <label htmlFor="First Name" className="font-medium">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            id=""
            onChange={onChange}
            required
            size="24"
            className="mx-auto my-auto w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div className="max-w-md px-4 mx-auto">
          <label htmlFor="Last Name" className="font-medium">
            Last Name
          </label>
          <input
            size="24"
            type="text"
            name="lastName"
            placeholder="last name"
            id="email"
            onChange={onChange}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div className="max-w-md px-4 mx-auto">
          <label htmlFor="City" className="font-medium">
            City
          </label>
          <input
            type="text"
            name="city"
            placeholder="city"
            id="city"
            size="28"
            onChange={onChange}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div className="max-w-md px-4 mx-auto">
          <label htmlFor="State" className="font-medium">
            State
          </label>
          <input
            type="text"
            name="state"
            placeholder="state"
            id="state"
            size="28"
            onChange={onChange}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div className="max-w-md px-4 mx-auto">
          <label htmlFor="Occupation" className="font-medium">
            Occupation
          </label>
          <input
            size="24"
            type="text"
            name="occupation"
            placeholder="occupation"
            id="occupation"
            onChange={onChange}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div className="max-w-md px-4 mx-auto">
          <label htmlFor="biography" className="font-medium">
            Biography
          </label>
          <br/>
          <textarea
            name="biography"
            type="textarea"
            placeholder="biography"
            id="biography"  
            className="w-full mb-40 mt-2 px-3 py-2 text-gray-500
          bg-transparent outline-none border focus:border-indigo-600 shadow-sm
          rounded-lg"
            onChange={onChange}
            required
    
    


          />
        </div>
        {errors.map(function (error) {
            return <p>{error.message}</p>;
          })}
        <div className="flex justify-center">
          <button className="px-7 py-4 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 acrtive:shadow">
            REGISTER
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
