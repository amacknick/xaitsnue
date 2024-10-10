import { useState, FormEvent, ChangeEvent } from "react";
import Head from "next/head";
import Link from "next/link";

const words: string[] = [
  "Apple", "Galaxy", "Whisper", "Dancer", "Horizon",
  "Velvet", "Lantern", "Puzzle", "Ocean", "Falcon",
  "Echo", "Thunder", "Mosaic", "Journey", "Scribe",
  "Compass", "Shadow", "Ember", "Willow", "Quasar",
  "Cascade", "Nimbus", "Twilight", "Voyage", "Serendipity",
  "Mirage", "Tapestry", "Ember", "Labyrinth", "Harmony",
  "Vortex", "Radiance", "Solstice", "Enigma", "Aurora",
  "Chroma", "Zenith", "Driftwood", "Ember", "Prism",
  "Reverie", "Paradox", "Oasis", "Starlight", "Whimsy",
  "Elysium", "Quantum", "Ethereal", "Soliloquy", "Kaleidoscope",
  "YoYo"
];

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  const submit = (selected?: string) => {
    const value = selected || inputValue.trim();
    if (/[^a-zA-Z]/.test(value)) {
      setError(true);
      setSuggestions([]);
      setResult("");
    } else {
      setError(false);
      setResult(value);
      setSuggestions([]);
    }
    setInputValue("");
  };

  const autocomplete = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setInputValue(input);
    setResult("");

    if (!input) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = words
      .filter(word => word.toLowerCase().includes(input))
      .slice(0, 3);

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (word: string) => {
    submit(word);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <>
      <Head>
        <title>Xaitsnoo Community Dictionary Project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
          placeholder="Search..."
          value={inputValue}
          onChange={autocomplete}
        />
      </form>
      {error && (
        <div id="characters_error" className="infobox error">
          Unexpected characters! At the moment, only the Latin alphabet is supported.
        </div>
      )}
      <div id="suggestions">
        {suggestions.map(word => (
          <div
            key={word}
            className="infobox suggestion"
            onClick={() => handleSuggestionClick(word)}
          >
            {word}
          </div>
        ))}
      </div>
      {result && (
        <Link id="result" className="infobox" href={`/${result}`}>
          {result}
        </Link>
      )}
    </>
  );
};
