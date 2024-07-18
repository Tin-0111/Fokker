document.addEventListener('DOMContentLoaded', () => {
    const dealButton = document.getElementById('deal-button');
    const betButton = document.getElementById('bet-button');
    const playerHand = document.getElementById('player-hand');
    const betAmountInput = document.getElementById('bet-amount');
    const playerChipsDisplay = document.getElementById('player-chips');

    let playerCards = [];
    let playerChips = 1000;

    const suits = {
        'hearts': '♥',
        'diamonds': '♦',
        'clubs': '♣',
        'spades': '♠'
    };

    function createDeck() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const deck = [];

        for (let suit of suits) {
            for (let value of values) {
                deck.push({ value, suit });
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
            cardElement.className = `card ${card.suit}`;
            cardElement.textContent = `${card.value}${suits[card.suit]}`;
            playerHand.appendChild(cardElement);
        });
    }

    function bet() {
        const betAmount = parseInt(betAmountInput.value, 10);
        if (betAmount > 0 && betAmount <= playerChips) {
            playerChips -= betAmount;
            playerChipsDisplay.textContent = `보유 칩: ${playerChips}`;
            alert(`베팅 금액: ${betAmount} 칩. 남은 칩: ${playerChips} 칩.`);
        } else {
            alert('유효한 베팅 금액이 아닙니다.');
        }
    }

    dealButton.addEventListener('click', dealCards);
    betButton.addEventListener('click', bet);
});