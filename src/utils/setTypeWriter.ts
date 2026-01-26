import { useEffect, useState } from "react";

export function useTypewriter(
  text: string,
  speed = 40,
  start = true,
  command = false
) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!start) return;

    let index = 0;
    setDisplayedText("");
    setIsDone(false);

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;

      if (index >= text.length) {
        clearInterval(interval)

        if (!command) {
          setIsDone(true);
          return;
        }

        let dots = 0;
        let rounds = 0
        const dotsInterval = setInterval(() => {
          setDisplayedText((prev) => prev + ".");
          dots++;

          if (dots > 3) {
            if (rounds >= 1) {
              setDisplayedText((prev) => prev.substring(0, prev.length - 1))
              clearInterval(dotsInterval);
              setIsDone(true);
              return;
            }
            setDisplayedText((prev) => prev.replace(/\.*$/, ""))
            dots = 0;
            rounds++;
          }


        }, 500)
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, start]);

  return { displayedText, isDone };
}
