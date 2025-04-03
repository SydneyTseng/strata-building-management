import { NextResponse } from "next/server";

// Make this an edge function
export const runtime = "edge";

// Sample in-memory database (replace this with a real database)
let residents = [
    { id: 1, name: "Resident1 hi", status: "Paid" },
    { id: 2, name: "Resident2 here", status: "Unpaid" },
    { id: 3, name: "one more", status: "Unpaid" },
    { id: 4, name: "last", status: "Unpaid" }
];

// Edge function to get the total unpaid residents
export async function GET() {
    return NextResponse.json({
        residents, // Send the full list
        total_unpaid: residents.filter(res => res.status === "Unpaid").length,
    });
}


// Edge function to update the status of a resident (toggle between Paid and Unpaid)
export async function PATCH(req: Request) {
    try {
        const { id } = await req.json();

        // Find the resident by id
        const resident = residents.find((r) => r.id === id);
        if (!resident) {
            return NextResponse.json({ error: "Resident not found" }, { status: 404 });
        }

        // Toggle the status between "Paid" and "Unpaid"
        resident.status = resident.status === "Paid" ? "Unpaid" : "Paid";

        // Return a success response
        return NextResponse.json({ message: "Status updated", resident });
    } catch (error) {
        // Return an error response if there is an issue
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
