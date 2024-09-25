"use client";
import { Button } from "@material-tailwind/react";
import { useState } from "react";

const CreateUser = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !name || !email || !password) {
      alert("Please  fill all the input fields");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/type",
        },
        body: JSON.stringify({ id, name, email, password }),
      });

      if (response.ok) {
        alert("User successfully created");
      } else {
        alert("something went wrong");
        return;
      }
    } catch (err) {
      alert(err);
      return;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="border-r-2 ml-2 border-white"
          label="ID"
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <br /> <br />
        <input
          className="border-r-2 ml-2 border-white"
          label="Name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <br /> <br />
        <input
          className="border-r-2 ml-2 border-white"
          label="Email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /> <br />
        <input
          className="border-r-2 ml-2 border-white"
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /> <br />
        <Button className="mt-2" type="submit">
          Create User
        </Button>
      </form>
    </div>
  );
};

export default CreateUser;
