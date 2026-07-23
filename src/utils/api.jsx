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

async searchAndFetchArtworks(keyword, limit = 9 ) {
  const searchData = await this.searchArtworks(keyword);

  if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
    return [];
  }

  const selectedIds = searchData.objectIDs.slice(0, limit);

  const artworkPromises = selectedIds.map((id) => 
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
}

const metApi = new MetApi({
  baseUrl: "https://collectionapi.metmuseum.org/public/collection/v1",
});

export default metApi;