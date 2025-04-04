import { format } from 'date-fns-tz';
import { NextResponse } from 'next/server';

export const runtime = "edge";

export async function GET() {
    const timeZone = 'Asia/Sydney';
    const currentTime = format(new Date(), 'HH', { timeZone });

    const hour = parseInt(currentTime, 10) + 11;
    let greetingMessage = '';
    let taskMessage = '';
    console.log('Current time in Sydney:', currentTime);
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

    return NextResponse.json({
        greeting: greetingMessage,
        taskSuggestion: taskMessage,
    });
}
