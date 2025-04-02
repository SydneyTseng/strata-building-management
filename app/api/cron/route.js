export async function GET() {
    console.log("Cron job ran at:", new Date().toISOString());
    return new Response(JSON.stringify({ message: "Cron job executed successfully!!!!!!!!!!!!!!!!!!!!!!!" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
