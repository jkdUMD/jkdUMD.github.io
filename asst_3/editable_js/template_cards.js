
/**
 * CARD VIEW - PROVIDED AS EXAMPLE
 * Display data as browsable cards - good for comparing individual items
 */
function showCards(data) {
  const cardHTML = data
    .map(
       /*html*/ 
      (artwork) => `
                <div class="restaurant-card">
                    <h3>${artwork.title}</h3>
                    <p>${displayArtistName(artwork.artist_title)}</p>
                    <p>${artwork.medium_display}</p>
                    <p>${artwork.date_display}</p>
                </div>`
    ).join("");
     /*html*/ 
  return `
                <h2 class="view-title">🃏 Card View</h2>
                <p class="view-description">Browse artworks as individual cards</p>
                <div class="card-grid">
                    ${cardHTML}
                </div>
            `;
}

function displayArtistName(name) {
    //console.log(name);
    if (name === null)
    {
        return "N/A";
    }
    return name;
}

export default showCards;