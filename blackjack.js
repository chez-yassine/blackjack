/**
 * 
 * GAME OF BLACKJACK
 * 
 * BLACKJACK RULES:
 * All cards are at face value, except for the King, Queen and Jack which count as 10.
 * An Ace will have a value of 11 unless that would give a player or the dealer a score in excess of 21;
 * in which case, it has a value of 1. The dealer starts the game. Every player gets 2 cards, face up.
 * 
 */

/**
 * THE CARD DECK OBJECT:
 */

const cardDeck = {
    0: {src: "two-trebol.png",      val: 2},
    1: {src: "two-corazon.png",     val: 2},
    2: {src: "two-pica.png",        val: 2},
    3: {src: "two-diamante.png",    val: 2},
    4: {src: "three-trebol.png",    val: 3},
    5: {src: "three-corazon.png",   val: 3},
    6: {src: "three-pica.png",      val: 3},
    7: {src: "three-diamante.png",  val: 3},
    8: {src: "four-trebol.png",     val: 4},
    9: {src: "four-corazon.png",    val: 4},
    10: {src: "four-pica.png",      val: 4},
    11: {src: "four-diamante.png",  val: 4},
    12: {src: "five-trebol.png",    val: 5},
    13: {src: "five-corazon.png",   val: 5},
    14: {src: "five-pica.png",      val: 5},
    15: {src: "five-diamante.png",  val: 5},
    16: {src: "six-trebol.png",     val: 6},
    17: {src: "six-corazon.png",    val: 6},
    18: {src: "six-pica.png",       val: 6},
    19: {src: "six-diamante.png",   val: 6},
    20: {src: "seven-trebol.png",   val: 7},
    21: {src: "seven-corazon.png",  val: 7},
    22: {src: "seven-pica.png",     val: 7},
    23: {src: "seven-diamante.png", val: 7},
    24: {src: "eight-trebol.png",   val: 8},
    25: {src: "eight-corazon.png",  val: 8},
    26: {src: "eight-pica.png",     val: 8},
    27: {src: "eight-diamante.png", val: 8},
    28: {src: "nine-trebol.png",    val: 9},
    29: {src: "nine-corazon.png",   val: 9},
    30: {src: "nine-pica.png",      val: 9},
    31: {src: "nine-diamante.png",  val: 9},
    32: {src: "ten-trebol.png",     val: 10},
    33: {src: "ten-corazon.png",    val: 10},
    34: {src: "ten-pica.png",       val: 10},
    35: {src: "ten-diamante.png",   val: 10},
    36: {src: "jack-trebol.png",    val: 10},
    37: {src: "jack-corazon.png",   val: 10},
    38: {src: "jack-pica.png",      val: 10},
    39: {src: "jack-diamante.png",  val: 10},
    40: {src: "queen-trebol.png",   val: 10},
    41: {src: "queen-corazon.png",  val: 10},
    42: {src: "queen-pica.png",     val: 10},
    43: {src: "queen-diamante.png", val: 10},
    44: {src: "king-trebol.png",    val: 10},
    45: {src: "king-corazon.png",   val: 10},
    46: {src: "king-pica.png",      val: 10},
    47: {src: "king-diamante.png",  val: 10},
    48: {src: "ace-trebol.png",     val: 11},
    49: {src: "ace-corazon.png",    val: 11},
    50: {src: "ace-pica.png",       val: 11},
    51: {src: "ace-diamante.png",   val: 11}
}


/**
 * HTML ELEMENTS - GAME SCREEN
 */

// PLAYER INFO ON SCREEN:
let scrnPlayer = document.getElementById("player")
let scrnPlayerName = document.getElementById("playerName")
let scrnPlayerChips = document.getElementById("playerChips")
let scrnPlayerStake = document.getElementById("playerStake")

// GAME SCREEN:
let gameScreen = document.getElementById("gameScreen")
let scrnCards = document.getElementById("cards") // Add img tags with innerHTML
let scrnScore = document.getElementById("score") // update score with innerText
let scrnMssg = document.getElementById("screenMssg") // update message with innerHTML
let gameButtons = document.getElementById("gameButtons")
let gameOverBox = document.getElementById("gameOver")

