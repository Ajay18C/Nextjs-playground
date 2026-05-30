"use client";

import React from "react";

// ── helpers ──────────────────────────────────────────────────────────────────

function Code({ children }: { children: React.ReactNode }) {
    return (
        <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">
            {children}
        </code>
    );
}

function CodeBlock({ code }: { code: string }) {
    return (
        <pre className="bg-gray-950 text-gray-100 rounded-xl p-4 text-xs leading-relaxed overflow-x-auto font-mono whitespace-pre">
            {code.trim()}
        </pre>
    );
}

function DemoBox({
    ok,
    label,
    observation,
    children,
}: {
    ok: boolean;
    label: string;
    observation: string;
    children: React.ReactNode;
}) {
    return (
        <div className={`rounded-2xl border-2 overflow-hidden flex flex-col ${ok ? "border-emerald-400/60" : "border-rose-400/60"}`}>
            <div className={`px-3 py-2 flex items-center gap-2 text-xs font-bold flex-shrink-0 ${ok ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" : "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400"}`}>
                <span>{ok ? "✓" : "✗"}</span>
                <span className="font-normal text-gray-500 dark:text-gray-400">{label}</span>
            </div>
            <div className="bg-white dark:bg-gray-800/70 p-3 flex-1 flex flex-col gap-3">
                {children}
                <p className={`text-xs mt-auto pt-2 border-t ${ok ? "border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400"}`}>
                    {ok ? "✓" : "✗"} {observation}
                </p>
            </div>
        </div>
    );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
    return (
        <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-7 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {n}
                </span>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
            </div>
            <div className="space-y-5 pl-10">{children}</div>
        </section>
    );
}

// ── Section 1 demos: scroll ───────────────────────────────────────────────────

const SEED = ["Buy groceries", "Read a book", "Go for a walk", "Write some code", "Call a friend", "Do laundry", "Water plants"];

function ScrollWrong() {
    const [items, setItems] = React.useState(SEED.slice(0, 5));
    const listRef = React.useRef<HTMLDivElement>(null);
    let count = React.useRef(items.length);

    const add = () => {
        count.current += 1;
        const label = `New task ${count.current}`;
        // ❌ scroll BEFORE setItems — new row not in DOM yet
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
        setItems(prev => [...prev, label]);
    };

    return (
        <DemoBox ok={false} label="scroll inside handler" observation="New item hidden below — scroll it yourself">
            <div
                ref={listRef}
                className="rounded-lg border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700 max-h-28 overflow-y-auto"
            >
                {items.map((item, i) => (
                    <div key={i} className="px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300">{item}</div>
                ))}
            </div>
            <button
                onClick={add}
                className="w-full text-xs bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-lg font-medium transition-colors"
            >
                + Add task
            </button>
        </DemoBox>
    );
}

function ScrollRight() {
    const [items, setItems] = React.useState(SEED.slice(0, 5));
    const listRef = React.useRef<HTMLDivElement>(null);
    let count = React.useRef(items.length);

    // ✅ runs after React commits the new row to the DOM
    React.useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [items]);

    const add = () => {
        count.current += 1;
        setItems(prev => [...prev, `New task ${count.current}`]);
    };

    return (
        <DemoBox ok={true} label="scroll in useEffect" observation="List auto-scrolls to new item every time">
            <div
                ref={listRef}
                className="rounded-lg border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700 max-h-28 overflow-y-auto"
            >
                {items.map((item, i) => (
                    <div key={i} className="px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300">{item}</div>
                ))}
            </div>
            <button
                onClick={add}
                className="w-full text-xs bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-medium transition-colors"
            >
                + Add task
            </button>
        </DemoBox>
    );
}

// ── Section 2 demos: focus ────────────────────────────────────────────────────

