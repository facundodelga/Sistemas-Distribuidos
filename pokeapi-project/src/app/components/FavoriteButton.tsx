"use client";
import { useState } from "react";
import { useAddFavorite, useFavorites, useRemoveFavorite } from "@/app/hooks/useFavorites";
import AddFavoriteModal from "./AddFavoriteModal";

export function FavoriteButton(props: { id: number; name: string; sprite: string | null }) {
    const { data: favs } = useFavorites();
    const add = useAddFavorite();
    const rm = useRemoveFavorite();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isFav = !!favs?.some(f => f.id === props.id);
    const loading = add.isPending || rm.isPending;

    const handleRemove = () => {
        if (loading) return;
        rm.mutate(props.id);
    };

    const handleAddClick = () => {
        if (loading) return;
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (values: { nombrePersonalizado: string; descripcion: string }) => {
        if (!props.sprite) return;
        
        await add.mutateAsync({
            id: props.id,
            name: props.name,
            sprite: props.sprite,
            nombrePersonalizado: values.nombrePersonalizado,
            descripcion: values.descripcion,
        });
    };

    return (
        <>
            <button 
                onClick={isFav ? handleRemove : handleAddClick} 
                disabled={loading} 
                className="absolute top-3 right-3 bg-primary-400 border border-primary-700 text-white rounded-xl px-4 py-2 cursor-pointer text-sm capitalize shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 hover:bg-[#ffd700] hover:text-gray-800 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Procesando..." : isFav ? "★ Quitar" : "☆ Agregar"}
            </button>

            <AddFavoriteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                pokemonName={props.name}
            />
        </>
    );
}