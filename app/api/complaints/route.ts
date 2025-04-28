// /app/api/complaints/route.ts (or api/complaints.ts based on your Next.js version)

import { NextResponse } from "next/server";
import { Pool } from "pg";

// Initialize the Pool to connect to the database
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Ensure DATABASE_URL is set in your .env
});

export async function GET() {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM complaints");
        client.release(); // Always release the client after use

        return NextResponse.json({ complaints: result.rows });
    } catch (err) {
        console.error("Failed to fetch complaints", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
// /app/api/complaints/route.ts (same as above)

export async function POST(request: Request) {
    const { reported_by, category, details, status } = await request.json();

    // Insert complaint into database
    try {
        const client = await pool.connect();
        const result = await client.query(
            "INSERT INTO complaints (reported_by, category, details, status) VALUES ($1, $2, $3, $4) RETURNING *",
            [reported_by, category, details, status]
        );
        client.release();

        return NextResponse.json({
            message: "Complaint logged successfully",
            complaint: result.rows[0], // Returning the inserted complaint
        });
    } catch (err) {
        console.error("Failed to log complaint", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

