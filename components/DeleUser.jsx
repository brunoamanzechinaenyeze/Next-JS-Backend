"use client";
import { Button } from "@material-tailwind/react";
import { useState } from "react";

const DeleUser = () => {
  const [id, setId] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      alert("please provide user ID to delete the user");
    }

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("user succesfully deleted");
        clearForm();
      } else {
        const data = await response.json();
        alert(data.result || "Something went wrong while deleting the user.");
      }
    } catch (err) {
      alert(err);
    }
  };

  const clearForm = () => {
    setId("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="border-r-2 ml-2 border-white"
          label="User ID"
          type="text"
          placeholder="User ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <br />
        <br />
        <Button className="mt-2" type="submit">
          Delete User
        </Button>
      </form>
    </div>
  );
};

export default DeleUser;
