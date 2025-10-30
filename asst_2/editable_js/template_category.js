/**
 * CATEGORY VIEW - STUDENTS IMPLEMENT
 * Group data by categories - good for understanding relationships and patterns
 */
function showCategories(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Group data by a meaningful category (cuisine, neighborhood, price, etc.)
  // - Show items within each group
  // - Make relationships between groups clear
  // - Consider showing group statistics
  /*html*/
  let categoriesHTML = ``;

  const categories = new Set(data.map((item) => item.category_titles[0]))
  console.log(categories);

  categories.forEach(category => {
    categoriesHTML += `<h3 class=category-header>${category}</h3>
                        <div class=category-items>`
                        let categoryArtworks = data.filter(function(artwork){
                            return (artwork.category_titles[0] === category)
                        })
                        categoryArtworks.forEach(function(artwork){
                          categoriesHTML += `<div class=category-item>
                          ${artwork.title}
                          </div>`
                        })  
    categoriesHTML += `</div>`
  });

  return `
                <h2 class="view-title">📊 Category View</h2>
                <p class="view-description">Browse artworks in category form</p>
                <div class="categories-section">
                    ${categoriesHTML}
                </div>
            `;
}

export default showCategories;