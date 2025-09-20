"use client";
import UserForm from "./components/UserForm";
import "./styles/globals.css";
import Table from "./components/Table";
import { useEffect, useState } from "react";
import { addUser, deleteUser, getUsers, User, users } from "./utils/Users";

export default function Home() {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    setUserList(getUsers());
  }, []);


  const handleDelete = (id: number) => {
    // Implement delete functionality
    console.log("Deleting user with id: ", id);
    const updatedUserList = userList.filter(user => user.id !== id);
    setUserList(updatedUserList);
  }

  const handleAddUser = (user: Omit<User, 'id'>) => {
    userList.push({
      id: users.length + 1, ...user
    });
    setUserList([...userList]);
  }
  return (
    <div>
      <div className="titulo-principal">
        <h1>Gestión de Usuarios</h1>
      </div>
      <UserForm onSubmit={handleAddUser} />
      <Table 
        Columns={Object.keys(userList[0] || {})}
        Data={userList}
        onDelete={handleDelete}
      />
    </div>
  );
}
