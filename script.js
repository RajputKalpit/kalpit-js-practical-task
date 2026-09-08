async function getData(){
    let res = await fetch("hotel.json");
    var data = await res.json();

    /*=== RESORTS ===*/
    let resorts = [];
    data.map((item, index)=>{
        resorts.push(String(item.resorttype));
    })
    //console.log(resorts)
    let eliminatedResorts = resorts.filter(item=> !item.includes(",") );
    let uniqueResorts = [...new Set(eliminatedResorts)];
    //console.log(uniqueResorts)

    let optionsResort = "";
    uniqueResorts.map((resort)=>{
        return optionsResort += `<option value="${resort}">${resort}</option>`
    })
    let resortSelection = document.querySelector("#sel-resorts");
    resortSelection.innerHTML = optionsResort;


    /* === Ages === */
    let ages = [];
    data.map((item, index)=>{
        ages.push(String(item.age));
    })
    //console.log(ages)
    let eliminatedAge = ages.filter(item=> !item.includes(",") && !item == "" );
    let uniqueAge = [...new Set(eliminatedAge)];
    //console.log(uniqueAge)

    let optionsAges = "";
    uniqueAge.map((resort)=>{
        return optionsAges += `<option value="${resort}">${resort}</option>`
    })
    let ageSelection = document.querySelector("#sel-age");
    ageSelection.innerHTML = optionsAges;

    /* === Seasons === */
    let seasons = [];
    data.map((item)=>{
        seasons.push(String(item.season));
    })
    //console.log(seasons)
    let eliminatedSeasons = seasons.filter(item=> !item.includes(",") && !item == "");
    let uniqueSeason = [...new Set(eliminatedSeasons)];
    //console.log(uniqueSeason)

    let optionsSeasons = "";
    uniqueSeason.map((resort)=>{
        return optionsSeasons += `<option value="${resort}">${resort}</option>`
    })
    let seasonSelection = document.querySelector("#sel-season");
    seasonSelection.innerHTML = optionsSeasons;


    /*=== CARD ===*/
    const cardTemplate = (item) => `<div class="results__box border">
                <div class="results__img">
                    <img class="results__image border-end" src="${item.image ? item.image : 'https://dummyimage.com/567x420/000/fff'}" alt="placeholder" />
                </div>
                <div class="results__data">
                    <div class="results__left">
                    <p class="results__name">${item.name}</p>
                    <p class="results__address">${item.address.streetAddress + ", " + item.address.addressLocality + ", " + item.address.addressRegion}</p>
                    <p class="results__rate">Rated ${item.star} based on ${item.reviewscount} reviews</p>
                    <p class="results__age">${item.age} - ${item.season}</p>
                    </div>
                    <div class="results__right">
                        <p class="results__rate">From ${item.price} USD/Night</p>
                    </div>
                </div>
            </div>`;

    /*=== LIST ITEMS ===*/
    let resultsBoxes = [...data];
    let allResultsBoxes = [...data];

    let itemsPerLoad = 15;
    let visibleItems = 15;
    let currentSort = "Price- Low to High";

    resultsBoxes.sort((a, b) => a.price - b.price);
    let card = resultsBoxes.slice(0, visibleItems).map(item => cardTemplate(item)).join('');
    document.querySelector(".results").innerHTML = card
    document.querySelector(".cards-count").innerHTML = [...new Set(resultsBoxes)].length;

    // Variable to store selected values
    let resortType = '';
    let ageType = '';
    let seasonType = '';

    // Code for handle selections
    let filterSelection = document.querySelectorAll("[data-filters]");
    filterSelection.forEach((selection)=>{
        selection.addEventListener("change", function(e){
            // Code for handle resort selection
            if(e.target.id === "sel-resorts" ){
                resortType = e.target.value.trim();

                let buttonReset = document.querySelector("[data-reset-resort]");
                if(buttonReset.classList.contains("d-none")){
                    buttonReset.classList.remove("d-none")
                    buttonReset.classList.add("d-flex")
                }
                buttonReset.querySelector(".entity__resort-text").innerText = resortType;

                console.log(resortType, ageType, seasonType)

                listItems(resortType, ageType, seasonType)
            }
            // Code for handle age selection
            if(e.target.id === "sel-age" ){
                ageType = e.target.value.trim();

                let buttonReset = document.querySelector("[data-reset-age]");
                if(buttonReset.classList.contains("d-none")){
                    buttonReset.classList.remove("d-none")
                    buttonReset.classList.add("d-flex")
                }
                buttonReset.querySelector(".entity__age-text").innerText = ageType;


                console.log(resortType, ageType, seasonType)
                listItems(resortType, ageType, seasonType)
            }   
            // Code for handle season selection         
            if(e.target.id === "sel-season" ){
                seasonType = e.target.value.trim();

                let buttonReset = document.querySelector("[data-reset-season]");
                if(buttonReset.classList.contains("d-none")){
                    buttonReset.classList.remove("d-none")
                    buttonReset.classList.add("d-flex")
                }
                buttonReset.querySelector(".entity__season-text").innerText = seasonType;

                console.log(resortType, ageType, seasonType)
                listItems(resortType, ageType, seasonType)
            }
        })
    });

    // Code for handle sorting
    let selSortBy = document.querySelector("#sel-sort");
    selSortBy.addEventListener("change",(e)=>{
        currentSort = e.target.value;
        visibleItems = 15;
        // Price low to high
        if(e.target.value === "Price- Low to High"){
            console.log("Event Low To High")
            let resultBoxes = [...new Set(resultsBoxes)].sort((a, b) => a.price - b.price);
            let card = resultBoxes.slice(0, visibleItems).map(item => cardTemplate(item)).join('');
            document.querySelector(".results").innerHTML = card
            document.querySelector(".cards-count").innerHTML = [...new Set(resultsBoxes)].length;
        }
        // Price hight to low
        if(e.target.value === "Price – High to Low"){
            console.log("Event High To Low")
            let resultBoxes = [...new Set(resultsBoxes)].sort((a, b) => b.price - a.price);
            let card = resultBoxes.slice(0, visibleItems).map(item => cardTemplate(item)).join('');
            document.querySelector(".results").innerHTML = card
            document.querySelector(".cards-count").innerHTML = [...new Set(resultsBoxes)].length;
        }
        // Ascending order a to z
        if(e.target.value === "A to Z"){
            console.log("Event A To Z")
            let resultBoxes = [...new Set(resultsBoxes)].sort((a, b) => a.name.localeCompare(b.name));
            let card = resultBoxes.slice(0, visibleItems).map(item => cardTemplate(item)).join('');
            document.querySelector(".results").innerHTML = card
            document.querySelector(".cards-count").innerHTML = [...new Set(resultsBoxes)].length;
        }
        // Descending order z to a
        if(e.target.value === "Z to A"){
            console.log("Event Z To A")
            let resultBoxes = [...new Set(resultsBoxes)].sort((a, b) => b.name.localeCompare(a.name));
            let card = resultBoxes.slice(0, visibleItems).map(item => cardTemplate(item)).join('');
            document.querySelector(".results").innerHTML = card
            document.querySelector(".cards-count").innerHTML = [...new Set(resultsBoxes)].length;
        }
    })

    // Reset values
    let resetButtons = document.querySelectorAll("[data-reset]");
    resetButtons.forEach((element) =>{
        element.addEventListener("click",(e)=>{
        e.preventDefault();
        if(e.target.hasAttribute("data-reset-resort")){
            resortType = '';
            listItems(resortType, ageType, seasonType)
                if(e.target.classList.contains("d-flex")){
                    e.target.classList.remove("d-flex")
                    e.target.classList.add("d-none")
                }
        }
        if(e.target.hasAttribute("data-reset-age")){
            ageType = '';
            listItems(resortType, ageType, seasonType)
                if(e.target.classList.contains("d-flex")){
                    e.target.classList.remove("d-flex")
                    e.target.classList.add("d-none")
                }
        }
        if(e.target.hasAttribute("data-reset-season")){
            seasonType = '';
            listItems(resortType, ageType, seasonType)
                if(e.target.classList.contains("d-flex")){
                    e.target.classList.remove("d-flex")
                    e.target.classList.add("d-none")
                }
        }
     })
    });

    // Common function to list the items
    function listItems(resort, age, season){
        const filteredItems = allResultsBoxes.filter(item => (!resort || item.resorttype.split(',').map(type => type.trim()).includes(resort)) 
                && (!age || item.age === age) 
                && (!season || item.season === season));
        //console.log(filteredItems)
        resultsBoxes.length = 0;
        resultsBoxes = [...filteredItems];
        visibleItems = 15;
        const card = [...new Set(resultsBoxes)].sort((a, b) => a.price - b.price).slice(0, visibleItems).map(item => cardTemplate(item)).join('');
        document.querySelector(".results").innerHTML = card;
        document.querySelector(".cards-count").innerHTML = [...new Set(resultsBoxes)].length;
    }

    // Infinite Scroll
    window.addEventListener("scroll", () => {
        if (visibleItems >= resultsBoxes.length) {
            return;
        }
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
            visibleItems += itemsPerLoad;
            let resultBoxes = [...new Set(resultsBoxes)];
            if (currentSort === "Price- Low to High") {
                resultBoxes.sort((a, b) => a.price - b.price);
            }
            if (currentSort === "Price - High to Low") {
                resultBoxes.sort((a, b) => b.price - a.price);
            }
            if (currentSort === "A to Z") {
                resultBoxes.sort((a, b) => a.name.localeCompare(b.name));
            }
            if (currentSort === "Z to A") {
                resultBoxes.sort((a, b) => b.name.localeCompare(a.name));
            }
            const card = resultBoxes.slice(0, visibleItems).map(item => cardTemplate(item)).join('');
            document.querySelector(".results").innerHTML = card;
        }
    });

    // Print list items on click
    let printButton = document.querySelector(".entity__print-pdf");
    printButton.addEventListener("click", ()=>{
        window.print();
    });

    // AI Assistant

