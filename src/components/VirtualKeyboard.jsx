import React, { useState } from "react";
import "../styles/virtual-keyboard.css";

export default function VirtualKeyboard({ isShowKeyboard, handleKeyPress }) {
  const keys = [
    // Row 1: Persian letters corresponding to the first row of the English keyboard
    [
      ["ض", "Q"],
      ["ص", "W"],
      ["ث", "E"],
      ["ق", "R"],
      ["ف", "T"],
      ["غ", "Y"],
      ["ع", "U"],
      ["ه", "I"],
      ["خ", "O"],
      ["ح", "P"],
      ["ج", "Å"],
      ["چ", "rÅ"],
    ],

    // Row 2: Persian letters corresponding to the second row of the English keyboard
    [
      [" ", "Space"],
      ["ش", "A"],
      ["س", "S"],
      ["ی", "D"],
      ["ب", "F"],
      ["ل", "G"],
      ["ا", "H"],
      ["ت", "J"],
      ["ن", "K"],
      ["م", "L"],
      ["ک", "Ø"],
      ["گ", "Æ"],
      ["back", "<-"],
    ],

    // Row 3: Persian letters corresponding to the third row of the English keyboard
    [
      ["!", "!"],
      ["ظ", "Z"],
      ["ط", "X"],
      ["ز", "C"],
      ["ر", "V"],
      ["ذ", "B"],
      ["د", "N"],
      ["پ", "M"],
      ["و", ","],
      ["ژ", "."],
      [".", ".."],
      ["?", "?"],
    ],
  ];

  return (
    <div className={`virtual-keyboard ${isShowKeyboard && "show"}`}>
      {keys.map((row, row_index) => (
        <div className="row" key={row_index}>
          {row.map((key, key_index) => (
            <button
              key={key_index}
              className="virtual-key"
              onClick={(e) => {
                e.preventDefault();
                handleKeyPress(key[0]);
              }}
            >
              {key[0]} {key[1]}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
