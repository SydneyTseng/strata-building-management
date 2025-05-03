import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});
client.connect();

export async function POST(req: NextRequest) {
    const { id } = await req.json(); // Make sure this matches the frontend

    if (!id) {
        return NextResponse.json({ error: 'Complaint ID is required.' }, { status: 400 });
    }

    try {
        const result = await client.query(
            'UPDATE complaints SET status = $1 WHERE id = $2 RETURNING *',
            ['resolved', id]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Complaint not found.' }, { status: 404 });
        }

        return NextResponse.json({ complaint: result.rows[0] }, { status: 200 });
    } catch (error) {
        console.error('Error updating complaint:', error);
        return NextResponse.json({ error: 'Failed to update complaint status.' }, { status: 500 });
    }
}
