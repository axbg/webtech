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

const sortArray = (array, sortField) => array.toSorted((a, b) => a[sortField] - b[sortField]);

console.log(sortArray(objectsToSort, sortField));
