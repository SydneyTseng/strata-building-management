import { NextResponse } from "next/server";

let complaints: { reported_by: string; category: string; details: string; status: string }[] = [];

export async function GET() {
    const categoryCount = complaints.reduce((acc: { [key: string]: number }, complaint) => {
        acc[complaint.category] = (acc[complaint.category] || 0) + 1;
        return acc;
    }, {});

    const mostFrequentCategory = Object.keys(categoryCount).reduce((a, b) =>
        categoryCount[a] > categoryCount[b] ? a : b
    );

    return NextResponse.json({
        complaints,
        mostFrequentCategory,
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const { reported_by, category, details, status } = body;

    complaints.push({ reported_by, category, details, status });

    return NextResponse.json({ message: "Complaint logged successfully" });
}
