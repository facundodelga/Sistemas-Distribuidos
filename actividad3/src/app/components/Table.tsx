"use client";
import React from 'react'
import "../styles/globals.css";

interface TableProps {
    Columns ?: string[];
    Data ?: any[];
    onDelete ?: (id: number) => void;
}

const Table = ({ Columns, Data, onDelete }: TableProps) => {

    return (
        <div className="table-container">
            <div className="table-header">
                <h2>Lista de Usuarios</h2>
            </div>

            <table>
                
                <thead>
                    <tr>
                        {
                            Columns && Columns.map((col, index) => (
                                <th key={index}>{col}</th>
                            ))
                        }
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    
                        {
                            Data && Data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {
                                        Columns && Columns.map((col, colIndex) => (
                                            <td key={colIndex}>
                                                {row[col]}
                                            </td>
                                        ))
                                    }
                                    <td>
                                        <div className="table-actions">
                                            
                                            <button className="table-button-delete" onClick={() => onDelete && onDelete(row.id)}>Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                </tbody>
            </table>


        </div>
    )
}

export default Table;