function getApiKey() {
  const hash = window.location.hash;
  const match = hash.match(/key=([^&]+)/);
  return match ? match[1] : null;
}
const GEMINI_API_KEY = getApiKey();
const GEMINI_MODEL = "gemini-3.6-flash";
const GEMINI_URL =`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
/* =========================================================
   AI DOM ELEMENTS
   ========================================================= */

const aiInput =document.querySelector("#userInput");
const aiSendButton =document.querySelector("#sendBtn");
const aiChatMessages =document.querySelector("#chatMessages");


/* =========================================================
   GEMINI SYSTEM INSTRUCTION
   ========================================================= */
const AI_SYSTEM_INSTRUCTION = `

You are an AI assistant for a hotel/resort search website.

Your ONLY job is to understand the user's hotel search request
and convert it into structured JSON.

The application contains hotel data with these fields:

- id
- name
- regionName
- address
- price
- resorttype
- age
- season
- star
- reviewscount
- addressCountry

IMPORTANT:

1. Return ONLY valid JSON.
2. Never return markdown.
3. Never return \`\`\`json.
4. Never return explanations.
5. Never invent hotel information.
6. Never return hotel names.
7. Never return hotel records.
8. Use null when a filter is not specified.
9. Price values must be numbers.
10. Star values must be numbers.

Return EXACTLY this structure:

{
    "intent": "hotel_search",

    "filters": {
        "regionName": null,
        "resorttype": null,
        "age": null,
        "season": null,
        "minPrice": null,
        "maxPrice": null,
        "minStar": null
    },

    "sort": {
        "field": null,
        "direction": null
    }
}

FILTER RULES:

"under $100"
=> maxPrice: 100

"below $100"
=> maxPrice: 100

"above $50"
=> minPrice: 50

"over $50"
=> minPrice: 50

"4 star"
=> minStar: 4

"4 star or higher"
=> minStar: 4

"cheapest"
=> sort.field: "price"
=> sort.direction: "asc"

"most expensive"
=> sort.field: "price"
=> sort.direction: "desc"

"best rated"
=> sort.field: "star"
=> sort.direction: "desc"

"highest rated"
=> sort.field: "star"
=> sort.direction: "desc"

"most reviews"
=> sort.field: "reviewscount"
=> sort.direction: "desc"

"alphabetical"
=> sort.field: "name"
=> sort.direction: "asc"


EXAMPLE 1:

User:
Show me RV resorts in Florida under $80

Return:

{
    "intent": "hotel_search",

    "filters": {
        "regionName": "Florida",
        "resorttype": "RV",
        "age": null,
        "season": null,
        "minPrice": null,
        "maxPrice": 80,
        "minStar": null
    },

    "sort": {
        "field": null,
        "direction": null
    }
}


EXAMPLE 2:

User:
Show me 55+ resorts that are year round

Return:

{
    "intent": "hotel_search",

    "filters": {
        "regionName": null,
        "resorttype": null,
        "age": "55+",
        "season": "Year Round",
        "minPrice": null,
        "maxPrice": null,
        "minStar": null
    },

    "sort": {
        "field": null,
        "direction": null
    }
}


EXAMPLE 3:

User:
Show me the cheapest RV resorts in Florida

Return:

{
    "intent": "hotel_search",

    "filters": {
        "regionName": "Florida",
        "resorttype": "RV",
        "age": null,
        "season": null,
        "minPrice": null,
        "maxPrice": null,
        "minStar": null
    },

    "sort": {
        "field": "price",
        "direction": "asc"
    }
}

`;



