const giveRaises = (currentSalaries, raise) => {
  /* the function receives an array of salaries and applies percentage increases to each one

    it must throw an exception if
      - the first parameter is not an array
      - the second parameter is not a number greater than zero
      - any of the salaries received as a parameter is less than or equal to zero

    log the salaries after the increases are applied
*/
};

try {
  giveRaises([500, 1000, 750], 10); // should pass
  giveRaises(75, 10); // should throw error
  giveRaises([500, 1000, "coffee"], 10); // should throw error
  giveRaises([500, 1000, 750], "a small loan of a million dollars"); // should throw error
} catch (error) {
  console.warn(error);
}
