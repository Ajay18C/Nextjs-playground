import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-start justify-center pt-20 px-4">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                    Next.js Playground
                </h1>
                <p className="text-gray-400 dark:text-gray-500 text-sm mb-8">
                    Interactive demos and concept tutorials.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/todo"
                        className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-700 transition-all group"
                    >
                        <span className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-lg flex-shrink-0">
                            📋
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                useEffect &amp; the Event Loop
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                Auto-scroll with useEffect · focus deferral with setTimeout(0)
                            </p>
                        </div>
                        <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-indigo-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 16 16">
                            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
