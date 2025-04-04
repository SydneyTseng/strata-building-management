import { NextRequest, NextResponse } from "next/server";

let commonAreas = [
    { id: 1, floor: "First Floor", name: "Living Room", status: "Clean" },
    { id: 2, floor: "First Floor", name: "Kitchen", status: "Dirty" },
    { id: 3, floor: "Second Floor", name: "Bedroom", status: "Almost" },
    { id: 4, floor: "Second Floor", name: "Bathroom", status: "Clean" }
];

export async function GET(req: NextRequest) {
    return NextResponse.json(commonAreas, { status: 200 });
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Received PATCH request:", body);

        const { id } = body;

        if (typeof id !== "number") {
            return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }

        const area = commonAreas.find(area => area.id === id);
        if (!area) {
            return NextResponse.json({ error: "Common area not found" }, { status: 404 });
        }

        const statusCycle = ["Clean", "Almost", "Dirty"];
        const nextStatus = statusCycle[(statusCycle.indexOf(area.status) + 1) % statusCycle.length];

        area.status = nextStatus;
        console.log("Updated status:", area);

        return NextResponse.json({ message: "Status updated", area }, { status: 200 });
    } catch (error) {
        console.error("Error processing PATCH request:", error);
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
