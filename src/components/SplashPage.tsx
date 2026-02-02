import getTimeDiff from "../utils/getTimeDiff";
import { systemSpam, loading, finalMessage, asciiArt, welcome, programBorderDesktop, programBorderMobile, programRows } from "../utils/terminalText";
import { useTypewriter } from "../utils/setTypeWriter";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

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

    const isMobile = useMediaQuery({ maxWidth: 1024 });

    // Update countdown
    useEffect(() => {
        const interval = setInterval(() => {
        setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const timeLeft = getTimeDiff(now, targetDate);


    function renderRowDesktop(row: ProgramRow): string {
        return `  ${row.date} | ${row.time} | ${row.title}`;
    }

    function renderRowMobile(row: ProgramRow): string {
        return `  ${row.title}
 ${row.date} ${row.time}`;
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
    const topBorderDesktop = useTypewriter(programBorderDesktop, 10, asciiTyped.isDone)
    const topBorderMobile = useTypewriter(programBorderMobile, 10, asciiTyped.isDone)
    const firstRowDesktop = useTypewriter(renderRowDesktop(programRows[0]), 10, topBorderDesktop.isDone && !isMobile);
    const secondRowDesktop = useTypewriter(renderRowDesktop(programRows[1]), 10, firstRowDesktop.isDone && !isMobile);
    const thirdRowDesktop = useTypewriter(renderRowDesktop(programRows[2]), 10, secondRowDesktop.isDone && !isMobile);
    const fourthRowDesktop= useTypewriter(renderRowDesktop(programRows[3]), 10, thirdRowDesktop.isDone && !isMobile);
    const fifthRowDesktop = useTypewriter(renderRowDesktop(programRows[4]), 10, fourthRowDesktop.isDone && !isMobile);
    const finalRowDesktop = useTypewriter(renderRowDesktop(programRows[5]), 10, fifthRowDesktop.isDone && !isMobile);
    const bottomBorderDesktop = useTypewriter(programBorderDesktop, 10, finalRowDesktop.isDone && !isMobile);
    const firstRowMobile = useTypewriter(renderRowMobile(programRows[0]), 10, topBorderMobile.isDone && isMobile);
    const secondRowMobile = useTypewriter(renderRowMobile(programRows[1]), 10, firstRowMobile.isDone && isMobile);
    const thirdRowMobile = useTypewriter(renderRowMobile(programRows[2]), 10, secondRowMobile.isDone && isMobile);
    const fourthRowMobile= useTypewriter(renderRowMobile(programRows[3]), 10, thirdRowMobile.isDone && isMobile);
    const fifthRowMobile = useTypewriter(renderRowMobile(programRows[4]), 10, fourthRowMobile.isDone && isMobile);
    const finalRowMobile = useTypewriter(renderRowMobile(programRows[5]), 10, fifthRowMobile.isDone && isMobile);

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
        <div className="bg-black w-full h-full pt-6 pl-6 text-base lg:text-5xl font-glass text-white flex flex-col overflow-y-auto" ref={terminalRef}>
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
            <div className="h-screen pr-6 lg:pr-0 flex flex-col justify-around">
                <div className="flex flex-col lg:flex-row justify-evenly flex-[2]">
                    <div className="flex flex-col justify-center items-center text-3xl lg:text-6xl text-onlineblue animate-flicker">
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
                    <pre className="font-glass text-xs mt-10 mb-10 lg:mb-0 lg:mt-0 text-onlineyellow animate-flicker flex justify-center items-center">{asciiTyped.displayedText}</pre>
                </div>
                <div className="w-full max-w-fit hidden lg:flex flex-col text-4xl text-start mx-auto animate-flicker">
                    {topBorderDesktop.displayedText}
                    <div className="flex">
                        <div className="flex-[8]">
                            {firstRowDesktop.displayedText} 
                        </div>
                        {bottomBorderDesktop.isDone && <a href={programRows[0].link} target="_blank" className="flex-[1] font-glass text-onlineblue hover:underline">| -&gt;</a>}
                    </div>
                    <div className="flex">
                        <div className="flex-[8]">
                            {secondRowDesktop.displayedText} 
                        </div>
                        {bottomBorderDesktop.isDone && <a href={programRows[1].link} target="_blank" className="flex-[1] font-glass text-onlineblue hover:underline">| -&gt;</a>}
                    </div>
                    <div className="flex">
                        <div className="flex-[8]">
                            {thirdRowDesktop.displayedText} 
                        </div>
                        {bottomBorderDesktop.isDone && <a href={programRows[2].link} target="_blank" className="flex-[1] font-glass text-onlineblue hover:underline">| -&gt;</a>}
                        </div>
                    <div className="flex">
                        <div className="flex-[8]">
                            {fourthRowDesktop.displayedText}
                        </div>
                        {bottomBorderDesktop.isDone && <a href={programRows[3].link} target="_blank" className="flex-[1] font-glass text-onlineblue hover:underline">| -&gt;</a>}
                    </div>
                    <div className="flex">
                        <div className="flex-[8]">
                            {fifthRowDesktop.displayedText}
                        </div>
                        {bottomBorderDesktop.isDone && <a href={programRows[4].link} target="_blank" className="flex-[1] font-glass text-onlineblue hover:underline">| -&gt;</a>}
                    </div>
                    <div className="flex">
                        <div className="flex-[8]">
                            {finalRowDesktop.displayedText} 
                        </div>
                        {bottomBorderDesktop.isDone && <a href={programRows[5].link} target="_blank" className="flex-[1] font-glass text-onlineblue hover:underline">| -&gt;</a>}
                    </div>
                    {bottomBorderDesktop.displayedText}
                </div>
                <div className="flex flex-col text-start mx-auto lg:hidden text-xl mb-12">
                    {topBorderMobile.displayedText}
                    <div className="flex justify-between">
                        <pre className="font-glass">
                            {firstRowMobile.displayedText}
                        </pre>
                        {finalRowMobile.isDone && <a href={programRows[5].link} target="_blank" className="font-glass text-2xl mt-2 text-onlineblue hover:underline">-&gt;</a>}
                    </div>
                    {topBorderMobile.displayedText}
                    <div className="flex justify-between">
                        <pre className="font-glass">
                            {secondRowMobile.displayedText}
                        </pre>
                        {finalRowMobile.isDone && <a href={programRows[5].link} target="_blank" className="font-glass text-2xl mt-2 text-onlineblue hover:underline">-&gt;</a>}
                    </div>
                    {topBorderMobile.displayedText}
                    <div className="flex justify-between">
                        <pre className="font-glass">
                            {thirdRowMobile.displayedText}
                        </pre>
                        {finalRowMobile.isDone && <a href={programRows[5].link} target="_blank" className="font-glass text-2xl mt-2 text-onlineblue hover:underline">-&gt;</a>}
                    </div>
                    {topBorderMobile.displayedText}
                    <div className="flex justify-between">
                        <pre className="font-glass">
                            {fourthRowMobile.displayedText}
                        </pre>
                        {finalRowMobile.isDone && <a href={programRows[5].link} target="_blank" className="font-glass text-2xl mt-2 text-onlineblue hover:underline">-&gt;</a>}
                    </div>
                    {topBorderMobile.displayedText}
                    <div className="flex justify-between">
                        <pre className="font-glass">
                            {fifthRowMobile.displayedText}
                        </pre>
                        {finalRowMobile.isDone && <a href={programRows[5].link} target="_blank" className="font-glass text-2xl mt-2 text-onlineblue hover:underline">-&gt;</a>}
                    </div>
                    {topBorderMobile.displayedText}
                    <div className="flex justify-between">
                        <pre className="font-glass">
                            {finalRowMobile.displayedText}
                        </pre>
                        {finalRowMobile.isDone && <a href={programRows[5].link} target="_blank" className="font-glass text-2xl mt-2 text-onlineblue hover:underline">-&gt;</a>}
                    </div>
                    {topBorderMobile.displayedText}
                </div>
            </div>
            }
        </div>
        );
    }