// input field for setting game stake
let gameStake = document.getElementById("setStakeMenu")
let betInput = document.getElementById("betValue")

// BUTTONS:
let drawBtn = document.getElementById("drawBtn")
let newGameBtn = document.getElementById("newGameBtn")
let quitBtn = document.getElementById("quitBtn")



/**
 * ON DOCUMENT LOAD
 * Check local storage for user data
 * Set default screen values
 * Load game data
 */

// GAME CARDS ARRAYS
let handCardsImages = [] // Contains image sources of all drawn cards
let handCards = [] // Contains values of all drawn cards
let lastDrawnCard = 0
let aceWin = false // Indicates if user drew an ace as the value of 1, in that case player wins some extra points

// STAKE OPTIONS
const stakeValues = [20,50,75,100,150,250,500] // as defined in html document as option tags!

// PLAYER OBJECT
let player = {
    name: "undefined",
    chips: 440, // default start amount
    stake: stakeValues[0], // default lowest game stake
    inGame: false,
    known: false
}

function kickPlayerOut() {
    player.name = "undefined"
    player.chips = 0
    player.stake = 0
    player.inGame = false
    player.known = false
    localStorage.removeItem(lsKeys.name)
    localStorage.removeItem(lsKeys.chips)
}

// PLAYER OBJECT VALIDATION FUNCTIONS
function checkPlayerName(name) {
    var regex = /^([A-Za-z0-9]+)$/
    return regex.test(name)
}

// LOCAL STORAGE KEYS
const lsKeys = {
    name: "bjName",
    chips: "bjScore"
}

// GET VALUES FROM LOCAL STORAGE ON DOCUMENT LOAD
// Player name must be valid, if not erase local storage items
var lsInfoName = localStorage.getItem(lsKeys.name)
if(lsInfoName !== null && checkPlayerName(lsInfoName)) {
    // Local player exists, now check local score, it must be greate than minimum stake
    var lsInfoChips = localStorage.getItem(lsKeys.chips)
    if(localStorage.getItem(lsKeys.chips) !== null) {
        lsInfoChips = parseInt(lsInfoChips)
        if(lsInfoChips > stakeValues[0]) {
            // Local player valid, save to player object
            scrnPlayerName.innerText = player.name = lsInfoName
            scrnPlayerChips.innerText = player.chips = lsInfoChips
            player.known = true
            // Hide new player input field and show game screen:
            document.getElementById("newPlayer").style.display = "none"
            gameScreen.style.display = "flex"
        }
    }
}

// ON DOC LOAD, SET GAME STAKE TO LOWEST
scrnPlayerStake.innerText = betInput.value = player.stake

// Function to leave game and show start menu
// Hide all buttons, except new game button
function playerLeaveGame() {
    gameStake.style.display = "flex" // show bet menu
    newGameBtn.style.display = "block" // show new game button
    drawBtn.style.display = "none" // hide draw and quit button
    quitBtn.style.display = "none"
    scrnMssg.innerHTML = '<p>Want to play a round? 😉</p>'
    scrnCards.innerHTML = ''
    scrnScore.innerText = 0
    // RESET CARDS
    handCardsImages = []
    handCards = []
    lastDrawnCard = 0
}

// Call it on load:
playerLeaveGame()




/**
 * 
 * GAME FUNCTIONS
 * 
 */

// START THE GAME BY ENTERING PLAYER NAME (IF NO LOCAL PLAYER AVAILABLE)
// AND UPDATE PLAYER OBJECT
function newPlayer() {
    if(player.inGame === true || player.known === true) {
        return false
    }
    var newName = document.getElementById("newPlayerInput").value
    if(!checkPlayerName(newName)) {
        document.getElementById("nameInputError").style.display = "block"
        return false
    }
    // Load new player to object and local storage
    player.name = newName
    localStorage.setItem(lsKeys.name, newName)
    localStorage.setItem(lsKeys.chips, player.chips)
    player.known = true
    // Hide input field and show game screen:
    document.getElementById("newPlayer").style.display = "none"
    gameScreen.style.display = "flex"
    // Load player info on screen:
    scrnPlayerName.innerText = player.name
    scrnPlayerChips.innerText = player.chips
    scrnPlayerStake.innerText = player.stake
    console.log("New Player entered")
    console.log(player)
    return true
}


