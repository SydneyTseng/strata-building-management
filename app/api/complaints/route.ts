import { NextResponse } from "next/server";

// Assuming you store complaints in memory (this should be replaced with actual data storage)
let complaints: { reported_by: string; category: string; details: string; status: string }[] = [];

// API handler to receive and fetch complaints
export async function GET() {
    // Count frequency of each category from stored complaints
    const categoryCount = complaints.reduce((acc: { [key: string]: number }, complaint) => {
        acc[complaint.category] = (acc[complaint.category] || 0) + 1;
        return acc;
    }, {});

    // Find the category with the highest count
    const mostFrequentCategory = Object.keys(categoryCount).reduce((a, b) =>
        categoryCount[a] > categoryCount[b] ? a : b
    );

    return NextResponse.json({
        complaints,
        mostFrequentCategory,
    });
}

// API handler to add a new complaint (called when user logs a complaint)
export async function POST(request: Request) {
    const body = await request.json();
    const { reported_by, category, details, status } = body;

    // Add the new complaint to the in-memory storage (or database)
    complaints.push({ reported_by, category, details, status });

    return NextResponse.json({ message: "Complaint logged successfully" });
}
