
const dogs = [
  {
    name: 'Billy',
    isDachshund: false
  },
  {
    name: 'Bobby',
    isDachshund: true
  },
  {
    name: 'Mark',
    isDachshund: true
  }
];

const filteredDogs = dogs.filter(dog => dog.isDachshund);

console.log(filteredDogs);

/* expected output:
[
  {name: 'Bobby', isDachshund: true},
  {name: 'Mark', isDachshund: true}
]
*/
