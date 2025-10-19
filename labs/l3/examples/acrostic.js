const dictionary = ["the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog"];

const sample = `
    best
    read
    on
    windy
    nights
`;

const findAcrostic = (text, dictionary) => {
  const word = text.split("\n").map(elem => elem.trim()).map(elem => elem[0]).join("");
  return dictionary.find(elem => word === elem) || "no acrostic was found";
}

console.log(findAcrostic(sample, dictionary));
