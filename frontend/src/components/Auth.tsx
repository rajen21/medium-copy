import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { SignupInput } from "@rajanchavda/medium-common";
import { BACKEND_URL } from "../config";

function Auth({ type }: { type: "signup" | "signin" }) {
  const [postInputs, setPostInput] = useState<SignupInput>({
    name: "",
    username: "",
    password: ""
  });
  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, postInputs);
      const jwt = res.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      
    }
  }
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">
              Create an account
            </div>
            <div className="text-slate-400">
              {type === "signin" ? "Don't have an account?" : "Already have an account?"}
              <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>{type === "signin" ? "Sign up" : "Sign in"}</Link>
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" && (
              <LabelledInput label="Name" placeholder="Enter name here..." onChange={(e) => {
                setPostInput((inputs) => ({ ...inputs, name: e.target.value }))
              }} />
            )}
            <LabelledInput label="Email" placeholder="Enter email here..." onChange={(e) => {
              setPostInput((inputs) => ({ ...inputs, username: e.target.value }))
            }} />
            <LabelledInput label="Password" type="password" placeholder="Enter password here..." onChange={(e) => {
              setPostInput((inputs) => ({ ...inputs, password: e.target.value }))
            }} />
            <button onClick={sendRequest} className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              {type === "signin" ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth;

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}


function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-black pt-4">{label}</label>
      <input onChange={onChange} type={type ?? "text"} className="bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
  )
}