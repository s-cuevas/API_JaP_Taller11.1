// Lista de estados y sus abreviaturas (Le pedi a chatGPT que me haga un objeto con los datos sacados de https://www.ibm.com/docs/en/partnerengagemanager?topic=partners-state-abbreviations)
const states = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "District of Columbia": "DC",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY"
};

const stateInput = document.getElementById('stateInput');
const suggestions = document.getElementById('suggestions');

stateInput.addEventListener('input', () => {
    const searchTerm = stateInput.value.toLowerCase();
    suggestions.innerHTML = '';
    const matchingStates = Object.entries(states).filter(([state, abbreviation]) =>
        state.toLowerCase().includes(searchTerm) || abbreviation.toLowerCase().includes(searchTerm)
    );

    matchingStates.forEach(([state, abbreviation]) => {
        const suggestionItem = document.createElement('li');
        suggestionItem.textContent = `${state} (${abbreviation})`;
        suggestionItem.addEventListener('click', () => {
            localStorage.setItem('statenotAbb', state);
            localStorage.setItem('stateAbb', abbreviation)
            stateInput.value = `${state} (${abbreviation})`;
            suggestions.innerHTML = '';
        });
        suggestions.appendChild(suggestionItem);
    });
});

//Se va a hacer el fetch y el ingreso de los datos
document.getElementById('btnSubmit').addEventListener("click", function (e) {
    e.preventDefault();
    const stateAbb = localStorage.getItem('stateAbb').toLowerCase();
    const url = 'https://api.covidtracking.com/v1/states/' + stateAbb + '/current.json';
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const resultDiv = document.getElementById('output');
            const imageback = document.getElementById('phImg');
            resultDiv.removeChild(imageback);
            const statenotAbb = localStorage.getItem('statenotAbb');
            resultDiv.innerHTML = `<div class="container">
             <h2>${statenotAbb} (${data.state})</h2>
             <p>Ultima fecha de actualizacion: ${data.lastUpdateEt}</p>
             <p>Casos Positivos: ${data.positive}</p>
             <p>Personas Hospitalizadas: ${data.hospitalizedCurrently} </p>
             <p>Fallecidos: ${data.death}</p>
             </div>
         `;
        })
        .catch(error => console.error('Error:', error));
});

//Mejorar los datos que levanta y tirarlos al medio....
// Cambiar la fecha por la fecha de ultima actualizacion
//Cantidad de estudios realizados
// 
