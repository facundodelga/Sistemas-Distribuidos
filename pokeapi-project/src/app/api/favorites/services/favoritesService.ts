import axios from "axios";
import type { Favorite } from "@/app/lib/favorites-db";

const api = axios.create({
    baseURL: "/api/favorites",
    headers: { "Content-Type": "application/json" },
});

export const favoritesService = {
    getAll: async (): Promise<Favorite[]> => {
        const res = await api.get<Favorite[]>("/");
        return res.data;
    },

    add: async (fav: { id: number; name: string; sprite: string; nombrePersonalizado: string; descripcion: string }): Promise<Favorite> => {
        try {
            const res = await api.post<Favorite>("/", fav);
            return res.data;
        } catch (err: any) {
            throw new Error(err.response?.data?.error ?? "Error al agregar");
        }
    },

    remove: async (id: number): Promise<void> => {
        try {
            await api.delete(`/${id}`);
        } catch (err: any) {
            throw new Error(err.response?.data?.error ?? "Error al eliminar");
        }
    },
};