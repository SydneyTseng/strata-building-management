import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET() {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM residents");
        client.release();

        return NextResponse.json({ residents: result.rows });
    } catch (err) {
        console.error("Failed to fetch residents", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
