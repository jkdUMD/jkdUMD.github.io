
/**
 * TABLE VIEW - STUDENTS IMPLEMENT
 * Display data in sortable rows - good for scanning specific information
 */
function showTable(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Show data in a table format
  // - Include all important fields
  // - Make it easy to scan and compare
  // - Consider adding sorting functionality
    const tableBodyHTML = data
    .map(
       /*html*/ 
      (artwork) => `
                <tr>
                    <td>${artwork.title}</td>
                    <td>${displayArtistName(artwork.artist_title)}</td>
                    <td>${artwork.medium_display}</td>
                    <td>${artwork.date_display}</td>
                </tr>`
    ).join("");

    const tableHTML = `<table>
                        <thead>
                            <tr>
                                <th>Artwork Name</th>
                                <th>Artist Name</th>
                                <th>Medium</th>
                                <th>Display Date</th>
                            </tr>
                        </thead>
                    ${tableBodyHTML}
                    </table>`;

  return `
                <div class="restaurant-table">
                    ${tableHTML}
                </div>
            `;
}

function displayArtistName(name) {
    console.log(name);
    if (name === null)
    {
        return "N/A";
    }
    return name;
}

export default showTable;