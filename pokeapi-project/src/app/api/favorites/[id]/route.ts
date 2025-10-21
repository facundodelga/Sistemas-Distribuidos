import { NextResponse } from "next/server";
import { favoritesDb } from "@/app/lib/favorites-db";

export async function DELETE(
    _req: Request,
    { params }: { params: { id: string } }
) {
    const id = Number(params.id);
    if (!Number.isInteger(id)) {
        return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }
    const ok = await favoritesDb.remove(id);
    if (!ok) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json({ message: "Eliminado" }, { status: 200 });
}