import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <form
      className=" min-h-[80vh] flex items-center"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "Sign Up" : "Login"} to book appointment
        </p>
        {state === "Sign Up" &&<div className="w-full">
          <p>Full Name</p>
          <input
            className="w-full rounded border border-zinc300 p-2 m-1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.name)}
            required
          />
        </div> }
   
        <div className="w-full">
          <p>Email</p>
          <input
            className="w-full rounded border border-zinc300 p-2 m-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.email)}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="w-full rounded border border-zinc300 p-2 m-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.password)}
            required
          />
        </div>

        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ?
         <p>Already have an account? <span onClick={()=>setState("Login")} className="text-primary underline cursor-pointer">Login here</span> </p> 
        :<p> Create an new account?  <span onClick={()=>setState("Sign Up")} className="text-primary underline cursor-pointer">click here</span></p>}

      </div>
    </form>
  );
};

export default Login;
