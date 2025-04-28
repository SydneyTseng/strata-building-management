/*
import { NextResponse } from "next/server";

export const runtime = "edge";

let residents = [
    { id: 1, name: "Resident1 hi", status: "Paid" },
    { id: 2, name: "Resident2 here", status: "Unpaid" },
    { id: 3, name: "one more", status: "Unpaid" },
    { id: 4, name: "last", status: "Unpaid" },
    { id: 5, name: "a", status: "Unpaid" },
    { id: 6, name: "b", status: "Unpaid" },
    { id: 7, name: "c", status: "Unpaid" },
    { id: 8, name: "d", status: "Unpaid" },
    { id: 9, name: "e", status: "paid" },
    { id: 10, name: "f", status: "Unpaid" }
];

export async function GET() {
    return NextResponse.json({
        residents,
        total_unpaid: residents.filter(res => res.status === "Unpaid").length,
    });
}


export async function PATCH(req: Request) {
    try {
        const { id } = await req.json();

        const resident = residents.find((r) => r.id === id);
        if (!resident) {
            return NextResponse.json({ error: "Resident not found" }, { status: 404 });
        }

        resident.status = resident.status === "Paid" ? "Unpaid" : "Paid";

        return NextResponse.json({ message: "Status updated", resident });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
*/

// app/api/levies/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET() {
    try {
        const client = await pool.connect();
        const res = await client.query("SELECT id, name, levy_status FROM residents");
        client.release();

        const residents = res.rows.map((row) => ({
            id: row.id,
            name: row.name,
            status: row.levy_status === "paid" ? "Paid" : "Unpaid",
        }));

        const total_unpaid = residents.filter(r => r.status === "Unpaid").length;

        return NextResponse.json({ residents, total_unpaid });
    } catch (error) {
        console.error("Database error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { id } = await req.json();

        const client = await pool.connect();
        const getRes = await client.query("SELECT levy_status FROM residents WHERE id = $1", [id]);
        if (getRes.rows.length === 0) {
            return new NextResponse("Resident not found", { status: 404 });
        }

        const currentStatus = getRes.rows[0].levy_status;
        const newStatus = currentStatus === "paid" ? "unpaid" : "paid";

        const updateRes = await client.query(
            "UPDATE residents SET levy_status = $1 WHERE id = $2 RETURNING id, name, levy_status",
            [newStatus, id]
        );
        client.release();

        const updated = updateRes.rows[0];

        return NextResponse.json({
            resident: {
                id: updated.id,
                name: updated.name,
                status: updated.levy_status === "paid" ? "Paid" : "Unpaid",
            },
        });
    } catch (error) {
        console.error("PATCH error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
