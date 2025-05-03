"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function LogComplaint() {
    const [formData, setFormData] = useState({
        reported_by: "",
        category: "noise",
        details: "",
        status: "pending",
    });

    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const saved = Cookies.get("complaintDraft");
        if (saved) {
            try {
                setFormData(JSON.parse(saved));
            } catch (e) {
                console.error("Invalid complaintDraft cookie:", e);
                Cookies.remove("complaintDraft");
            }
        }
    }, []);

    useEffect(() => {
        Cookies.set("complaintDraft", JSON.stringify(formData), { expires: 1 });
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/complaints", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setSuccessMessage(result.message);
                setErrorMessage(null);
                Cookies.remove("complaintDraft"); // Clear cookie on success
                setFormData({
                    reported_by: "",
                    category: "noise",
                    details: "",
                    status: "pending",
                });
            } else {
                setErrorMessage(result.error);
            }
        } catch (error) {
            setErrorMessage("Failed to log complaint.");
        }
    };

    const clearDraft = () => {
        Cookies.remove("complaintDraft");
        setFormData({
            reported_by: "",
            category: "noise",
            details: "",
            status: "pending",
        });
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
                    <li><a href="/residents">Residents Information</a></li>
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
                        <input
                            type="text"
                            name="reported_by"
                            value={formData.reported_by}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Complaint Category:</span>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="noise">Noise</option>
                            <option value="common_area">Common Area</option>
                            <option value="general">General</option>
                            <option value="committee_member">Committee Member Issue</option>
                        </select>
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Complaint Details:</span>
                        <textarea
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-40 resize-none"
                        ></textarea>
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Status:</span>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </label>
                    <div className="flex gap-4">
                        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
                        <button type="button" onClick={clearDraft} className="w-full bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400">Clear Draft</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
