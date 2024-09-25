"use client";

import { Button } from "@material-tailwind/react";
import { useState } from "react";

import React from "react";

const UpdatUser = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!id) {
        alert("Please provide user ID")
        return;
    }

    const requestedData = { id };

    if (name) {
        requestedData.name = name;
    }
    if (email) {
        requestedData.email = email;
    }
    if (name) {
        requestedData.password = password;
    }
     try {
        const response = await fetch('/api/users', {
            method: 'PUT',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(requestedData)
        })

        if (response.ok) {
            alert('User information updated successfully')
            clearForm()
        } else {
            const data = await response.json()
            alert(data.result || 'Something went wrong while updating user information')
        }
     } catch (error) {
        alert(error)
     }
  };

  const clearForm = () => {
    setId('')
    setName('')
    setEmail('')
    setPassword('')
  }

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
          Edit User
        </Button>
      </form>
    </div>
  );
};

export default UpdatUser;
