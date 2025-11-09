const getPlacesNames = (callback) => {
  const places = ["FROG", "balls", "bob", "Luca", "Auchan"];

  setTimeout(() => {
    callback(places);
  }, 1000);
};

const getPlacesTypes = (places, callback) => {
  setTimeout(() => {
    const placesWithTypes = places.map((place) => ({
      name: place,
      isCoffeeShop: place.length % 2 === 0,
    }));
    callback(placesWithTypes);
  }, 1000);
};

const printPlacesInfo = (placesWithTypes) => {
  placesWithTypes.forEach((place) => console.log(place));
};

getPlacesNames((places) => {
  getPlacesTypes(places, (placesWithTypes) => {
    printPlacesInfo(placesWithTypes);
  });
});
