const RANDOM_ARTS_TERMS = [
  "Bosch", "Monet", "Van Gogh", "Rembrandt", "Goya", 
  "Degas", "Cézanne", "Turner", "Gold", "Japanese print", 
  "Armor", "Sculpture", "Impressionism", "Renaissance"
];

class MetApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error en la petición: ${res.status}`);
  }

  searchArtworks(keyword) {
    return fetch(
      `${this._baseUrl}/search?q=${encodeURIComponent(keyword)}&hasImages=true`
    ).then(this._checkResponse);
  }

  getArtworkById(id) {
    return fetch(`${this._baseUrl}/objects/${id}`).then(this._checkResponse);
  }

  async _fetchArtworksFromIds(ids) {
    const artworkPromises = ids.map((id) =>
      this.getArtworkById(id)
        .then((data) => {
          if (data && (data.primaryImageSmall || data.primaryImage)) {
            return {
              id: data.objectID,
              title: data.title || "Obra sin título",
              artist: data.artistDisplayName || "Artista desconocido",
              date: data.objectDate || "Fecha no registrada",
              image: data.primaryImageSmall || data.primaryImage,
              medium: data.medium || "",
              culture: data.culture || "",
            };
          }
          return null;
        })
        .catch(() => null)
    );

    const results = await Promise.all(artworkPromises);
    return results.filter((art) => art !== null);
  }

  async searchAndFetchArtworks(keyword, limit = 9) {
    const searchData = await this.searchArtworks(keyword);

    if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
      return [];
    }

    const selectedIds = searchData.objectIDs.slice(0, limit);
    return this._fetchArtworksFromIds(selectedIds);
  }

  async getRandomArtworks(limit = 6) {
    const randomTerm = RANDOM_ARTS_TERMS[Math.floor(Math.random() * RANDOM_ARTS_TERMS.length)];
    const searchData = await this.searchArtworks(randomTerm);

    if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
      return [];
    }

    const shuffledIds = [...searchData.objectIDs].sort(() => 0.5 - Math.random());
    const selectedIds = shuffledIds.slice(0, limit);
    return this._fetchArtworksFromIds(selectedIds);
  }
}

const metApi = new MetApi({
  baseUrl: "https://collectionapi.metmuseum.org/public/collection/v1",
});

export default metApi;