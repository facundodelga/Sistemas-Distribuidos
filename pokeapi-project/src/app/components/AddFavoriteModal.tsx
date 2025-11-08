"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

// Esquema de validación con Yup
const favoriteSchema = Yup.object().shape({
    nombrePersonalizado: Yup.string()
        .transform((value) => (typeof value === "string" ? value.trim() : value))
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(50, "El nombre no puede tener más de 50 caracteres")
        .required("El nombre es obligatorio"),
    descripcion: Yup.string()
        .transform((value) => (typeof value === "string" ? value.trim() : value))
        .min(1, "La descripción es obligatoria")
        .max(200, "La descripción no puede tener más de 200 caracteres")
        .required("La descripción es obligatoria"),
});

interface FormValues {
    nombrePersonalizado: string;
    descripcion: string;
}

interface AddFavoriteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: FormValues) => Promise<void>;
    pokemonName: string;
}

export default function AddFavoriteModal({
    isOpen,
    onClose,
    onSubmit,
    pokemonName,
}: AddFavoriteModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            // Prevenir scroll del body cuando el modal está abierto
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const initialValues: FormValues = {
        nombrePersonalizado: pokemonName,
        descripcion: "",
    };

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        try {
            await onSubmit(values);
            onClose();
        } catch (error) {
            console.error("Error al agregar favorito:", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen || !mounted) return null;

    const modalContent = (
        <div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-[9999] animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] max-w-[500px] w-[90%] max-h-[90vh] overflow-y-auto animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b-2 border-gray-300">
                    <h2 className="m-0 text-primary-600 text-2xl">Agregar a Favoritos</h2>
                    <button
                        className="bg-transparent border-none text-2xl text-gray-500 cursor-pointer leading-none p-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-gray-300 hover:text-gray-800"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={favoriteSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {({ isSubmitting, dirty, isValid, errors, touched }) => (
                        <Form className="p-6">
                            <div className="mb-6">
                                <label htmlFor="nombrePersonalizado" className="block mb-2 text-gray-800 font-semibold text-[0.95rem]">
                                    Nombre Personalizado
                                </label>
                                <Field
                                    type="text"
                                    id="nombrePersonalizado"
                                    name="nombrePersonalizado"
                                    placeholder="Ingresa un nombre personalizado"
                                    className={`w-full px-3 py-3 border-2 rounded-lg text-base font-sans transition-all duration-200 box-border ${touched.nombrePersonalizado && errors.nombrePersonalizado
                                            ? "border-red-600 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                                            : "border-gray-300 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_3px_rgba(0,105,92,0.1)]"
                                        }`}
                                />
                                <ErrorMessage
                                    name="nombrePersonalizado"
                                    component="div"
                                    className="text-red-600 text-sm mt-2 block"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="descripcion" className="block mb-2 text-gray-800 font-semibold text-[0.95rem]">
                                    Descripción
                                </label>
                                <Field
                                    as="textarea"
                                    id="descripcion"
                                    name="descripcion"
                                    placeholder="Describe por qué este Pokémon es tu favorito"
                                    rows={4}
                                    className={`w-full px-3 py-3 border-2 rounded-lg text-base font-sans transition-all duration-200 box-border resize-y min-h-[100px] ${touched.descripcion && errors.descripcion
                                            ? "border-red-600 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                                            : "border-gray-300 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_3px_rgba(0,105,92,0.1)]"
                                        }`}
                                />
                                <ErrorMessage
                                    name="descripcion"
                                    component="div"
                                    className="text-red-600 text-sm mt-2 block"
                                />
                            </div>

                            <div className="flex justify-end gap-4 mt-6 pt-6 border-t-2 border-gray-300">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-3 border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 bg-gray-300 text-gray-800 hover:bg-gray-400 hover:-translate-y-0.5"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !dirty || !isValid}
                                    className="px-6 py-3 border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 bg-primary-600 text-white hover:bg-primary-700 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,105,92,0.3)] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                                >
                                    {isSubmitting ? "Agregando..." : "Agregar a Favoritos"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}

