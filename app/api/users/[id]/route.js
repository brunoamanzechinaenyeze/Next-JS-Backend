import { users } from '../../../util/db'
import { NextResponse } from "next/server";
import fs from 'fs'

export async function GET(_, res) {
  const { id } = await res.params;
  const user = users.filter((u) => u.id === id);
  return NextResponse.json({ user, ok: true });
}

//login
export async function POST(req, res) {
  let { name, email, password } = await req.json();
  const { id } = await res.params;
  const {
    name: uName,
    email: uEmail,
    password: uPassword,
  } = users.find((u) => u.id === id);

  if (uName === name && uEmail === email && uPassword === password) {
    return NextResponse.json({ result: "Successfully logged in" });
  } else if (!name || !email || !password) {
    return NextResponse.json({result: "Please fill al the input fields"});
  } else {
    return NextResponse.json({result: "Invalid Credentials"})
  }
}

// Delete Users
export async function DELETE(req, res) {
  const { id } = await res.params;

  //Find the index of the user to delete in the users array

  const userIndex = users.findIndex(e => e.id === id)

  if( userIndex === -1) {
    return NextResponse.json({ result: "User Not Found!"}, {status: 404})
  }

  //Remove user from the users array
  users.splice(userIndex, 1)

  //Extract just the user array from the updated data
  const updatedUsers = users;

  //convert updated user array to json string
  const updatedData = JSON.stringify(updatedUsers, null, 2);

  //Write the updated user array to a json string
  fs.writeFileSync(
    "./app/util/db.js",
    `export const users = ${updatedData};`,
    "utf-8"
  );

  return NextResponse.json({ success: "User successfully updated" });
}
