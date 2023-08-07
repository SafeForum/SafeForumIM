import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../utilities/hooks";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../context/authContext";
import Loading from "../components/Loading";

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
      tokenExpiration
      cityPortal
    }
  }
`;

function Login(props) {
  let navigate = useNavigate();

  const { login, cityPortal } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(false);
    setTimeout(() => {}, 8000);
    if (cityPortal) {
      navigate(`/dashboard/${cityPortal}`);
    }
  }, [cityPortal, navigate]);

  function loginUserCallback() {
    gql_login();
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [gql_login, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      login(userData);
      setIsLoading(loading);
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { email: values.email, password: values.password },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <img
            src="https://floatui.com/logo.svg"
            width={150}
            className="mx-auto"
            alt="logo"
          />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p className="">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              name="email"
              placeholder="Email"
              onChange={onChange}
              type="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              name="password"
              placeholder="Password"
              onChange={onChange}
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          {errors.map(function (error) {
            return <p>{error.message}</p>;
          })}
          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Sign in
          </button>
          <div className="text-center">
            <Link to="/register" className="hover:text-indigo-600">
              Forgot password?
            </Link>
          </div>
        </form>
        <button className="px-5 py-3 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg">
          Signup
        </button>
      </div>
    </main>
  );
}

export default Login;