function FocusWrong() {
    const [editing, setEditing] = React.useState(false);
    const [value, setValue] = React.useState("Click the pencil to edit");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const startEdit = () => {
        setEditing(true);
        // ❌ input not in DOM yet — ref is null, this is a no-op
        inputRef.current?.select();
    };

    return (
        <DemoBox ok={false} label="select() right after setState" observation="Input appears but isn't focused — you must click it first">
            <div className="min-h-[52px] flex items-center gap-2">
                {editing ? (
                    <input
                        ref={inputRef}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onBlur={() => setEditing(false)}
                        onKeyDown={e => { if (e.key === "Enter" || e.key === "Escape") setEditing(false); }}
                        className="flex-1 text-xs border border-rose-300 dark:border-rose-600 rounded-lg px-2 py-1.5 outline-none bg-white dark:bg-gray-700 dark:text-white"
                        placeholder="type here..."
                    />
                ) : (
                    <span className="flex-1 text-xs text-gray-600 dark:text-gray-300 px-1">{value}</span>
                )}
                {!editing && (
                    <button
                        onClick={startEdit}
                        className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-rose-100 dark:hover:bg-rose-900/30 text-gray-400 hover:text-rose-500 transition-colors"
                    >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 16 16">
                            <path d="M11.5 2.5a1.414 1.414 0 0 1 2 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                )}
            </div>
        </DemoBox>
    );
}

function FocusRight() {
    const [editing, setEditing] = React.useState(false);
    const [value, setValue] = React.useState("Click the pencil to edit");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const startEdit = () => {
        setEditing(true);
        // ✅ deferred to next event-loop task — input is in DOM by then
        setTimeout(() => inputRef.current?.select(), 0);
    };

    return (
        <DemoBox ok={true} label="select() in setTimeout(0)" observation="Input appears already focused with text selected — type immediately">
            <div className="min-h-[52px] flex items-center gap-2">
                {editing ? (
                    <input
                        ref={inputRef}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onBlur={() => setEditing(false)}
                        onKeyDown={e => { if (e.key === "Enter" || e.key === "Escape") setEditing(false); }}
                        className="flex-1 text-xs border border-emerald-300 dark:border-emerald-600 rounded-lg px-2 py-1.5 outline-none bg-white dark:bg-gray-700 dark:text-white"
                        placeholder="type here..."
                    />
                ) : (
                    <span className="flex-1 text-xs text-gray-600 dark:text-gray-300 px-1">{value}</span>
                )}
                {!editing && (
                    <button
                        onClick={startEdit}
                        className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-gray-400 hover:text-emerald-600 transition-colors"
                    >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 16 16">
                            <path d="M11.5 2.5a1.414 1.414 0 0 1 2 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                )}
            </div>
        </DemoBox>
    );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TodoTutorialPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-950 dark:to-gray-900 px-4 py-16">
            <div className="w-full max-w-2xl mx-auto">

                <div className="mb-10">
                    <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2 block">
                        React Concepts
                    </span>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
                        useEffect &amp; the Event Loop
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                        Two patterns that trip people up. Each section shows the
                        broken behaviour first so you can feel the difference, then explains why the fix works.
                    </p>
                </div>

                {/* ── Section 1 ── */}
                <Section n={1} title="useEffect — read the DOM after render">
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        Calling <Code>setItems(…)</Code> only <em>schedules</em> a re-render.
                        The new row doesn't exist in the DOM yet when your handler is still running,
                        so <Code>scrollHeight</Code> still reflects the <em>old</em> list.
                        <Code>useEffect([items])</Code> fires <strong>after React commits to the DOM</strong>,
                        so by then the new row is real and measurable.
                    </p>

                    <CodeBlock code={`// ❌ Wrong — runs during the click handler, before React renders
const add = () => {
    listRef.current.scrollTop = listRef.current.scrollHeight; // old height!
    setItems(prev => [...prev, "New task"]);
};

// ✅ Correct — runs after React commits the new row
React.useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight;
}, [items]);`} />

                    <div className="grid grid-cols-2 gap-3">
                        <ScrollWrong />
                        <ScrollRight />
                    </div>
                </Section>

                {/* ── Section 2 ── */}
                <Section n={2} title="setTimeout(fn, 0) — yield to the event loop">
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        When you call <Code>setEditing(true)</Code>, the <Code>&lt;input&gt;</Code> is
                        not mounted yet — <Code>inputRef.current</Code> is still <Code>null</Code>.
                        Calling <Code>.select()</Code> immediately is a silent no-op.{" "}
                        <Code>setTimeout(fn, 0)</Code> pushes <Code>fn</Code> to the <strong>next browser task</strong>.
                        React finishes its render and mounts the input first; then your callback runs and the ref
                        points to the real element.
                    </p>

                    <CodeBlock code={`// ❌ Wrong — ref is null right now, select() does nothing
const startEdit = () => {
    setEditing(true);
    inputRef.current?.select(); // no-op
};

// ✅ Correct — deferred past React's render, ref is populated
const startEdit = () => {
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
};`} />

                    <div className="grid grid-cols-2 gap-3">
                        <FocusWrong />
                        <FocusRight />
                    </div>
                </Section>

            </div>
        </div>
    );
}
