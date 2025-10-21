// app/favorites/page.tsx
"use client";
import { useFavorites } from "@/app/hooks/useFavorites";
import { FavoriteButton } from "@/app/components/FavoriteButton";

export default function FavoritesPage() {
    const { data, isLoading, isError } = useFavorites();
    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar favoritos</p>;
    if (!data?.length) return <p>Sin favoritos</p>;

    return (
        <ul>
            {data.map(f => (
                <li key={f.id}>
                    <img src={f.sprite} alt={f.name} width={56} height={56} />
                    <span>{f.name}</span>
                    <FavoriteButton id={f.id} name={f.name} sprite={f.sprite} />
                </li>
            ))}
        </ul>
    );
}