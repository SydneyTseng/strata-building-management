import { NextResponse } from "next/server";

let complaints: { reported_by: string; category: string; details: string; status: string }[] = [];

// Handle GET requests
export async function GET() {
    // Return the complaints stored in memory
    return NextResponse.json(complaints);
}

// Handle POST requests
export async function POST(req: Request) {
    try {
        // Parse the incoming request body as JSON
        const newComplaint = await req.json();

        // Add the new complaint to the in-memory list
        complaints.push(newComplaint);

        // Respond with a success message
        return NextResponse.json({ message: "Complaint added successfully!" });
    } catch (error) {
        console.error("Error processing complaint:", error);

        // If an error occurs, respond with an error message
        return NextResponse.json({ error: "Failed to process complaint." }, { status: 500 });
    }
}