// Draw a card from the deck
// Generate a random number from 0 to 51
// Select key from deck object and push to both handCards arrays!
function drawCardFromDeck()
{
    var key = Math.floor(Math.random() * 52)
    handCards.push(cardDeck[key].val)
    handCardsImages.push(cardDeck[key].src)
    lastDrawnCard = cardDeck[key].val
    console.log("Draw card: " + cardDeck[key].src + " Value: " + cardDeck[key].val)
}


// WIN/LOSE POINTS
// increase or decrease value in local storage and update points on screen

function addPoints(x) {
    if(player.inGame === false || player.known === false) {
        return false
    }
    player.chips += x
    localStorage.setItem(lsKeys.chips, player.chips)
    scrnPlayerChips.innerText = player.chips
    return true
}

function losePoints(x) {
    if(player.inGame === false || player.known === false) {
        return false
    }
    player.chips -= x
    localStorage.setItem(lsKeys.chips, player.chips)
    scrnPlayerChips.innerText = player.chips
    return true
}


// add drawn cards from array to html element as img tags
function renderCards() {
    var images = ''
    scrnCards.classList.add("card-drawn")
    for(var i=0; i<handCardsImages.length; i++)
    {
        images += `<img src="images/${handCardsImages[i]}" alt="${handCards[i]}">`
    }
    setTimeout(() => {
        scrnCards.classList.remove("card-drawn")  
    }, 300);
    scrnCards.innerHTML = images
}


// HIGHLIGHT SCREEN SCORE ON CHANGE
function updateScreenScore(sum) {
    scrnScore.classList.add("score-change")
    scrnScore.innerText = sum
    setTimeout(() => {
        scrnScore.classList.remove("score-change")

    }, 1000);
}


/**
 * HTML ONCLICK FIRE FUNCTIONS
 */

// change bet input to radio buttons
// create changeBet() Function
// save stake to local storage


// ACTIVE PLAYER STARTS A NEW ROUND:
function playerNewGame()
{
    if(player.inGame === true || player.known === false || player.chips < stakeValues[0]) {
        return false
    }
    var bet = parseInt(betInput.value) // Select bet amount before new game
    // New bet value?
    if(player.stake !== bet && stakeValues.includes(bet)) {
        player.stake = bet
    }
    // Check if player can afford the stake amount, if not display error and return false
    if(player.stake > player.chips) {
        scrnMssg.innerHTML = '<p>You don\'t have enough chips!</p>'
        return false
    }

    // START THE GAME:
    player.inGame = true
    gameStake.style.display = "none" // hide bet menu
    quitBtn.style.display = "none" // hide quit button
    drawBtn.disabled = true // disable draw button
    scrnPlayerStake.innerText = player.stake // update stake amount on screen
    // Default screen message:
    scrnMssg.innerHTML = '<p>Draw another card? 🙂</p>'

    // RESET CARDS ARRAYS
    handCardsImages = []
    handCards = []
    drawCardFromDeck()
    drawCardFromDeck()
    var sum = handCards[0] + handCards[1]

    // If score hits 21 on the first draw end the round and add extra points to player
    if(sum === 21) {
        addPoints(player.stake * 50)
        scrnMssg.innerHTML = '<p class="won">BLACKJACK! 🔥🔥🔥 You won ' + player.stake * 50 + ' points</p>' // Show result message on screen
        quitBtn.style.display = "block" // Show quit button (newGame button is still active)
        // Render cards
        renderCards()
        updateScreenScore(sum)
        player.inGame = false
        return true
    }
    else if(sum === 22) {
        // This means first two cards are an ace (11), the second ace shall count as 1 now
        handCards[1] = 1
        lastDrawnCard = 1
        sum = handCards[0] + handCards[1]
        aceWin = true // No matter the outcome, set aceWin back to false at the and of the game!
        scrnMssg.innerHTML = '<p>Ace counts as 1 😎</p>'
    }

    // Update score to screen
    updateScreenScore(sum)
    // GAME CONTINUES
    newGameBtn.style.display = "none" // hide new game button
    drawBtn.style.display = "block" // display draw button
    player.inGame = true // set player.inGame indicator to true
    // Render cards
    renderCards()
    // timeout for game buttons
    setTimeout(() => {
        drawBtn.disabled = false // enable draw button
    }, 500);
    return true
}



