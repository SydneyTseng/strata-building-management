import Image from "next/image";
import { Pool } from "pg"; // ✅ Correct: import Pool directly from 'pg'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // ✅ Make sure your Neon DB URL is set in .env
    ssl: {
        rejectUnauthorized: false, // ✅ Neon requires SSL but allows self-signed certs
    },
});

const getImageForMember = (name: string) => {
    switch (name) {
        case "Sheldon Cooper":
            return "/images/sheldon.jpeg";
        case "Amy Farrah Fowler":
            return "/images/amy.avif";
        case "Leonard Hofstadter":
            return "/images/leonard.jpg";
        case "Bernadette Rostenkowski-Wolowitz":
            return "/images/bernadette.webp";
        default:
            return "/images/default.jpg";
    }
};

export default async function Members() {
    const client = await pool.connect();
    const { rows: members } = await client.query(`
        SELECT name, phone, email FROM residents WHERE is_committee = true
    `);
    client.release();

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <nav>
                <ul className="navbar">
                    <li><a href="/">Home</a></li>
                    <li><a href="https://classic.austlii.edu.au/au/legis/nsw/consol_act/ssma2015242/">Act</a></li>
                    <li><a href="/commonarea">Common Areas</a></li>
                    <li><a href="/levy">Levy</a></li>
                    <li><a href="/complaints">Complaints</a></li>
                    <li><a href="/logcomplaints">Log Complaints</a></li>
                    <li><a href="/residents">Residents Information</a></li>
                    <li><a href="/members">Committee Members</a></li>
                </ul>
            </nav>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Committee Members</h1>
                <div className="flex flex-col items-center gap-6">
                    {members.map((member: any, index: number) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row items-center gap-6 bg-gray-50 p-6 rounded-md shadow-sm w-full"
                        >
                            <Image
                                src={getImageForMember(member.name)}
                                alt={member.name}
                                width={300}
                                height={500}
                                className="object-cover w-[300px] h-[500px] transition-shadow duration-300 hover:shadow-2xl rounded-md"
                            />
                            <div className="flex flex-col items-start">
                                <p className="text-lg font-medium text-gray-800">{member.name}</p>
                                <p className="text-gray-600">Phone: {member.phone}</p>
                                <p className="text-gray-600">Email: {member.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
