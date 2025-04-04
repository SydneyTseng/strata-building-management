"use client";
import { useEffect, useState } from "react";

export default function Complaints() {
    const [complaints, setComplaints] = useState<
        { reported_by: string; category: string; details: string; status: string }[]
    >([]);
    const [mostFrequentCategory, setMostFrequentCategory] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await fetch("/api/complaints");

                if (!response.ok) {
                    throw new Error(`Ｎo complaints: ${response.statusText}`);
                }

                const data = await response.json();
                setComplaints(data.complaints);
                setMostFrequentCategory(data.mostFrequentCategory);
            } catch (error) {
                setErrorMessage("No complaints");
            }
        };

        fetchComplaints();
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
                    <li><a href="/members">Committee Members</a></li>
                </ul>
            </nav>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Logged Complaints</h1>

                {mostFrequentCategory && (
                    <p className="text-gray-800 font-semibold mb-4">
                        The most frequently logged complaint category is: <span className="text-blue-500">{mostFrequentCategory}</span>
                    </p>
                )}

                {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}

                {complaints.length === 0 ? (
                    <p className="text-gray-500">No complaints logged yet.</p>
                ) : (
                    <ul className="space-y-6">
                        {complaints.map((complaint, index) => (
                            <li key={index} className="bg-gray-50 p-6 rounded-md shadow-sm">
                                <p className="font-semibold text-lg text-gray-800">{complaint.reported_by}</p>
                                <p className="text-gray-600">Category: <span className="font-semibold">{complaint.category}</span></p>
                                <p className="text-gray-600">Details: <span className="font-semibold">{complaint.details}</span></p>
                                <p className="text-gray-600">Status: <span className="font-semibold">{complaint.status}</span></p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
