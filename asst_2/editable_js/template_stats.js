/**
 * STATS VIEW - STUDENTS IMPLEMENT
 * Show aggregate statistics and insights - good for understanding the big picture
 */
function showStats(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Calculate meaningful statistics from the dataset
  // - Present insights visually
  // - Show distributions, averages, counts, etc.
  // - Help users understand patterns in the data
  /*html*/
  let statsHTML = ``;

    statsHTML += `<div class="stat-card">
                        <h3 class="stat-title">Number of artworks</h3>
                        <div class="stat-number">${data.length}</div>
                    </div>`
    const categories = new Set(data.map((item) => item.category_titles[0]))
    statsHTML += `<div class="stat-card">
                        <h3 class="stat-title">Number of categories</h3>
                        <div class="stat-number">${categories.size}</div>
                    </div>`

    let largestCategory = "";
    let categoryAmount = 0;
    categories.forEach(category => {
        let categoryArtworks = data.filter(function(artwork){
            return (artwork.category_titles[0] === category)
        })
        if (categoryAmount < categoryArtworks.length)
        {
            categoryAmount = categoryArtworks.length;
            largestCategory = category;
        }
    });
    statsHTML += `<div class="stat-card">
                        <h3 class="stat-title">Largest Category</h3>
                        <div class="stat-number">${largestCategory}</div>
                    </div>`
    statsHTML += `<div class="stat-card">
                        <h3 class="stat-title">Largest Category Size</h3>
                        <div class="stat-number">${categoryAmount}</div>
                    </div>`

    const authors = new Set(data.map((item) => item.artist_title))
    statsHTML += `<div class="stat-card">
                        <h3 class="stat-title">Number of Artists</h3>
                        <div class="stat-number">${authors.size}</div>
                    </div>`

    let mostPublishedAuthor = "";
    let publications = 0;
    authors.forEach(author => {
        let authorArtworks = data.filter(function(artwork){
            return (artwork.artist_title === author)
        })
        if (publications < authorArtworks.length)
        {
            publications = authorArtworks.length;
            mostPublishedAuthor = author;
        }
    });
    statsHTML += `<div class="stat-card">
                        <h3 class="stat-title">Most Published Author</h3>
                        <div class="stat-number">${mostPublishedAuthor}</div>
                    </div>`
    statsHTML += `<div class="stat-card">
                        <h3 class="stat-title">Author's Works</h3>
                        <div class="stat-number">${publications}</div>
                    </div>`

  return `
                <h2 class="view-title">📈 Statistics View</h2>
                <p class="view-description">Browse statistics about artworks</p>
                <div class="stats-grid">
                    ${statsHTML}
                </div>
            `;
}

export default showStats