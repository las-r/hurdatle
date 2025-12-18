// hurdatle script v0.2.1
// by las-r on github

// constants
const MIN_YEAR_ATL = 1851;
const MIN_YEAR_PAC = 1949;
const MAX_YEAR = new Date().getFullYear();
const DATABASES = ["atl", "pac"]

// game state
let database = DATABASES[Math.floor(Math.random() * DATABASES.length)]
let season = {};
let guessesLeft = 4;
let gameOver = false;

// helper functions
function setStatus(msg) {
    document.getElementById("status").textContent = msg;
}
function endGame() {
    gameOver = true;
    document.getElementById("remaining").textContent = "";
}
function randomYear(DAT) {
    if (DAT == "atl") {
        return Math.floor(Math.random() * (MAX_YEAR - MIN_YEAR_ATL + 1)) + MIN_YEAR_ATL;
    }
    else if (DAT == "pac") {
        return Math.floor(Math.random() * (MAX_YEAR - MIN_YEAR_PAC + 1)) + MIN_YEAR_PAC;
    }
}
function loadSeason() {
    const year = randomYear(database);
    const img = document.getElementById("seasonImg");
    let url1;
    let url2;

    if (database == "atl") {
        url1 = `https://commons.wikimedia.org/wiki/Special:FilePath/${year}_Atlantic_hurricane_season_summary_map.png`;
        url2 = `https://commons.wikimedia.org/wiki/Special:FilePath/${year}_Atlantic_hurricane_season_summary.png`;
    }
    if (database == "pac") {
        url1 = `https://commons.wikimedia.org/wiki/Special:FilePath/${year}_Pacific_hurricane_season_summary_map.png`;
        url2 = `https://commons.wikimedia.org/wiki/Special:FilePath/${year}_Pacific_hurricane_season_summary.png`;
    }

    season.year = year;

    img.onerror = () => {
        if (img.src.includes("_map")) {
            img.src = url2;
        } else {
            loadSeason();
        }
    };

    img.src = url1;
}

// init
loadSeason();
document.getElementById("remaining").textContent = `Guesses left: ${guessesLeft}`;
document.getElementById("guess").focus()

// guess handler
function submitGuess() {
    if (gameOver) return;

    const input = document.getElementById("guess");
    const guess = parseInt(input.value);

    if (isNaN(guess)) {
        setStatus("Enter a valid year.");
        return;
    }

    guessesLeft--;

    if (guess == season.year) {
        setStatus("✅ Correct! You got it.");
        endGame();
        return;
    }

    if (guessesLeft == 0) {
        setStatus(`❌ Out of guesses. It was ${season.year}.`);
        endGame();
        return;
    }

    setStatus(
        guess < season.year
            ? "⬆️ The correct year is higher."
            : "⬇️ The correct year is lower."
    );

    document.getElementById("remaining").textContent = `Guesses left: ${guessesLeft}`;
    input.value = "";
}

// keypress event
document.onkeypress = function(e) {
    e = e || window.event;
    if (e.key == "Enter") {
        submitGuess();
    }
    else if (e.key == "r") {
        window.location.reload();
    }
}


