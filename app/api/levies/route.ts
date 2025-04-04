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
