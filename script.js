const cardsContainer = document.getElementById('cards-container'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
currentEl = document.getElementById('current'),
showBtn = document.getElementById('show'),
hideBtn = document.getElementById('hide'),
questionEl = document.getElementById('question'),
answerEl = document.getElementById('answer'),
addCardBtn = document.getElementById('add-card'),
clearBtn = document.getElementById('clear'),
addContainer = document.getElementById('add-container');

//  Let know the current card
let currentActiveCard = 0;

//  Store DOM Cards
const cardsEl = [];

//  Store Card Data
const cardsData = [
  {
    question: 'Lorem 10',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, provident?'
  },
  {
    question: 'Lorem 20',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et animi cumque voluptate soluta architecto asperiores error dolorum unde rem dolor.'
  },
  {
    question: 'Lorem 30',
    answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos laborum sapiente magnam, est error sint dolore, hic laudantium suscipit quo inventore ipsum natus? Officiis numquam repudiandae cumque facilis sunt porro.'
  }
];

//   Create All Cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index) )
}

// Create Single Card in DOM

function createCard(data, index) {
  const card = document.createElement('div');

  card.classList.add('card');

  // Adding active class on the first card
  if(index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>
          ${data.question}
        </p>
      </div>
      <div class="inner-card-back">
        <p style="text-align: center">
          ${data.answer}
        </p>
      </div>
    </div>
  `;

  //  Click to flip the card

  card.addEventListener('click', () => {
    card.classList.toggle('show-answer');
  })

  //  Add to DOM Cards

  cardsEl.push(card);
  cardsContainer.appendChild(card);
  
  //  Update pagination
  updateCurrentText()

}

//  Update Current Pagination (Show number of cards and current card) will be called in craete card
function updateCurrentText() {
  currentEl.innerText = `
    ${currentActiveCard + 1 } / ${cardsEl.length}
  `;
}

createCards();