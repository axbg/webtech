class Artwork {
  #author;
  #year;

  constructor(author, year) {
    this.#author = author;
    this.#year = year;
  }

  getArtworkDetails() {
    console.log(`${this.#year} - ${this.#author}`);
  }

  sellArtwork(buyer) {
    console.log(
      `Selling picture by ${this.#author} painted in ${this.#year}to ${buyer}`,
    );
  }
}

const art = new Artwork("Van Gogh", 1741);
art.getArtworkDetails();
