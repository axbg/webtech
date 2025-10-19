const objectsToSort = [
  {
    name: 'John',
    hasVisa: true,
    yearOfBirth: 1990
  },
  {
    name: 'Joe',
    hasVisa: false,
    yearOfBirth: 2007
  },
  {
    name: 'Alex',
    hasVisa: false,
    yearOfBirth: 1987
  },
  {
    name: 'Alex',
    hasVisa: true,
    yearOfBirth: 1960
  }
]

const sortField = 'yearOfBirth';

// const sortArray = a function that sorts the array in ascending order based on the value of sortingField
console.log(sortArray(objectsToSort, sortField));
