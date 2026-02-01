import getTimeDiff from "../utils/getTimeDiff";
import { systemSpam, loading, finalMessage, asciiArt, welcome, programBorder, programRows } from "../utils/terminalText";
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
    const [now, setNow] = useState(new Date());
    const targetDate = new Date(2026, 1, 16, 12);

    // Update countdown
    useEffect(() => {
        const interval = setInterval(() => {
        setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const timeLeft = getTimeDiff(now, targetDate);


    function renderRow(row: ProgramRow): string {
        return `  ${row.date} | ${row.time} | ${row.title}`;
    }

    // Type each message
    const bootCommand = useTypewriter("  > SYSTEM BOOT", 30, true, true);
    const bootOK = useTypewriter("  OK", 30, bootCommand.isDone);
    const programCommand = useTypewriter("  > STARTING PROGRAM ONLINE_JUBILEUM", 30, bootOK.isDone, true);
    const programOK = useTypewriter("  OK", 30, programCommand.isDone);
    const systemLog = useTypewriter(systemSpam, 1, programOK.isDone, false, 5);
    const loadingTyped = useTypewriter(loading, 60, systemLog.isDone)
    const finalMessageTyped = useTypewriter(finalMessage, 40, loadingTyped.isDone)
    const welcomeTyped = useTypewriter(welcome, 10, showProgram);
    const asciiTyped = useTypewriter(asciiArt, 10, welcomeTyped.isDone, false, 10);
    const topBorder = useTypewriter(programBorder, 10, asciiTyped.isDone)
    const firstRow = useTypewriter(renderRow(programRows[0]), 10, topBorder.isDone);
    const secondRow = useTypewriter(renderRow(programRows[1]), 10, firstRow.isDone);
    const thirdRow = useTypewriter(renderRow(programRows[2]), 10, secondRow.isDone);
    const fourthRow = useTypewriter(renderRow(programRows[3]), 10, thirdRow.isDone);
    const fifthRow = useTypewriter(renderRow(programRows[4]), 10, fourthRow.isDone);
    const finalRow = useTypewriter(renderRow(programRows[5]), 10, fifthRow.isDone);
    const bottomBorder = useTypewriter(programBorder, 10, finalRow.isDone);

    // Short wait before showing program
    useEffect(() => {
        if (!finalMessageTyped.isDone) return;

        const timeout = setTimeout(() => {
            setShowProgram(true);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [finalMessageTyped.isDone]);


    // Keep viewport at the bottom when system spam is typed
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
                <div className="flex animate-flicker">
                    {bootCommand.displayedText} 
                    <div className="text-green-500">
                        {bootOK.displayedText}
                    </div>
                </div>
                <div className="flex animate-flicker">
                    {programCommand.displayedText}
                    <div className="text-green-500">
                        {programOK.displayedText}
                    </div>
                </div>
                <div className="animate-flicker">
                    <pre className="font-glass">
                        {systemLog.displayedText}
                    </pre>
                </div>
                <div className="text-green-500 animate-flicker">
                    {loadingTyped.displayedText}
                </div>
                <pre className="mb-50 text-green-500 font-glass animate-flicker">
                    {finalMessageTyped.displayedText}
                </pre>
            </>
            }
            {showProgram &&
            <div className="h-screen flex flex-col justify-around">
                <div className="flex justify-evenly">
                    <div className="flex flex-col justify-center items-center text-6xl text-onlineblue animate-flicker">
                        <div>
                            {welcomeTyped.displayedText}
                        </div>
                        {welcomeTyped.isDone && (
                            <div>
                                {timeLeft.days}d {timeLeft.hours}t {timeLeft.minutes}m {timeLeft.seconds}s
                            </div>
                        )
                        }
                    </div>
                    <pre className="font-glass text-sm text-onlineyellow animate-flicker">{asciiTyped.displayedText}</pre>
                </div>
                <div>
                    
                </div>
                <div className="w-full max-w-fit flex flex-col text-start mx-auto animate-flicker">
                    {topBorder.displayedText}
                    <div className="flex">
                        <div className="flex-[8]">
                            {firstRow.displayedText} 
                        </div>
                        {bottomBorder.isDone && <a href={programRows[0].link} className="flex-[1] font-glass">| ↗</a>}
                    </div>
                    <div className="flex">
                        <div className="flex-[8]">
                            {secondRow.displayedText} 
                        </div>
                        {bottomBorder.isDone && <a href={programRows[1].link} className="flex-[1] font-glass">| ↗</a>}
                    </div>
                    <div className="flex">
                        <div className="flex-[8]">
                            {thirdRow.displayedText} 
                        </div>
                        {bottomBorder.isDone && <a href={programRows[2].link} className="flex-[1] font-glass">| ↗</a>}
                        </div>
                    <div className="flex">
                        <div className="flex-[8]">
                            {fourthRow.displayedText}
                        </div>
                        {bottomBorder.isDone && <a href={programRows[3].link} className="flex-[1] font-glass">| ↗</a>}
                    </div>
                    <div className="flex">
                        <div className="flex-[8]">
                            {fifthRow.displayedText}
                        </div>
                        {bottomBorder.isDone && <a href={programRows[4].link} className="flex-[1] font-glass">| ↗</a>}
                    </div>
                    <div className="flex">
                        <div className="flex-[8]">
                            {finalRow.displayedText} 
                        </div>
                        {bottomBorder.isDone && <a href={programRows[5].link} className="flex-[1] font-glass">| ↗</a>}
                    </div>
                    {bottomBorder.displayedText}
                </div>
            </div>
            }
        </div>
        );
    }