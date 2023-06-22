let words = [
    "chien", "lapin", "rivet", "table", "yeux",
    "fleur", "grêle", "magie", "nuage", "poule",
    "zèbre", "japon", "chaton", "lampe", "plage",
    "anima", "piano", "pomme", "outil", "coeur",
    "ailes", "boule", "tigre", "mince", "voile",
    "sangs", "ombre", "paume", "piste", "vague",
    "sonde", "turbo", "écran", "magma", "agave",
    "bison", "chêne", "décou", "ferme", "gazon",
    "huile", "ivoire", "jaune", "kendo", "lagon",
    "moust", "neige", "ozone", "plume", "quota",
    "renne", "serpe", "tango", "usage", "valse",
    "whisky", "xylo", "yacht", "zeste", "abric",
    "baume", "cacao", "delta", "esprit", "farce",
    "givre", "harpe", "indus", "jante", "koala",
    "laine", "maire", "nacre", "oursin", "pêche",
    "quand", "ratat", "saule", "tison", "usage",
    "vigne", "wagon", "xylog", "yucca", "zebra",
    "ancho", "balai", "chien", "drape", "echec",
    "fleur", "gazon", "héros", "inert", "jouet",
    "koala", "laine", "maire", "nacre", "outil",
    "piste", "quand", "ratat", "sable", "tango",
    "usage", "voile", "wagon", "xylog", "yacht",
    "zeste", "agave", "bague", "cacao", "delta",
    "esprit", "farce", "givre", "harpe", "indus",
    "jante", "koala", "laine", "maire", "nacre",
    "oursin", "pêche", "quand", "ratat", "saule",
    "tison", "usage", "vigne", "whisky", "xylo",
    "yucca", "zebra", "ancho", "balai", "chien",
    "drape", "echec", "fleur", "gazon", "héros",
    "inert", "jouet", "koala", "laine", "maire",
    "nacre", "outil", "piste", "quand", "ratat",
    "saule", "tison", "usage", "vigne", "wagon",
    "xylog", "yucca", "zebra"
];

let used_words = [];
let nb_errors = 10;

function get_random_word() {
    if (words.length === 0) {
        words = [...used_words];
        used_words = [];
    }
    let random_index = Math.trunc(Math.random() * words.length);
    let word = words[random_index];
    used_words.push(word);
    words.splice(random_index, 1);
    return word;
}

function resetGame() {
    used_words = [];
    nb_errors = 10;
    nb_letters_found = 0;
    letters_already_pressed = [];
    document.querySelector("#result").innerHTML = "";
    display_nberrors();
    document.body.removeEventListener("keyup", search_if_letter_is_in_word);
    document.querySelector("#message").innerText = "";
    document.querySelector("#result").innerHTML = "";
    document.querySelector("#message1").style.backgroundImage = "";

}

function select_a_word() {
    if (used_words.length > 0) {
        resetGame();
    }

    document.body.removeEventListener("keyup", search_if_letter_is_in_word);
    document.body.addEventListener("keyup", search_if_letter_is_in_word);

    let word = get_random_word();
    document.querySelector("#result").innerHTML = "";

    for (letter of word) {
        const newSpan = document.createElement("span");
        newSpan.classList.add("letter");
        newSpan.setAttribute("data-letter", letter.toLowerCase());
        document.querySelector("#result").appendChild(newSpan);
    }
}

function display_nberrors() {
    document.querySelector("#nb_errors").innerText = nb_errors;
    if (nb_errors === 0) {
        document.body.removeEventListener("keyup", search_if_letter_is_in_word);
        document.querySelector("#message").innerText = "Vous avez perdu !";
        document.querySelector("#message1").style.backgroundImage = "url(game-over.png)";


    }
}

let nb_letters_found = 0;
let letters_already_pressed = [];

const search_if_letter_is_in_word = (event) => {
    let letter_pressed = event.key.toLowerCase();

    let cells = document.querySelectorAll(".letter");

    // Je vérifie que ce n'est pas une lettre déjà recherchée au préalable.
    if (!letters_already_pressed.includes(letter_pressed)) {
        letters_already_pressed.push(letter_pressed);

        let found = false;
        for (let cell of cells) {
            if (cell.getAttribute("data-letter") == letter_pressed) {
                cell.innerHTML = letter_pressed;
                found = true;
                nb_letters_found++;
            }
        }
        if (!found && nb_errors > 0) {
            nb_errors--;
        }
    }

    console.log(nb_letters_found, "VS", cells.length);
    if (nb_letters_found === cells.length) {
        document.body.removeEventListener("keyup", search_if_letter_is_in_word);
        document.querySelector("#message").innerText = "Vous avez gagné !";
        document.querySelector("#message1").style.backgroundImage = "url(win.png)";
    }

    display_nberrors();
};

document.querySelector("#generate").addEventListener("click", select_a_word);
