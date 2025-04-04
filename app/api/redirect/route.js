export async function GET() {
    return new Response(null, {
        status: 302,
        headers: {
            Location: 'https://classic.austlii.edu.au/au/legis/nsw/consol_act/ssma2015242/',
        },
    });
}