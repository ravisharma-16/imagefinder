const accessKey = "RH7sgURRT18xCJ0rHMp-KfyRo1f4yeDgPPn51HLY-8o";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResults = document.getElementById("search-result");

let keyword = "";
let nextPage = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?query=${keyword}&page=${nextPage}&per_page=10&client_id=${accessKey}&per_page=12`;
    searchResults.innerHTML = "<p>Loading...</p>"; 
    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        searchResults.innerHTML = "";
        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.regular;
            image.alt = result.alt_description;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.appendChild(image);

            searchResults.appendChild(imageLink);
        });
    } catch (error) {
        searchResults.innerHTML = "<p>Failed to load results. Please try again.</p>";
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    nextPage = 1; 
    searchImages();
});
