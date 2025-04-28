"use client";

import { useEffect, useState } from "react";

interface Resident {
    id: number;
    name: string;
    status: "Paid" | "Unpaid";
}

export default function LevyStatus() {
    const [residents, setResidents] = useState<Resident[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchLevyStatus();
    }, []);

    const [unpaidCount, setUnpaidCount] = useState<number>(0);

    const fetchLevyStatus = async () => {
        try {
            const response = await fetch("/api/levies");
            if (!response.ok) {
                throw new Error("Failed to fetch levy status");
            }
            const data = await response.json();

            if (data.residents) {
                setResidents(data.residents);
            }
            setUnpaidCount(data.total_unpaid || 0);
        } catch (error) {
            setErrorMessage("Error fetching levy status.");
        }
    };



    const toggleStatus = async (id: number) => {
        try {
            const response = await fetch("/api/levies", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error("Failed to update status");
            }

            const updatedResident = await response.json();

            // Update the local state
            setResidents((prevResidents) =>
                prevResidents.map((resident) =>
                    resident.id === id ? { ...resident, status: updatedResident.resident.status } : resident
                )
            );
        } catch (error) {
            setErrorMessage("Error updating status.");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-8 sm:p-20">
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
            <h1 className="text-3xl font-semibold text-gray-800">Levy Status</h1>
            <h2 className="text-lg font-semibold text-red-600">
                {unpaidCount} residents haven't paid their levies.
            </h2>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            {residents.length === 0 ? (
                <p>No levy data available.</p>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                    <ul className="divide-y divide-gray-300">
                        {residents.map((resident) => (
                            <li key={resident.id} className="flex justify-between py-4 px-4 items-center">
                                <span className="text-lg font-medium text-gray-800">{resident.name}</span>

                                <div className="flex items-center gap-2">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${resident.status === "Paid"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {resident.status}
                                    </span>
                                    <button
                                        onClick={() => toggleStatus(resident.id)}
                                        className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Toggle
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
