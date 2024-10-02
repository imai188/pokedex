const pokedex = document.getElementById("pokedex");
// ポケモンAPIからデータを取得
const fetchPokemon = async() => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=200`;
        const res = await fetch(url);
        
        if (!res.ok) {
        // エラーレスポンスが返された時の処理
            throw new Error(`Failed to get Pokémon information.: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        // ポケモンデータを配列にして保存
        const pokemon = data.results.map((result, index) => ({
            ...result,
            id: index + 1,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +1 }.png`
        }));

        displayPokemon(pokemon);
    } catch (error) { //発生したエラーに関する情報を受け取り処理する
      console.error("An error happened.:", error);
      // エラーメッセージを表示する
      pokedex.innerHTML = "<p>Failed to get Pokémon information.</p>";
    }
};

const displayPokemon = (pokemon) => { 
    const pokemonHTMLString = pokemon.map( pokeman => ` 
        <li class="card" onclick="selectPokemon(${pokeman.id})"> 
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        </li>
    `).join('');//ポケモン全てHTML形式にしリストにする

    pokedex.innerHTML = pokemonHTMLString;
};

//ポケモン詳細を取得し表示
const selectPokemon = async (id) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url); 

        if (!res.ok) {
            throw new Error(`Failed to get Pokémon information.: ${res.status} ${res.statusText}`);
        }

        const pokeman = await res.json();
        displayPopup(pokeman); //ポップアップでポケモン詳細表示
        setTimeout(() => {
            displayFavoritePokemonImage(favoritePokemon.find(p => p.name === "Dedenne"));
        }, 3000);
    } catch (error) { //発生したエラーに関する情報を受け取り処理する
        console.error("An error happened.:", error);
    }
};

//ポップアップでポケモン詳細を表示する関数
const displayPopup = (pokeman) => {
    const type = pokeman.types.map( type => type.type.name).join(', ');
    const image = pokeman.sprites['front_default'];
    const htmlString = `
        <div class= "popup">
            <button id="closeBtn" onclick="closePopup()">CLOSE</button>
            <div class="card"> 
                <img class="card-image" src="${image}"/>
                <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
                <p><small>Height: </small>${pokeman.height} | <small>Weight: </small>${pokeman.weight} | <small>Type: </small>${type}</p>
            </div>
        </div>
    `;

    pokedex.innerHTML = htmlString + pokedex.innerHTML;
    console.log(htmlString);
};
//ポップアップ閉じる関数
const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}
//5匹のポケモンデータ表示する関数
const favoritePokemon = [
    { name: "Tinkaton", id: 957, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/957.png" },
    { name: "Mimikyu", id: 778, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/778.png" },
    { name: "Dedenne", id: 702, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/702.png" },
    { name: "Togepi", id: 175, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/175.png" },
    { name: "Pikachu", id: 25, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" }
];
//ポケモンを表示する関数
const displayFavoritePokemon = () => {
    const favoritePokemonContainer = document.getElementById("favoritePokemon");
    const favoriteHTMLString = favoritePokemon.map(poke => `
        <div class="favorite-card">
            <img class="favorite-image" src="${poke.image}" />
        </div>
    `).join('');
    favoritePokemonContainer.innerHTML = favoriteHTMLString;
};
//デデンネをポップアップで表示する関数
const displayFavoritePokemonImage = (pokeman) => {
    const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">CLOSE</button>
            <div class="card">
                <div class="popup-text-2">⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡</div>
                <div class="popup-text">⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡</div> 
                <img class="card-image" src="${pokeman.image}" />
                <div class="popup-text">⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡</div> 
                <div class="popup-text-2">⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡</div>
            </div>
        </div>
    `;

    const popupContainer = document.querySelector('.popup');
    if (popupContainer) {
        popupContainer.remove();
    }
    pokedex.innerHTML = htmlString + pokedex.innerHTML;

};


displayFavoritePokemon();
fetchPokemon();


