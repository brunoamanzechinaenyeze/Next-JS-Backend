"use client";
import { Button, Card, List, ListItem} from "@material-tailwind/react";
import { useState } from "react";

const SpecificUser = () => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const response = await fetch(`/api/users/${userId}`);

    if (response.ok) {
      const res = await response.json();
      setUserData(res.user);
    } else {
      console.log("Error Fetching user data");
      setUserData(null);
    }
  };
  return (
    <div>
      <div className="flex">
        <div className="w-72">
          <input
          className="px-2 py-2 ml-8 border-b-2"
            label="Enter user ID"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <Button className="" onClick={fetchUserData}>
          Fetch User
        </Button>
      </div>
      {userData ? (
        userData.map((d) => (
          <>
            <Card className="w-96 mt-5">
              <List>
                <ListItem>ID: {d.id}</ListItem>
                <ListItem>Name: {d.name}</ListItem>
                <ListItem>User: {d.age}</ListItem>
                <ListItem>Age: {d.email}</ListItem>
                <ListItem>password: {d.password}</ListItem>
              </List>
            </Card>
          </>
        ))
      ) : (
        <p className="mt-2">Search for a specific user</p>
      )}
    </div>
  );
};

export default SpecificUser;
