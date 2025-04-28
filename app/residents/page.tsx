"use client";

import { useEffect, useState } from "react";

interface Resident {
    id: number;
    name: string;
    unit_number: string;
    email: string;
    phone: string;
    is_committee: boolean;
}

export default function ResidentsPage() {
    const [residents, setResidents] = useState<Resident[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResidents = async () => {
            try {
                const res = await fetch("/api/residents");
                if (!res.ok) throw new Error("Failed to load residents");
                const data = await res.json();
                setResidents(data.residents);
            } catch (err) {
                setError("Could not fetch resident info.");
            }
        };

        fetchResidents();
    }, []);

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

            <main className="w-full max-w-4xl flex flex-col gap-6 row-start-2 items-center sm:items-start">
                <h1 className="text-2xl font-semibold mb-2">Resident Directory</h1>
                {error && <p className="text-red-600">{error}</p>}

                <table className="w-full border-collapse bg-white rounded shadow">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Unit</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Phone</th>
                            <th className="p-2 border">Committee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residents.map((r) => (
                            <tr key={r.id} className="hover:bg-gray-50">
                                <td className="p-2 border">{r.name}</td>
                                <td className="p-2 border">{r.unit_number}</td>
                                <td className="p-2 border">{r.email}</td>
                                <td className="p-2 border">{r.phone}</td>
                                <td className="p-2 border">{r.is_committee ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>

        </div>
    );
}