/*=== CLICK and ENTER KEY ===*/
aiSendButton.addEventListener("click", handleAIQuery);
aiInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        handleAIQuery();
    }
});

/*=== MAIN AI QUERY FUNCTION === */

async function handleAIQuery() {
    const question = aiInput.value.trim();
    if (!question) return;

    addAIMessage("user", question);
    aiInput.value = "";
    aiSendButton.disabled = true;
    aiSendButton.innerText = "Searching...";

    try {
        const aiResponse = await askGemini(question);
        console.log("Gemini response:", aiResponse);

        let aiResults = filterHotelsWithAI(aiResponse.filters);
        aiResults = sortAIResults(aiResults, aiResponse.sort);
        console.log("AI matching results:", aiResults);

        displayAIResults(aiResults);

        let message = `I found ${aiResults.length} matching hotel`;
        if (aiResults.length !== 1) message += "s";
        message += ".";

        addAIMessage("assistant", message);
    } catch (error) {
        console.error("AI Assistant Error:", error);
        addAIMessage("assistant", "Sorry, I couldn't process your request.");
    } finally {
        aiSendButton.disabled = false;
        aiSendButton.innerText = "Send";
    }
}

/*=== ASK GEMINI ===*/
async function askGemini(question) {
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            system_instruction: {
                parts: [{
                    text: AI_SYSTEM_INSTRUCTION
                }]
            },
            contents: [{
                role: "user",
                parts: [{
                    text: question
                }]
            }],
            generationConfig: {
                temperature: 0,
                responseMimeType: "application/json"
            }
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API Error:", errorText);
        throw new Error("Gemini API request failed");
    }

    const data = await response.json();

    console.log("Complete Gemini Response:", data);

    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
        throw new Error("Gemini returned empty response");
    }

    console.log("Gemini generated JSON:", generatedText);

    try {
        return JSON.parse(generatedText);
    } catch (error) {
        console.error("Invalid JSON from Gemini:", generatedText);
        throw new Error("Gemini returned invalid JSON");
    }
}

