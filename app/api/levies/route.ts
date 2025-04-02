import { NextResponse } from "next/server";

// Sample in-memory database (replace this with a real database)
let residents = [
    { id: 1, name: "Resident1 hi", status: "Paid" },
    { id: 2, name: "Resident2 here", status: "Unpaid" },
    { id: 3, name: "one more", status: "Unpaid" },
    { id: 4, name: "last", status: "Unpaid" }
];

export async function GET() {
    return NextResponse.json(residents);
}

export async function PATCH(req: Request) {
    try {
        const { id } = await req.json();

        // Find the resident
        const resident = residents.find((r) => r.id === id);
        if (!resident) {
            return NextResponse.json({ error: "Resident not found" }, { status: 404 });
        }

        // Toggle the status
        resident.status = resident.status === "Paid" ? "Unpaid" : "Paid";

        return NextResponse.json({ message: "Status updated", resident });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
