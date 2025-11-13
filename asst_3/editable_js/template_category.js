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
    let categoryArtworks = data.filter(function(artwork){
      return (artwork.category_titles[0] === category)
    })
    categoriesHTML += `<h3 class=category-header>${category} - ${categoryArtworks.length} items</h3>
                        <div class=category-items>`
                        categoryArtworks.forEach(function(artwork){
                          categoriesHTML += `<div class=category-item>
                          ${artwork.title}
                          </div>`
                        })  
    categoriesHTML += `</div>`
  });

  return `
                <div class="categories-section">
                    ${categoriesHTML}
                </div>
            `;
}

export default showCategories;