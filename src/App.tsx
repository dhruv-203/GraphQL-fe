// import "./App.css";

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  console.log();
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-indigo-500 p-5 w-screen ">
        <div className="flex items-center flex-shrink-0 sm:text-3xl text-2xl font-bold text-white mr-6">
          GraphQL CRUD
        </div>
      </nav>
      <ToastContainer position="top-right" autoClose={5000} />
      <Outlet />
    </>
  );
}

export default App;
