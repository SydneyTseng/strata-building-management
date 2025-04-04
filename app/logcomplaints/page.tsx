"use client";
import { useState } from "react";

export default function Log() {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/api/complaints", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                setSuccessMessage(result.message);
            } else {
                setErrorMessage(result.error);
            }
        } catch (error) {
            setErrorMessage("Failed to log complaint.");
        }
    };

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
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Log a Complaint</h1>
                {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
                {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Reported By (Resident Name):</span>
                        <input type="text" name="reported_by" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Complaint Category:</span>
                        <select name="category" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="noise">Noise</option>
                            <option value="common_area">Common Area</option>
                            <option value="general">General</option>
                            <option value="committee_member">Committee Member Issue</option>
                        </select>
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Complaint Details:</span>
                        <textarea name="details" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-40 resize-none"></textarea>
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Status:</span>
                        <select name="status" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </label>
                    <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Log Complaint</button>
                </form>
            </div>
        </div>
    );
}
