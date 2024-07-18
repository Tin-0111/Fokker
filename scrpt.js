document.addEventListener('DOMContentLoaded', () => {
    const dealButton = document.getElementById('deal-button');
    const betButton = document.getElementById('bet-button');
    const playerHand = document.getElementById('player-hand');
    const betAmountInput = document.getElementById('bet-amount');

    let playerCards = [];
    let playerChips = 1000;

    function createDeck() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const deck = [];

        for (let suit of suits) {
            for (let value of values) {
                deck.push(`${value} of ${suit}`);
            }
        }

        return deck;
    }

    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    function dealCards() {
        const deck = shuffleDeck(createDeck());
        playerCards = deck.slice(0, 5);
        displayPlayerCards();
    }

    function displayPlayerCards() {
        playerHand.innerHTML = '';
        playerCards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.textContent = card;
            playerHand.appendChild(cardElement);
        });
    }

    function bet() {
        const betAmount = parseInt(betAmountInput.value, 10);
        if (betAmount > 0 && betAmount <= playerChips) {
            playerChips -= betAmount;
            alert(`You bet ${betAmount} chips. You have ${playerChips} chips left.`);
        } else {
            alert('Invalid bet amount.');
        }
    }

    dealButton.addEventListener('click', dealCards);
    betButton.addEventListener('click', bet);
});
