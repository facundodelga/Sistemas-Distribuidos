"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "@/app/api/favorites/services/favoritesService";
import type { Favorite } from "@/app/lib/favorites-db";

export function useFavorites() {
    return useQuery<Favorite[]>({
        queryKey: ["favorites"],
        queryFn: favoritesService.getAll,
    });
}

export function useAddFavorite() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: favoritesService.add,
        onSuccess: () => qc.invalidateQueries({ queryKey: ["favorites"] }),
    });
}

export function useRemoveFavorite() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: favoritesService.remove,
        onSuccess: () => qc.invalidateQueries({ queryKey: ["favorites"] }),
    });
}