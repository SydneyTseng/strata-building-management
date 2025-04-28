'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [greeting, setGreeting] = useState<string | null>(null);
  const [taskSuggestion, setTaskSuggestion] = useState<string | null>(null);

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await fetch("/api/greeting");

        if (!response.ok) {
          throw new Error(`Failed to fetch greeting: ${response.statusText}`);
        }

        const data = await response.json();
        setGreeting(data.greeting);
        setTaskSuggestion(data.taskSuggestion);
      } catch (error) {
        console.error('Error fetching greeting:', error);
      }
    };

    fetchGreeting();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <nav>
        <ul className="navbar">
          <li><a href="/api/php/rules">Building Rules</a></li>
          <li><a href="/api/redirect">Act</a></li>
          <li><a href="/commonarea">Common Areas</a></li>
          <li><a href="/levy">Levy</a></li>
          <li><a href="/complaints">Complaints</a></li>
          <li><a href="/logcomplaints">Log Complaints</a></li>
          <li><a href="/residents">Residents Information</a></li>
          <li><a href="/members">Committee Members</a></li>
        </ul>
      </nav>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/images/blueberry.png"
          alt="logo"
          width={150}
          height={38}
          priority
        />
        <div className="text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <p className="mb-2 tracking-[-.01em]">
            Hi, this is a website designed to help you manage buildings more easily.
          </p>
          <ol className="list-inside list-decimal">
            <li className="tracking-[-.01em]">
              Go to the{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                Committee Members
              </code>
              {" "} webpage to view the contact information of staff.
            </li>
            <li className="tracking-[-.01em]">
              Get contact details of residents in {" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                Residents Information
              </code>
              {" "} page.
            </li>
            <li className="tracking-[-.01em]">
              Click{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                Log Complaints
              </code>
              {" "}to record complaints you receive from residents.
            </li>
            <li className="tracking-[-.01em]">
              You can view recorded complaints on the{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                Complaints
              </code>
              {" "}page.
            </li>
            <li className="tracking-[-.01em]">
              The{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                Levy
              </code>
              {" "}page helps you keep track of residents' levy statuses.
            </li>
            <li className="tracking-[-.01em]">
              Click{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                Act
              </code>
              {" "}if you want to read the NSW Strata Scheme Management Act.
            </li>
            <li className="tracking-[-.01em]">
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                Common Areas
              </code>
              {" "}page shows the current status of public areas.
            </li>
          </ol>
          {greeting && <p className="mt-6 text-lg font-semibold">{greeting}</p>}
          {taskSuggestion && <p className="text-md text-gray-700">{taskSuggestion}</p>}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href={`mailto:${process.env.SUPPORT_EMAIL}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Email me →
        </a>
      </footer>
    </div>
  );
}
