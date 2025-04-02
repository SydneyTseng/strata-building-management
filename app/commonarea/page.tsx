"use client";

import { useEffect, useState } from "react";

interface CommonArea {
    id: number;
    floor: string;
    name: string;
    status: "Clean" | "Almost" | "Dirty";
}

export default function CommonAreaStatus() {
    const [areas, setAreas] = useState<CommonArea[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchCommonAreas();
    }, []);

    const fetchCommonAreas = async () => {
        try {
            const response = await fetch("/api/commonareas");
            if (!response.ok) {
                throw new Error("Failed to fetch common areas status");
            }
            const data = await response.json();
            setAreas(data);
        } catch (error) {
            setErrorMessage("Error fetching common area status.");
        }
    };

    const toggleStatus = async (id: number) => {
        try {
            const response = await fetch("/api/commonareas", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error("Failed to update status");
            }

            const updatedArea = await response.json();

            // Update the local state with the updated status
            setAreas((prevAreas) =>
                prevAreas.map((area) =>
                    area.id === id ? { ...area, status: updatedArea.area.status } : area
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
                    <li><a href="/members">Committee Members</a></li>
                </ul>
            </nav>

            <h1 className="text-3xl font-semibold text-gray-800">Common Area Status</h1>

            {errorMessage && <p className="text-red-600">{errorMessage}</p>}

            {areas.length === 0 ? (
                <p>No common area data available.</p>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                    <ul className="divide-y divide-gray-300">
                        {areas.map((area) => (
                            <li key={area.id} className="flex justify-between py-4 px-4 items-center">
                                <span className="text-lg font-medium text-gray-800">
                                    {area.floor} - {area.name}
                                </span>

                                {/* Status and Toggle Button in the Same Line */}
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${area.status === "Clean"
                                            ? "bg-green-100 text-green-700"
                                            : area.status === "Almost"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {area.status}
                                    </span>
                                    <button
                                        onClick={() => toggleStatus(area.id)}
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
