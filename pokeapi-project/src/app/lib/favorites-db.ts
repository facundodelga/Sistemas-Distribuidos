
import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "favorites.json");

export interface Favorite {
    id: number;
    name: string;
    sprite: string;
    nombrePersonalizado: string;
    descripcion: string;
    addedAt: string;
}

async function readDB(): Promise<Favorite[]> {
    try {
        const raw = await fs.readFile(DB_PATH, "utf-8");
        const data = JSON.parse(raw);
        // Migrar favoritos antiguos que no tienen los nuevos campos
        return data.map((fav: any) => ({
            ...fav,
            nombrePersonalizado: fav.nombrePersonalizado || fav.name || "",
            descripcion: fav.descripcion || "",
        }));
    } catch {
        return [];
    }
}

async function writeDB(data: Favorite[]) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export const favoritesDb = {
    async all() {
        return readDB();
    },
    async exists(id: number) {
        const all = await readDB();
        return all.some(f => f.id === id);
    },
    async add(input: Omit<Favorite, "addedAt">) {
        const all = await readDB();
        if (all.some(f => f.id === input.id)) return null; // conflicto
        const fav: Favorite = { 
            ...input, 
            nombrePersonalizado: input.nombrePersonalizado || input.name,
            descripcion: input.descripcion || "",
            addedAt: new Date().toISOString() 
        };
        all.push(fav);
        await writeDB(all);
        return fav;
    },
    async remove(id: number) {
        const all = await readDB();
        const next = all.filter(f => f.id !== id);
        if (next.length === all.length) return false; // no encontrado
        await writeDB(next);
        return true;
    },
};