/*=== FILTER HOTELS ===*/

function filterHotelsWithAI(filters) {
    return allResultsBoxes.filter(function (item) {
        if (filters.regionName && String(item.regionName).toLowerCase() !== String(filters.regionName).trim().toLowerCase()) {
            return false;
        }

        if (filters.resorttype) {
            const itemResortTypes = String(item.resorttype).split(",").map(type => type.trim().toLowerCase());
            const requestedResortType = String(filters.resorttype).trim().toLowerCase();

            if (!itemResortTypes.includes(requestedResortType)) {
                return false;
            }
        }

        if (filters.age && String(item.age).trim().toLowerCase() !== String(filters.age).trim().toLowerCase()) {
            return false;
        }

        if (filters.season && String(item.season).trim().toLowerCase() !== String(filters.season).trim().toLowerCase()) {
            return false;
        }

        if (filters.minPrice !== null && filters.minPrice !== undefined) {
            if (Number(item.price) < Number(filters.minPrice)) {
                return false;
            }
        }

        if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
            if (Number(item.price) > Number(filters.maxPrice)) {
                return false;
            }
        }

        if (filters.minStar !== null && filters.minStar !== undefined) {
            if (Number(item.star) < Number(filters.minStar)) {
                return false;
            }
        }

        return true;
    });
}


/* === SORT AI RESULTS ===*/

function sortAIResults(results,sort) {
    if (!sort ||!sort.field) {
        return results;
    }
    const sortedResults = [...results];
    if (sort.field === "price") {
    sortedResults.sort(function (a, b) {
        if (sort.direction === "desc") {
            return Number(b.price) - Number(a.price);
        }
        return Number(a.price) - Number(b.price);
    });
    }

    if (sort.field === "star") {
    sortedResults.sort(function (a, b) {
        if (sort.direction === "desc") {
            return Number(b.star) - Number(a.star);
        }
        return Number(a.star) - Number(b.star);
    });
    }

    if (sort.field === "reviewscount") {
        sortedResults.sort(function (a, b) {
            if (sort.direction === "desc") {
                return Number(b.reviewscount) - Number(a.reviewscount);
            }
            return Number(a.reviewscount) - Number(b.reviewscount);
        });
    }

    if (sort.field === "name") {
        sortedResults.sort(function (a, b) {
                if (sort.direction === "desc") {
                    return b.name.localeCompare(
                        a.name
                    );
                }
                return a.name.localeCompare(b.name);
            }
        );
    }
    return sortedResults;

}

function displayAIResults(results) {
    resultsBoxes.length = 0;
    resultsBoxes.push(...results);
    visibleItems = 15;
    const cards =resultsBoxes.slice(0,visibleItems).map(item =>cardTemplate(item)).join("");
    /*=== Print cards ===*/
    document.querySelector(".results").innerHTML = cards;
    /*=== Update result count ===*/
    document.querySelector(".cards-count").innerHTML =resultsBoxes.length;
    /* === scroll result ===*/
    document.querySelector(".results").scrollIntoView({behavior: "smooth",block: "start"});
}


/*=== CHAT ===*/
function addAIMessage(sender,message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("ai-message",`ai-${sender}`);
    messageElement.innerText = message;
    aiChatMessages.appendChild(messageElement);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
}

}

getData()
