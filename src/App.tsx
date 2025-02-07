import { useState } from "react";
import "./styles.css";

const OldNumbers = ({ numbers }) => {
  return (
    <p>
      <button disabled>+</button>
      <button disabled value={numbers[0]}>
        {numbers[0]}
      </button>
      <button disabled value={numbers[1]}>
        {numbers[1]}
      </button>
      <button disabled>-</button>
      <button disabled value={numbers[2]}>
        {numbers[2]}
      </button>
      <button disabled value={numbers[3]}>
        {numbers[3]}
      </button>
      <button disabled value={numbers[4]}>
        {numbers[4]}
      </button>
      <button disabled>-</button>
      <button disabled value={numbers[5]}>
        {numbers[5]}
      </button>
      <button disabled value={numbers[6]}>
        {numbers[6]}
      </button>
      <button disabled value={numbers[7]}>
        {numbers[7]}
      </button>
      <button disabled>-</button>
      <button disabled value={numbers[8]}>
        {numbers[8]}
      </button>
      <button disabled value={numbers[9]}>
        {numbers[9]}
      </button>
      <button disabled value={numbers[10]}>
        {numbers[10]}
      </button>
      <button disabled value={numbers[11]}>
        {numbers[11]}
      </button>
    </p>
  );
};

const PhoneInput = ({ numbers, pick }) => {
  const [picked, setPicked] = useState(new Array(12).fill(false));

  const pickPosition = (pos) => {
    setPicked((prev) => {
      const newA = [...prev];
      newA[pos] = !prev[pos];
      return newA;
    });
  };

  return (
    <p>
      <button disabled>+</button>
      <button
        onClick={() => pickPosition(0)}
        style={{ backgroundColor: picked[0] ? "yellow" : "white" }}
        value={numbers[0]}
      >
        {numbers[0]}
      </button>
      <button
        onClick={() => pickPosition(1)}
        style={{ backgroundColor: picked[1] ? "yellow" : "white" }}
        value={numbers[1]}
      >
        {numbers[1]}
      </button>
      <button disabled>-</button>
      <button
        onClick={() => pickPosition(2)}
        style={{ backgroundColor: picked[2] ? "yellow" : "white" }}
        value={numbers[2]}
      >
        {numbers[2]}
      </button>
      <button
        onClick={() => pickPosition(3)}
        style={{ backgroundColor: picked[3] ? "yellow" : "white" }}
        value={numbers[3]}
      >
        {numbers[3]}
      </button>
      <button
        onClick={() => pickPosition(4)}
        style={{ backgroundColor: picked[4] ? "yellow" : "white" }}
        value={numbers[4]}
      >
        {numbers[4]}
      </button>
      <button disabled>-</button>
      <button
        onClick={() => pickPosition(5)}
        style={{ backgroundColor: picked[5] ? "yellow" : "white" }}
        value={numbers[5]}
      >
        {numbers[5]}
      </button>
      <button
        onClick={() => pickPosition(6)}
        style={{ backgroundColor: picked[6] ? "yellow" : "white" }}
        value={numbers[6]}
      >
        {numbers[6]}
      </button>
      <button
        onClick={() => pickPosition(7)}
        style={{ backgroundColor: picked[7] ? "yellow" : "white" }}
        value={numbers[7]}
      >
        {numbers[7]}
      </button>
      <button disabled>-</button>
      <button
        onClick={() => pickPosition(8)}
        style={{ backgroundColor: picked[8] ? "yellow" : "white" }}
        value={numbers[8]}
      >
        {numbers[8]}
      </button>
      <button
        onClick={() => pickPosition(9)}
        style={{ backgroundColor: picked[9] ? "yellow" : "white" }}
        value={numbers[9]}
      >
        {numbers[9]}
      </button>
      <button
        onClick={() => pickPosition(10)}
        style={{ backgroundColor: picked[10] ? "yellow" : "white" }}
        value={numbers[10]}
      >
        {numbers[10]}
      </button>
      <button
        onClick={() => pickPosition(11)}
        style={{ backgroundColor: picked[11] ? "yellow" : "white" }}
        value={numbers[11]}
      >
        {numbers[11]}
      </button>

      <button onClick={() => pick(picked)}>Prova ancora?</button>
    </p>
  );
};

const Correct = ({ numbers }) => {
  return (
    <p>
      <button style={{ color: "green" }} disabled>
        +
      </button>
      <button style={{ color: "green" }} value={numbers[0]}>
        {numbers[0]}
      </button>
      <button style={{ color: "green" }} value={numbers[1]}>
        {numbers[1]}
      </button>
      <button disabled>-</button>
      <button style={{ color: "green" }} value={numbers[2]}>
        {numbers[2]}
      </button>
      <button style={{ color: "green" }} value={numbers[3]}>
        {numbers[3]}
      </button>
      <button style={{ color: "green" }} value={numbers[4]}>
        {numbers[4]}
      </button>
      <button disabled>-</button>
      <button style={{ color: "green" }} value={numbers[5]}>
        {numbers[5]}
      </button>
      <button style={{ color: "green" }} value={numbers[6]}>
        {numbers[6]}
      </button>
      <button style={{ color: "green" }} value={numbers[7]}>
        {numbers[7]}
      </button>
      <button disabled>-</button>
      <button style={{ color: "green" }} value={numbers[8]}>
        {numbers[8]}
      </button>
      <button style={{ color: "green" }} value={numbers[9]}>
        {numbers[9]}
      </button>
      <button style={{ color: "green" }} value={numbers[10]}>
        {numbers[10]}
      </button>
      <button style={{ color: "green" }} value={numbers[11]}>
        {numbers[11]}
      </button>
    </p>
  );
};

function randomPhone() {
  return Math.floor(Math.random() * 1_000_000_000_000_000).toString();
}

export default function App() {
  const [guesses, setGuesses] = useState<number[]>([randomPhone()]);

  const [correct, setCorrect] = useState(false);

  const tryAgain = (picked: boolean[]) => {
    setGuesses((prev) => {
      const current = prev[prev.length - 1];
      const newNumber = Array.from(randomPhone());
      const keepOld = picked.map((p, i) => (p ? current[i] : newNumber[i]));

      if (picked.every((p) => !!p)) {
        setCorrect(keepOld);
      }

      return [...prev, keepOld];
    });
  };

  return (
    <>
      <b>Numero di telefono</b>
      {guesses.slice(0, -1).map((nnnn) => (
        <OldNumbers numbers={nnnn} />
      ))}
      {guesses.length <= 12 && !correct && (
        <PhoneInput numbers={guesses[guesses.length - 1]} pick={tryAgain} />
      )}
      {guesses.length > 12 && !correct && (
        <>
          <b>HAI PERSO.</b>
          <button onClick={() => window.location.reload()}>
            {" "}
            Prova ancora.{" "}
          </button>
        </>
      )}
      {guesses.length <= 12 && correct && <Correct numbers={correct} />}
    </>
  );
}
