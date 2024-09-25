import { users } from "../../util/db";
import { NextResponse } from "next/server";
import fs from "fs";

export function GET() {
  const data = users;
  return NextResponse.json({ data }, { status: 200 });
}

//creat user

export async function POST(req, _) {
  let { id, name, email, password } = await req.json();

  //check if the data is provided
  if (!id || !name || !email || !password) {
    return NextResponse.json(
      { result: "required field not found" },
      { status: 400 }
    );
  } else {
    //Add the new user in-memory array
    users.push({ id, name, email, password });

    //Extract just the user array from the updated data
    const updatedUsers = users;

    //convert updated user array to json string
    const updatedData = JSON.stringify(updatedUsers, null, 2);

    //Write the updated user array to a json string
    fs.writeFileSync(
      "./app/util/db.js",
      "utf-8",
      `export const users = ${updatedData};`,
    );

    return NextResponse.json({ success: "User successfully created" });
  }
}

// 5. Update user
export async function PUT(req, _) {
  let { id, name, email, password } = await req.json();

  //Find the user in the users array
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return NextResponse.json({ result: "User not found" }, { status: 400 });
  }

  if (name) {
    users[userIndex].name = name;
  }

  if (email) {
    users[userIndex].email = email;
  }

  if (password) {
    users[userIndex].password = password;
  }

  //Extract just the user array from the updated data
  const updatedUsers = users;

  //convert updated user array to json string
  const updatedData = JSON.stringify(updatedUsers, null, 2);

  //Write the updated user array to a json string
  fs.writeFileSync(
    "./app/util/db.js",
     "utf-8",
    `export const users = ${updatedData};`,
  );

  return NextResponse.json({ success: "User successfully updated" });
}
