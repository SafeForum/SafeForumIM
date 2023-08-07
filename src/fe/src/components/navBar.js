import { useEffect, useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  let navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };
  const [state, setState] = useState(false);
  const navRef = useRef();

  const navigation = [
    { title: "Customers", path: "/" },
    { title: "Guides", path: "/" },
    { title: "Partners", path: "/" },
    { title: "Teams", path: "/" },
    { title: "Blog", path: "/" },
  ];

  useEffect(() => {
    const body = document.body;

    // Disable scrolling
    const customBodyStyle = ["overflow-hidden", "lg:overflow-visible"];
    if (state) body.classList.add(...customBodyStyle);
    // Enable scrolling
    else body.classList.remove(...customBodyStyle);

    // Sticky strick
    const customStyle = ["sticky-nav", "fixed", "border-b"];
    window.onscroll = () => {
      if (window.scrollY > 80) navRef.current.classList.add(...customStyle);
      else navRef.current.classList.remove(...customStyle);
    };
  }, [state]);

  return (
    <nav ref={navRef} className="bg-white w-full top-0 z-20">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:px-8 lg:flex">
        <div className="flex items-center justify-between py-3 lg:py-4 lg:block">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
          </Link>
          <div className="lg:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-between flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto ${
            state ? "h-screen pb-20 overflow-auto pr-4" : "hidden"
          }`}
        >
          {token ? (
            <>
              <ul className="flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row">
              <li className="mt-8 lg:mt-0">
                  <button
                    onClick={onLogout}
                    className="py-3 px-4 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow block lg:inline"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <div>
              <ul className="flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row">
                <li className="mt-8 mb-8 lg:mt-0 lg:mb-0">
                  <Link to="/" className="text-gray-600 hover:text-indigo-600">
                    Contact
                  </Link>
                </li>
                <li className="mt-4 lg:mt-0">
                  <Link
                    to="/login"
                    className="py-3 px-4 text-center border text-gray-600 hover:text-indigo-600 rounded-md block lg:inline lg:border-0"
                  >
                    Login
                  </Link>
                </li>
                <li className="mt-8 lg:mt-0">
                  <Link
                    to="/register"
                    className="py-3 px-4 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow block lg:inline"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <div className="flex-1">
            <ul className="justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
              {navigation.map((item, idx) => {
                return (
                  <li key={idx} className="text-gray-600 hover:text-indigo-600">
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

// function Navbar() {
//   return (
//     <>
//      <h1 className="text-3xl font-bold">
//       NavBar
//     </h1>
//     </>
//   );
// }

export default Navbar;
