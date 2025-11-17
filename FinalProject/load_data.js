// ===================================================
// Load data from either the api or the custom dataset
// ===================================================

// Loads data from the API
export async function loadDataFromAPI() {
  try 
  {
    const response = await fetch ("https://raw.githubusercontent.com/devstronomy/nasa-data-scraper/refs/heads/master/data/json/planets.json")
    const data = await response.json();
    if (!response.ok) throw new Error('Load failed');
    console.log("data loaded", data);

    return data;
  } 
  catch (error) 
  {
    console.error("Failed to load data:", error);
    throw new Error("Could not load data from API");
  }
}