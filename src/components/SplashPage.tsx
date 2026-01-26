import { useTypewriter } from "../utils/setTypeWriter";


export default function SplashPage() {
    const bootCommand = useTypewriter("  > SYSTEM BOOT", 60, true, true);
    const bootOK = useTypewriter("  OK", 60, bootCommand.isDone);
    const programCommand = useTypewriter("  > STARTING PROGRAM ONLINE JUBILEUM", 60, bootOK.isDone, true);
    const programOK = useTypewriter("  OK", 60, programCommand.isDone);
    const program = useTypewriter("  PROGRAM", 60, programOK.isDone);

    return (
        <div className="bg-black w-full h-full pt-6 pl-6 font-glass text-white text-xl lg:text-3xl flex flex-col">
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
            <div>{program.displayedText}</div>
        </div>
    );
}