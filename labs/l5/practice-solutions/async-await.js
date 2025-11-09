const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

const getPlacesNames = async () => {
  const places = ["FROG", "balls", "bob", "Luca", "Auchan"];

  await delay(1000);

  return places;
};

const getPlacesTypes = async (places) => {
  await delay(1000);

  return places.map((place) => ({
    name: place,
    isCoffeeShop: place.length % 2 === 0,
  }));
};

const printPlacesInfo = (placesWithTypes) => {
  placesWithTypes.forEach((place) => console.log(place));
};

const main = async () => {
  const places = await getPlacesNames();
  const placesWithTypes = await getPlacesTypes(places);

  printPlacesInfo(placesWithTypes);
};

main();
