import React from "react";

export function useHighlighter(words: string, Highlighter: React.ElementType) {
  const highlight = (text: string) => {
    return words.split(' ').map(word => {
      const regex = new RegExp(`(${word})`, "gi");
      const syllables = text.split(regex);
  
      return syllables.map((syllable, index) => {
        if (syllable.toLocaleLowerCase() === word.toLocaleLowerCase()) {
          return <Highlighter key={index}>{syllable}</Highlighter>;
        }
  
        return <span key={index}>{syllable}</span>;
      });
    })
  };

  return (text: string) => {
    return <>{highlight(text)}</>;
  };
}
