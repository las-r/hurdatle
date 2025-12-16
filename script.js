// hurdatle script v0.1
// by las-r on github

// constants
const MIN_YEAR = 1900;
const MAX_YEAR = 2025;

// game state
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
function randomYear() {
    return Math.floor(Math.random() * (MAX_YEAR - MIN_YEAR + 1)) + MIN_YEAR;
}
function loadSeason() {
    const year = randomYear();
    const img = document.getElementById("seasonImg");

    const one =
        `https://commons.wikimedia.org/wiki/Special:FilePath/${year}_Atlantic_hurricane_season_summary.png`;
    const two =
        `https://commons.wikimedia.org/wiki/Special:FilePath/${year}_Atlantic_hurricane_season_summary_map.png`;

    season.year = year;

    img.onerror = () => {
        if (!img.src.includes("_map")) {
            img.src = two;
        } else {
            loadSeason();
        }
    };

    img.src = one;
}

// init
loadSeason();
document.getElementById("remaining").textContent =
    `Guesses left: ${guessesLeft}`;

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

    if (guess === season.year) {
        setStatus("✅ Correct! You got it.");
        endGame();
        return;
    }

    if (guessesLeft === 0) {
        setStatus(`❌ Out of guesses. It was ${season.year}.`);
        endGame();
        return;
    }

    setStatus(
        guess < season.year
            ? "⬆️ The correct year is higher."
            : "⬇️ The correct year is lower."
    );

    document.getElementById("remaining").textContent =
        `Guesses left: ${guessesLeft}`;
    input.value = "";
}