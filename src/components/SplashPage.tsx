// import getTimeDiff from "../utils/getTimeDiff";
import { useTypewriter } from "../utils/setTypeWriter";
import { useState, useEffect, useRef } from "react";

export interface ProgramRow {
    date: string,
    time: string,
    title: string,
    link: string
}

export default function SplashPage() {
    const terminalRef = useRef<HTMLDivElement>(null);
    const [showProgram, setShowProgram] = useState(false);


    const systemSpam = `
[BOOT] Initializing runtime environment
[BOOT] Loading kernel modules
[BOOT] Registering system services
[BOOT] Applying environment variables
[BOOT] Switching to protected mode
[MEM ] Probing available memory
[MEM ] Reserving heap segments
[MEM ] Mapping virtual addresses
[MEM ] Garbage collector initialized
[FS  ] Mounting virtual filesystem
[FS  ] Indexing directory tree
[FS  ] Resolving symbolic links
[FS  ] Verifying file integrity
[NET ] Bringing network interface online
[NET ] Resolving DNS entries
[NET ] Negotiating secure handshake
[NET ] Synchronizing clock with server
[AUTH] Loading authentication providers
[AUTH] Validating session context
[AUTH] Applying access rules
[CFG ] Reading configuration files
[CFG ] Overriding defaults
[CFG ] Finalizing runtime parameters
[PROC] Starting background workers
[PROC] Spawning scheduler thread
[PROC] Registering async tasks
[PROC] Balancing execution queues
[IO  ] Initializing input handlers
[IO  ] Binding keyboard events
[IO  ] Registering display output
[IO  ] Enabling buffered rendering
[UI  ] Loading terminal renderer
[UI  ] Applying CRT profile
[UI  ] Calibrating phosphor glow
[UI  ] Enabling scanline overlay
[DATA] Fetching program metadata
[DATA] Parsing schedule entries
[DATA] Normalizing timestamps
[DATA] Resolving timezone offsets
[DATA] Caching event descriptors
[SYNC] Synchronizing event timeline
[SYNC] Reconciling local state
[SYNC] Verifying consistency
[LOG ] Initializing logging pipeline
[LOG ] Attaching stdout
[LOG ] Attaching stderr
[LOG ] Rotating log buffers
[SYS ] Performing integrity check
[SYS ] Scanning for anomalies
[SYS ] No critical issues detected
[SYS ] Finalizing startup sequence
`;

const programRows = [
  {
    date: "16.FEB",
    time: "12:00-13:00",
    title: "KICKOFF",
    link: "https://online.ntnu.no/arrangementer/Online-40-ar:-Jubileumsuke-Kickoff/7d1c466c-fec5-4e53-b58e-24d67a340d22"
  },
  {
    date: "16.FEB",
    time: "18:00-22:00",
    title: "KOS PÅ LAGER11",
    link: "https://online.ntnu.no/arrangementer/Online-40-ar:-Kos-pa-Lager11/066ebd31-fe29-458a-9cae-4ca70ebb8c56"
  },
  {
    date: "17.FEB",
    time: "17:00-23:59",
    title: "ØLYMPICS",
    link: "https://online.ntnu.no/arrangementer/Online-40-ar:-Olympics/14b35ea9-711b-4d2e-923b-902378d05d62"
  },
  {
    date: "20.FEB",
    time: "16:00-20:00",
    title: "ØLSMAKING PÅ SAMFUNDET",
    link: "https://online.ntnu.no/arrangementer/Online-40-ar:-Olsmaking-pa-Samfundet/6e39b0fb-3c74-4a7d-9764-87fb938e58fa"
  },
  {
    date: "21.FEB",
    time: "18:00-23:59",
    title: "BANKETT",
    link: "https://online.ntnu.no/arrangementer/Online-40-ar:-Bankett/308e2aa3-cc7b-40c5-acdc-1de7e570cebb"
  },
  {
    date: "22.FEB",
    time: "12:00-14:00",
    title: "RIDDER-MINGEL",
    link: "https://online.ntnu.no/arrangementer/Online-40-ar:-Ridder-MINGEL/19d50af3-9b19-4b59-a52f-c87c33953afc"
  }
];

function renderRow(row: ProgramRow): string {
    return `${row.date} | ${row.time} | ${row.title}`;
}

const loading = `  |=================================|`

const finalMessage = `  ONLINE_JUBILUEM READY TO LAUNCH!`

const programBorder = `--------------------------------------------------`;

const bootCommand = useTypewriter("  > SYSTEM BOOT", 30, true, true);
const bootOK = useTypewriter("  OK", 30, bootCommand.isDone);
const programCommand = useTypewriter("  > STARTING PROGRAM ONLINE_JUBILEUM", 30, bootOK.isDone, true);
const programOK = useTypewriter("  OK", 30, programCommand.isDone);
const systemLog = useTypewriter(systemSpam, 1, programOK.isDone, false, 5);
const loadingTyped = useTypewriter(loading, 60, systemLog.isDone)
const finalMessageTyped = useTypewriter(finalMessage, 40, loadingTyped.isDone)
const topBorder = useTypewriter(programBorder, 10, showProgram)
const firstRow = useTypewriter(renderRow(programRows[0]), 10, topBorder.isDone);
const secondRow = useTypewriter(renderRow(programRows[1]), 10, firstRow.isDone);
const thirdRow = useTypewriter(renderRow(programRows[2]), 10, secondRow.isDone);
const fourthRow = useTypewriter(renderRow(programRows[3]), 10, thirdRow.isDone);
const finalRow = useTypewriter(renderRow(programRows[4]), 10, fourthRow.isDone);
const bottomBorder = useTypewriter(programBorder, 10, finalRow.isDone);

useEffect(() => {
    if (!finalMessageTyped.isDone) return;

    const timeout = setTimeout(() => {
        setShowProgram(true);
    }, 2000);

    return () => clearTimeout(timeout);
}, [finalMessageTyped.isDone]);


useEffect(() => {
    const el = terminalRef.current;
    if (!el) return;

    el.scrollTop = el.scrollHeight;
    }, [
    bootCommand.displayedText,
    bootOK.displayedText,
    programCommand.displayedText,
    programOK.displayedText,
    systemLog.displayedText,
]);


return (
    <div className="bg-black w-full h-full pt-6 pl-6 font-glass text-white text-xl lg:text-5xl flex flex-col overflow-y-auto" ref={terminalRef}>
        {!showProgram &&
        <>
            <div className="flex">
                {bootCommand.displayedText} 
                <div className="text-green-500">
                    {bootOK.displayedText}
                </div>
            </div>
            <div className="flex">
                {programCommand.displayedText}
                <div className="text-green-500">
                    {programOK.displayedText}
                </div>
            </div>
            <div>
                <pre className="font-glass">
                    {systemLog.displayedText}
                </pre>
            </div>
            <div className="text-green-500">
                {loadingTyped.displayedText}
            </div>
            <pre className="mb-50 text-green-500 font-glass">
                {finalMessageTyped.displayedText}
            </pre>
        </>
        }
        {showProgram &&
        <>
            {topBorder.displayedText}
            <div className="flex">
                <div className="flex-[2]">
                    {firstRow.displayedText} 
                </div>
                {firstRow.isDone && <a href={programRows[0].link} className="flex-[1] font-glass">| ↗</a>}
            </div>
            <div className="flex">
                <div className="flex-[2]">
                    {secondRow.displayedText} 
                </div>
                {secondRow.isDone && <a href={programRows[1].link} className="flex-[1] font-glass">| ↗</a>}
            </div>
            <div className="flex">
                <div className="flex-[2]">
                    {thirdRow.displayedText} 
                </div>
                {thirdRow.isDone && <a href={programRows[2].link} className="flex-[1] font-glass">| ↗</a>}
                </div>
            <div className="flex">
                <div className="flex-[2]">
                    {fourthRow.displayedText}
                </div>
                {fourthRow.isDone && <a href={programRows[3].link} className="flex-[1] font-glass">| ↗</a>}
            </div>
            <div className="flex">
                <div className="flex-[2]">
                    {finalRow.displayedText} 
                </div>
                {finalRow.isDone && <a href={programRows[4].link} className="flex-[1] font-glass">| ↗</a>}
            </div>
            {bottomBorder.displayedText}
        </>
        }
    </div>
    );
}