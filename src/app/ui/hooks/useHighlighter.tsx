import React from "react";

export function useHighlighter(words: string, Highlighter: React.ElementType) {
  const highlight = (text: string) => {
    const search = words.toLocaleLowerCase().split(' ');
    const expression = words.split(' ').map(w => `(${w})`).join('|');
    const regex = new RegExp(expression, "gi");
    const syllables = text.toLowerCase().split(regex);

    console.log(search);
    return syllables.map((syllable, index) => {
      if (search.includes(syllable)) {
        return <Highlighter key={index}>{syllable}</Highlighter>;
      }

      return <span key={index}>{syllable}</span>;
    });
  };

  return (text: string) => {
    return <>{highlight(text)}</>;
  };
}
