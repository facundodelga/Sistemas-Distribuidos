"use client";
import { useAddFavorite, useFavorites, useRemoveFavorite } from "@/app/hooks/useFavorites";

export function FavoriteButton(props: { id: number; name: string; sprite: string | null }) {
    const { data: favs } = useFavorites();
    const add = useAddFavorite();
    const rm = useRemoveFavorite();

    const isFav = !!favs?.some(f => f.id === props.id);
    const loading = add.isPending || rm.isPending;

    const onClick = () => {
        if (loading) return;
        if (isFav) rm.mutate(props.id);
        else add.mutate({ id: props.id, name: props.name, sprite: props.sprite! });
    };

    return (
        <button onClick={onClick} disabled={loading} className="favorito-button">
            {loading ? "Procesando..." : isFav ? "★ Quitar" : "☆ Agregar"}
        </button>
    );
}