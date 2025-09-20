
"use client";

import { useState } from "react";
import "../styles/globals.css";
import { User } from "../utils/Users";

type UserFormProps = {
    onSubmit: (user: Omit<User, 'id'>) => void;

};
const UserForm = ({ onSubmit }: UserFormProps) => {
    const [formData, setFormData] = useState<Omit<User, 'id'>>({
        name: "",
        email: "",
        role: "user",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
        // Aquí podrías agregar la lógica para enviar los datos a un servidor o actualizar el estado global
        onSubmit(formData);
        setFormData({ name: "", email: "", role: "user" }); // Reset form
    }

    return (
        <div className="form-container">
            <h2>Formulario de Usuario</h2>
            <form className='user-form'>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="role">Rol:</label>
                    <select id="role" name="role" value={formData.role} onChange={handleChange}>
                        <option value="admin">Admin</option>
                        <option value="user">Usuario</option>
                    </select>
                </div>
                <button type="submit" onClick={handleSubmit}>Guardar</button>
            </form>
        </div>
    )
}

export default UserForm