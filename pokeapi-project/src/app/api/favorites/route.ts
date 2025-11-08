import { NextResponse } from "next/server";
import { favoritesDb } from "@/app/lib/favorites-db";

export async function GET() {
    const data = await favoritesDb.all();
    return NextResponse.json(data, { status: 200 });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id, name, sprite, nombrePersonalizado, descripcion } = body ?? {};

        if (typeof id !== "number" || !name || !sprite) {
            return NextResponse.json({ error: "Campos requeridos: id, name, sprite" }, { status: 400 });
        }
        const created = await favoritesDb.add({ 
            id, 
            name, 
            sprite, 
            nombrePersonalizado: nombrePersonalizado || name,
            descripcion: descripcion || ""
        });
        if (!created) {
            return NextResponse.json({ error: "Ya existe en favoritos" }, { status: 409 });
        }
        return NextResponse.json(created, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Error al crear favorito" }, { status: 500 });
    }
}