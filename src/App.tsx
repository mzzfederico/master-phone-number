import React, { useState } from "react";
import "./styles.css";

// Define how to break a phone number into groups.
const GROUPS = [2, 3, 3, 4];

interface PhoneNumberProps {
  numbers: string[];
  // Called for each digit with the digit and its global index.
  renderDigit: (digit: string, globalIndex: number) => JSX.Element;
  // Optionally override the plus and group separator buttons.
  plusButton?: React.ReactNode;
  groupSeparator?: React.ReactNode;
}

/**
 * A reusable component that renders a phone number as:
 *   [plus button] [group1] [separator] [group2] [separator] [group3] [separator] [group4]
 *
 * The groups are determined by the GROUPS array.
 */
const PhoneNumber: React.FC<PhoneNumberProps> = ({
                                                   numbers,
                                                   renderDigit,
                                                   plusButton,
                                                   groupSeparator,
                                                 }) => {
  return (
    <p>
      {plusButton || <button disabled>+</button>}
      {GROUPS.map((groupSize, groupIndex) => {
        // Compute the starting index for the current group.
        const start = GROUPS.slice(0, groupIndex).reduce((sum, s) => sum + s, 0);
        const groupDigits = numbers.slice(start, start + groupSize);
        return (
          <React.Fragment key={groupIndex}>
            {groupIndex > 0 && (groupSeparator || <button disabled>-</button>)}
            {groupDigits.map((digit, i) =>
              renderDigit(digit, start + i)
            )}
          </React.Fragment>
        );
      })}
    </p>
  );
};

interface OldNumbersProps {
  numbers: string[];
}

/** Renders a past guess in a read‐only (disabled) style. */
const OldNumbers: React.FC<OldNumbersProps> = ({ numbers }) => {
  return (
    <PhoneNumber
      numbers={numbers}
      renderDigit={(digit, index) => (
        <button key={index} disabled value={digit}>
          {digit}
        </button>
      )}
    />
  );
};

interface PhoneInputProps {
  numbers: string[];
  pick: (picked: boolean[]) => void;
}

/**
 * Renders the interactive phone input.
 *
 * Each digit button is clickable. When clicked its background toggles between
 * white and yellow. When the user confirms the guess, the parent callback is called.
 */
const PhoneInput: React.FC<PhoneInputProps> = ({ numbers, pick }) => {
  const [picked, setPicked] = useState<boolean[]>(
    new Array(numbers.length).fill(false)
  );

  const pickPosition = (pos: number) => {
    setPicked((prev) => {
      const newPicked = [...prev];
      newPicked[pos] = !prev[pos];
      return newPicked;
    });
  };

  return (
    <>
      <PhoneNumber
        numbers={numbers}
        renderDigit={(digit, index) => (
          <button
            key={index}
            onClick={() => pickPosition(index)}
            style={{ backgroundColor: picked[index] ? "yellow" : "white" }}
            value={digit}
          >
            {digit}
          </button>
        )}
        plusButton={<button disabled>+</button>}
        groupSeparator={<button disabled>-</button>}
      />
      <button onClick={() => pick(picked)}>Prova ancora?</button>
    </>
  );
};

interface CorrectProps {
  numbers: string[];
}

/** Renders the correct phone number with green styling. */
const Correct: React.FC<CorrectProps> = ({ numbers }) => {
  return (
    <PhoneNumber
      numbers={numbers}
      renderDigit={(digit, index) => (
        <button key={index} style={{ color: "green" }} value={digit}>
          {digit}
        </button>
      )}
      plusButton={<button style={{ color: "green" }} disabled>+</button>}
      groupSeparator={<button disabled>-</button>}
    />
  );
};

/**
 * Returns a random 12-digit phone number as a string.
 * (padStart is used to ensure the string always has 12 characters.)
 */
function randomPhone(): string {
  return Math.floor(Math.random() * 1_000_000_000_000)
    .toString()
    .padStart(12, "0");
}

export default function App() {
  // We store each guess as an array of string digits.
  const [guesses, setGuesses] = useState<string[][]>([Array.from(randomPhone())]);
  // When a correct guess is found, we store it (otherwise null)
  const [correct, setCorrect] = useState<string[] | null>(null);

  /**
   * When the user “confirms” their guess, create the next guess.
   * Each digit is taken from the previous guess if picked, otherwise from a new random number.
   */
  const tryAgain = (picked: boolean[]) => {
    setGuesses((prev) => {
      const current = prev[prev.length - 1];
      const newNumber = Array.from(randomPhone());
      const nextGuess = picked.map((p, i) => (p ? current[i] : newNumber[i]));
      if (picked.every((p) => p)) {
        setCorrect(nextGuess);
      }
      return [...prev, nextGuess];
    });
  };

  return (
    <>
      <b>Numero di telefono</b>
      {guesses.slice(0, -1).map((guess, idx) => (
        <OldNumbers key={idx} numbers={guess} />
      ))}
      {guesses.length <= 12 && !correct && (
        <PhoneInput numbers={guesses[guesses.length - 1]} pick={tryAgain} />
      )}
      {guesses.length > 12 && !correct && (
        <>
          <b>HAI PERSO.</b>
          <button onClick={() => window.location.reload()}>Prova ancora.</button>
        </>
      )}
      {correct && guesses.length <= 12 && <Correct numbers={correct} />}
    </>
  );
}
