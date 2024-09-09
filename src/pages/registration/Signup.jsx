import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Mycontext } from "../../context/MyCotext";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDb } from "../../firebase/FirebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const contex = useContext(Mycontext);
  const { loading, setLoading } = contex;

  const signup = async () => {
    setLoading(true);
    if (name === "" || email === "" || password === "") {
      toast.error("all fields are required");
    }
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);
      console.log(users);
      var user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now(),
      };
      const userref = collection(fireDb, "users");
      await addDoc(userref, user);
      toast.success("signupped successfully");
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className=" flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Signup
          </h1>
        </div>
        <div>
          <input
            type="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="name"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
        </div>
        <div className=" flex justify-center mb-3">
          <button
            className=" bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg"
            onClick={() => {
              signup();
            }}
          >
            Signup
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Have an account{" "}
            <Link className=" text-red-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}
