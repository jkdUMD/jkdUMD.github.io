/**
 * STATS VIEW - STUDENTS IMPLEMENT
 * Show aggregate statistics and insights - good for understanding the big picture
 */

let barChart = null;
let pieChart = null;

export function showStats(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Calculate meaningful statistics from the dataset
  // - Present insights visually
  // - Show distributions, averages, counts, etc.
  // - Help users understand patterns in the data
  /*html*/
  let statsHTML = ``;

    /* Everything here is code from the previous assignment
    
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

    const artists = new Set(data.map((item) => item.artist_title))
    statsHTML += `<div class="stat-card">
                        <h3 class="stat-title">Number of Artists</h3>
                        <div class="stat-number">${artists.size}</div>
                    </div>`

    let mostPublishedArtist = "";
    let publications = 0;
    artists.forEach(artist => {
        let artistArtworks = data.filter(function(artwork){
            return (artwork.artist_title === artist)
        })
        if (publications < artistArtworks.length)
        {
            publications = artistArtworks.length;
            mostPublishedArtist = artist;
        }
    });
    statsHTML += `<div class="stat-card">
                        <h3 class="stat-title">Most Published Artist</h3>
                        <div class="stat-number">${mostPublishedArtist}</div>
                    </div>`
    statsHTML += `<div class="stat-card">
                        <h3 class="stat-title">Artist's Works</h3>
                        <div class="stat-number">${publications}</div>
                    </div>`
    */

    statsHTML +=`<div>
                    <div class="chart-container">
                        <canvas id="bar-chart"></canvas>
                    </div>
                </div>`

    statsHTML +=`<div>
                    <div class="chart-container">
                        <canvas id="pie-chart"></canvas>
                    </div>
                </div>`

  return `
                <h2 class="view-title">📈 Statistics View</h2>
                <p class="view-description">Browse statistics about artworks</p>
                <div>
                    ${statsHTML}
                </div>
            `;
}

export function createBarChart(data) {
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        alert('Chart.js not available. Check console.');
        return;
    }

    // Get all the categories
    const categories = new Set(data.map((item) => item.category_titles[0]))
    let chartLabels = Array.from(categories);

    let chartData = [];
    chartLabels.forEach(label => {
        const numberOfArtworks = data.filter(function(artwork){
            return (artwork.category_titles[0] === label)
        })
        chartData.push(numberOfArtworks.length);
    });

    // Sort by decreasing number of artworks
    let dataForSorting = [];
    for (let i = 0; i < chartLabels.length; i++) {
        dataForSorting.push({label: chartLabels[i], data: chartData[i]})
    }

    let sortedData = dataForSorting.sort(function(a, b){
        return (b.data - a.data)
    })

    chartLabels = [];
    chartData = [];
    sortedData.forEach(function(item){
        chartLabels.push(item.label);
        chartData.push(item.data);
    })

    console.log('Chart data prepared:', { labels: chartLabels, data: chartData });
    
    try {
        // Get canvas and clear existing chart
        const canvas = document.querySelector('#bar-chart');
        const ctx = canvas.getContext('2d');
        
        if (barChart) {
            barChart.destroy();
            barChart = null;
        }
        
        // Creating the chart
        barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Artworks Per Category',
                    data: chartData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 205, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Artwork Categories'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '# of Artworks'
                            
                        },
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
        
        console.log('Chart created successfully!');
        
    } catch (error) {
        handleChartError(error); // Error handling provided in support file
    }
}

export function createPieChart(data) {
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        alert('Chart.js not available. Check console.');
        return;
    }

    // Edit null artists to say N/A
    data.forEach(function(artwork){
        if (artwork.artist_title === null)
        {
            artwork.artist_title = 'No Artist Listed';
        }
    })

    // Get all the artists
    const artists = new Set(data.map((item) => item.artist_title))
    let chartLabels = Array.from(artists);

    let chartData = [];
    chartLabels.forEach(label => {
        const numberOfArtists = data.filter(function(artwork){
            return (artwork.artist_title === label)
        })
        chartData.push(numberOfArtists.length);
    });

    // Sort by decreasing number of artworks
    let dataForSorting = [];
    for (let i = 0; i < chartLabels.length; i++) {
        dataForSorting.push({label: chartLabels[i], data: chartData[i]})
    }

    let sortedData = dataForSorting.sort(function(a, b){
        return (b.data - a.data)
    })

    chartLabels = [];
    chartData = [];
    sortedData.forEach(function(item){
        chartLabels.push(item.label);
        chartData.push(item.data);
    })

    console.log('Chart data prepared:', { labels: chartLabels, data: chartData });
    
    try {
        // Get canvas and clear existing chart
        const canvas = document.querySelector('#pie-chart');
        const ctx = canvas.getContext('2d');
        
        if (pieChart) {
            pieChart.destroy();
            pieChart = null;
        }
        
        // Creating the chart
        pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Artwork Categories',
                    data: chartData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 205, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Artwork Categories'
                    }
                },
            }
        });
        
        console.log('Chart created successfully!');
        
    } catch (error) {
        handleChartError(error); // Error handling provided in support file
    }
}

function handleChartError(error) {
    console.error('Chart creation failed:', error);
    
    // Show error in canvas
    const canvas = document.querySelector('#restaurant-chart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f8d7da';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#721c24';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Chart creation failed', canvas.width/2, canvas.height/2 - 10);
        ctx.fillText('Check console for details', canvas.width/2, canvas.height/2 + 15);
    }
}