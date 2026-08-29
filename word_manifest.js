// word_manifest.js — display order of word concepts.
// Append a new ID here when adding words/<id>.js.
// Order is thematic (sky/elements → people → body/feeling → home/living →
// actions → numbers → greetings). WORD_ORDER[0] is the map's default word.

const WORD_ORDER = [
    // sky & elements
    "water",
    "fire",
    "sun",
    "moon",
    "star",
    "night",
    "rain",
    "wind",
    "earth",
    "snow",
    "stone",
    // people
    "mother",
    "father",
    "i",
    "you",
    "we",
    "name",
    // body & feeling
    "eye",
    "ear",
    "nose",
    "tooth",
    "hand",
    "heart",
    "bone",
    "blood",
    "tongue",
    "love",
    // home & living things
    "tree",
    "house",
    "dog",
    "cat",
    "fish",
    "bird",
    "egg",
    // actions
    "eat",
    "drink",
    "sleep",
    // numbers
    "one",
    "two",
    "three",
  "four",
  "hundred",
  "honey",
  "bear",
  "daughter",
  "iron",
  "wheel",
  "salt",
  "milk",
  "wine",
    "five",
    "n99",
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
    "dopamine",
    "atsign",
    "poop",
];