function playerDraw() {
    if(player.inGame === false || player.known === false) {
        return false
    }
    // Default screen message:
    scrnMssg.innerHTML = '<p>Draw another card? 🙂</p>'
    quitBtn.style.display = "none" // hide quit button
    quitBtn.disabled = true // disable quit button
    drawBtn.disabled = true // disable draw button
    newGameBtn.disabled = true // disable new game button
    // draw card
    drawCardFromDeck()
    var sum = 0
    for(var i=0; i<handCards.length; i++) {
        sum += handCards[i]
    }
    // GAME RESULT DEPENDING ON CARD
    if(sum >= 22) {
        if(lastDrawnCard === 11) {
            // If last drawn card is an ace that would exceed 21, it counts as 1
            // Ace counts as one now
            sum -= 10
            lastDrawnCard = 1
            handCards[handCards.length - 1] = 1
            aceWin = true
            // Won by that?
            if(sum === 21) {
                // SAVED BY ACE, GAME ENDS
                addPoints(player.stake * 25)
                newGameBtn.style.display = "block" // show new game 
                quitBtn.style.display = "block" // show quit button
                drawBtn.style.display = "none" // hide draw button
                player.inGame = false
                scrnMssg.innerHTML = '<p class="lost">ACE SAVED! 😎😎😎 You won ' + player.stake * 25 + ' points!</p>'
                aceWin = false
            }
            else {
                scrnMssg.innerHTML = '<p>Ace counts as 1 😎</p>'
            }
            // GAME CONTINUES
        }
        else {
            // game lost
            losePoints(player.stake) // minus points and update chips on screen
            newGameBtn.style.display = "block" // show new game
            quitBtn.style.display = "block" // show quit button
            drawBtn.style.display = "none" // hide draw button
            player.inGame = false
            scrnMssg.innerHTML = '<p class="lost">You lost ' + player.stake + ' points 😭</p>'
            aceWin = false
        }
    }
    else if(sum === 21) {
        // Game won, blackjack!
        // Add points, distinguish between made up cases, to make it more interesting
        if(aceWin === true) {
            // Won game while drawing an ace as 1
            addPoints(player.stake * 20)
            scrnMssg.innerHTML = '<p class="won">ACE WIN ' + player.stake * 20 + ' points 😎🔥</p>'
        }
        else if(handCards.length == 4) {
            // Blackjack with 4 cards
            addPoints(player.stake * 10)
            scrnMssg.innerHTML = '<p class="won">Cool! You got blackjack ' + player.stake * 10 + ' points 😎</p>'
        }
        else if(handCards.length > 4) {
            // Blackjack with more than 4 cards
            addPoints(player.stake * 15)
            scrnMssg.innerHTML = '<p class="won">Wow! You won ' + player.stake * 15 + ' points 😱</p>'
        }
        else {
            // Normal win
            addPoints(player.stake * 5)
            scrnMssg.innerHTML = '<p class="won">You\'ve got blackjack! +' + player.stake * 5 + ' points 👏</p>'
        }
        newGameBtn.style.display = "block" // show new game
        quitBtn.style.display = "block" // show quit button
        drawBtn.style.display = "none" // hide draw button
        player.inGame = false
        aceWin = false
    }
    
    updateScreenScore(sum)
    // GAME OVER?
    if(player.chips < 1) {
        gameOverBox.style.display = "flex"
        kickPlayerOut()
    }
    // Render drawn cards:
    renderCards()
    // timeout for game buttons
    setTimeout(() => {
        quitBtn.disabled = false // enable quit button
        drawBtn.disabled = false // enable draw button
        newGameBtn.disabled = false // enable new game button
    }, 500);
}








