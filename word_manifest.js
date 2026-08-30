// word_manifest.js — display order of word concepts.
// Append a new ID here when adding words/<id>.js.
//
// Order is thematic: sky & elements → people → body → animals & plants →
// home & food → made things → actions → numbers → greetings → colour, with the
// partial words (🧪) grouped last.
//
// TWO POSITIONS ARE LOAD-BEARING, so do not shuffle the top of the list:
//   WORD_ORDER[0] is the map's default word.
//   Langle's clue panel shows the FIRST FOUR entries the target language has a
//   cell for (see clueConcepts/clueHtml in wordmap.html), so the list must open
//   with four words that nearly every language carries. water, fire, sun and
//   moon are at 98% each; a low-coverage word here would make the clue panel
//   inconsistent from language to language.

const WORD_ORDER = [
    // sky & elements
    "water",
    "fire",
    "sun",
    "moon",
    "star",
    "night",
    "rain",
    "snow",
    "wind",
    "earth",
    "stone",
    // people
    "mother",
    "father",
    "daughter",
    "i",
    "you",
    "we",
    "name",
    // body & feeling
    "eye",
    "ear",
    "nose",
    "tooth",
    "tongue",
    "hand",
    "heart",
    "bone",
    "blood",
    "love",
    // animals & plants
    "tree",
    "dog",
    "cat",
    "fish",
    "bird",
    "egg",
    "bear",
    // home, food & drink
    "house",
    "milk",
    "honey",
    "salt",
    "wine",
    // things people made
    "iron",
    "wheel",
    // actions
    "eat",
    "drink",
    "sleep",
    // numbers
    "one",
    "two",
    "three",
    "four",
    "five",
    "hundred",
    // greetings & quality
    "hello",
    "thanks",
    "good",
    // colour
    "red",
    "white",
    "black",
    // experimental / partial words (🧪) — mapped only where a sourced form
    // exists, so they are grouped last, after the full-coverage core words.
    "cuckoo",
    "woof",
    "computer",
    "sushi",
    "tea",
    "orange",
    "n99",
    "dopamine",
    "atsign",
    "poop",
];
