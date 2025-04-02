import { NextResponse } from 'next/server';

// This tells Vercel to use an edge function
export const runtime = "edge";

export async function GET() {
    const currentTime = new Date();
    const hour = currentTime.getHours();
    let greetingMessage = '';
    let taskMessage = '';

    // Determine the appropriate greeting based on the time of day
    if (hour < 12) {
        greetingMessage = 'Good morning!';
        taskMessage = 'It’s a great time to check if there are any complaints logged by residents.';
    } else if (hour < 18) {
        greetingMessage = 'Good afternoon!';
        taskMessage = 'Check the levy status of residents or update the common area maintenance schedule.';
    } else {
        greetingMessage = 'Good evening!';
        taskMessage = 'Don’t forget to log any complaints you might have received today!';
    }

    // Return a response with the greeting and relevant tasks
    return NextResponse.json({
        greeting: greetingMessage,
        taskSuggestion: taskMessage,
    });
}
