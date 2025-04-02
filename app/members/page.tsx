import Image from "next/image";

const members = [
    { name: "Sheldon Cooper", Phone: "409-356-6049", Email: "sheldon@gmail.com", image: "/images/sheldon.avif" },
    { name: "Penny Nolastname", Phone: "012-345-6789", Email: "penny@gmail.com", image: "/images/penny.webp" },
    { name: "Leonard Hofstadter", Phone: "012-345-6789", Email: "eonard@gmail.com", image: "/images/leonard.jpeg" },
];

export default function Members() {
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
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Committee Members</h1>
                <div className="flex flex-col items-center gap-6">
                    {members.map((member, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row items-center gap-6 bg-gray-50 p-6 rounded-md shadow-sm w-full"
                        >
                            <Image
                                src={member.image}
                                alt={member.name}
                                width={300}
                                height={500}
                                className="object-cover w-[300px] h-[500px] transition-shadow duration-300 hover:shadow-2xl rounded-md"
                            />
                            <div className="flex flex-col items-start">
                                <p className="text-lg font-medium text-gray-800">{member.name}</p>
                                <p className="text-gray-600">Phone: {member.Phone}</p>
                                <p className="text-gray-600">Email: {member.Email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

