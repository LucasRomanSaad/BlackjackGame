let player = {
    name: "",
    
}

let dealer = {
    name: "Dealer"
}

let cards = []
let playerCards = []
let dealerCards = []
let playerSum = 0
let dealerSum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let playerSumEl = document.getElementById("player-sum-el")
let dealerSumEl = document.getElementById("dealer-sum-el")
let playerCardsEl = document.getElementById("player-cards-el")
let dealerCardsEl = document.getElementById("dealer-cards-el")
let playerEl = document.getElementById("player-el")



function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    let firstPlayerCard = getRandomCard()
    let secondPlayerCard = getRandomCard()
    playerCards = [firstPlayerCard, secondPlayerCard]
    playerSum = firstPlayerCard + secondPlayerCard

    let firstDealerCard = getRandomCard()
    dealerCards = [firstDealerCard,]
    dealerSum = firstDealerCard 

    
    document.getElementById("new-card-button").disabled = false;

    renderGame()
}


function renderGame() {
    playerCardsEl.textContent = "Player's Cards: "
    for (let i = 0; i < playerCards.length; i++) {
        playerCardsEl.textContent += playerCards[i] + " "
    }
    playerSumEl.textContent = "Player's Sum: " + playerSum

    dealerCardsEl.textContent = "Dealer's Cards: "
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.textContent += dealerCards[i] + " "
    }
    dealerSumEl.textContent = "Dealer's Sum: " + dealerSum

    if (playerSum <= 21) {
        if (playerSum === 21 && playerCards.length === 2) {
            message = "Blackjack! You win!"
        } else if (dealerSum > 21) {
            message = "Dealer busts! You win!"
        } else if (dealerSum === playerSum) {
            message = "It's a draw!"
        } else if (playerSum > dealerSum) {
            message = "You win!"
        } else {
            message = "Dealer wins!"
        }
    } else {
        message = "You bust! Dealer wins!"
        document.getElementById("new-card-button").disabled = true; // Disables the button
    }

    if (isAlive && !hasBlackJack && message !== "You bust! Dealer wins!") {
        message = "Do you want to draw a new card?"
    }

    messageEl.textContent = message

}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        playerSum += card
        playerCards.push(card)
        renderGame()        
    }
}

function hold() {
    if (isAlive === true && hasBlackJack === false) {
        while (dealerSum < 17) {
            let newDealerCard = getRandomCard()
            dealerCards.push(newDealerCard)
            dealerSum += parseInt(newDealerCard)
            renderGame()
        }
        if (dealerSum > 21) {
            message = "Dealer busts! You win!"
        } else if (dealerSum > playerSum) {
            message = "Dealer wins!"
        } else if (dealerSum < playerSum) {
            message = "You win!"
        } else {
            message = "It's a draw!"
        }
        isAlive = false
        messageEl.textContent = message

       
    }
}

