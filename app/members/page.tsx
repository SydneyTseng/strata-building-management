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
                    <li><a href="logout.html">Common Areas</a></li>
                    <li><a href="index.html">Levies</a></li>
                    <li><a href="recipe.html">Recipe</a></li>
                    <li><a href="/members">Committe Members</a></li>
                </ul>
            </nav>
            <div className="flex flex-col items-center p-6 min-h-screen">
                <h1 className="text-3xl mb-6 font-mono">Members</h1>

                <div className="flex flex-col items-start gap-6 font-mono">
                    {members.map((member, index) => (
                        <div key={index} className="flex flex-row items-center gap-4">
                            <Image
                                src={member.image}
                                alt={member.name}
                                width={300}
                                height={500}
                                className="object-cover w-[300px] h-[500px] transition-shadow duration-300 hover:shadow-2xl"
                            />
                            <p className="text-lg font-medium">
                                {member.name} <br />
                                {member.Phone} <br />
                                {member.Email}
                            </p>

                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

