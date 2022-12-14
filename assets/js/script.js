// fetch dei pokemon con nome e url
function fetchPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then((allpokemon) => {
            console.log(allpokemon.results)
            allpokemon.results.forEach((pokemon) => {
                fetchData(pokemon);
            })
        })
}

// ulteriore fetch per i dati di ogni pokemon (url interno al primo fetch)
function fetchData(pokemon) {
    let url = pokemon.url
    fetch(url)
        .then(response => response.json())
        .then(function (pokeData) {
            console.log(pokeData)
            setTimeout(() => {
                displayPokemon(pokeData)
            }, 2000);
        })
}

// mostro i pokemon a schermo
function displayPokemon(pokeData) {
    let pokeContainer = document.querySelector('.container');
    // creo la card e le assegno una classe
    let pokeCard = document.createElement("div")
    pokeCard.classList.add('pokecard')
    // creo l'img della card e assegno la source 
    let pokeImg = document.createElement('img')
    pokeImg.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}.png`
    // creo il body della card e gli assegno una classe
    let pokeBody = document.createElement('div')
    pokeBody.classList.add('pokecard-body')
    // creo il titolo con nome del pkmn
    let pokeName = document.createElement('h4')
    pokeName.innerText = pokeData.name
    // creo il p con l'id del pkmn
    let pokeId = document.createElement('p')
    pokeId.innerText = `#${pokeData.id}`
    // creo il bottone e ci scrivo
    let pokeBtn = document.createElement('button')
    pokeBtn.innerText = 'info'
    pokeBtn.setAttribute("id", "info-button")
    pokeBtn.addEventListener('click', () => {
        let modal = document.getElementById('modal')
        modal.classList.remove('invisible')
        let closeIcon = document.getElementById('close-icon')
        closeIcon.addEventListener('click', () => {
            modal.classList.add('invisible')
        })
        let pokeNameModal = document.getElementById('poke-name')
        let pokeIdModal = document.getElementById('poke-id-modal')
        let pokeTypeModal = document.getElementById('poke-type')
        let pokeImgModal = document.getElementById('poke-pic')
        let pokeImgModal2 = document.getElementById('poke-pic2')
        pokeImgModal.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}.png`
        pokeImgModal2.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokeData.id}.png`
        pokeIdModal.innerHTML = `<span>ID</span>: #${pokeData.id}`
        pokeNameModal.innerHTML = `<span>NAME</span>: ${pokeData.name}`
        pokeTypeModal.innerHTML = ""
        let pTypes = `<span>TYPE</span>: ${pokeData.types[0].type.name}`
        if (pokeData.types.length == 2) {
            pTypes += ` - ${pokeData.types[1].type.name}`
        }
        pokeTypeModal.innerHTML = pTypes
        console.log(pokeData.name)
    })
    // attacco il titolo, p e bottone al body della card
    pokeBody.append(pokeId, pokeName, pokeBtn)
    // attacco img e card body alla card intera
    pokeCard.append(pokeImg, pokeBody)
    // attacco la card al file html
    pokeContainer.appendChild(pokeCard)
}

// funzione per la searchbar
function findPokemon() {
    let input = document.getElementById('searchbar').value
    let filter = input.toUpperCase()
    let cards = document.querySelectorAll('.pokecard')
    for (i = 0; i < cards.length; i++) {
        txtValue = cards[i].textContent || cards[i].innerHTML
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

// svuoto la searchbar al click sulla X dell'input type
document.getElementById("searchbar").addEventListener("search", function (event) {
    findPokemon()
});

// funzione di scroll to top
let btn = document.getElementById('to-top')
btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
})

// richiedo la fetch al caricamento della pagina
window.onload = () => {
    fetchPokemon()
}