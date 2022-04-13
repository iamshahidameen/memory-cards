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
// const cardsData = [
//   {
//     question: 'Lorem 10',
//     answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, provident?'
//   },
//   {
//     question: 'Lorem 20',
//     answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et animi cumque voluptate soluta architecto asperiores error dolorum unde rem dolor.'
//   },
//   {
//     question: 'Lorem 30',
//     answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos laborum sapiente magnam, est error sint dolore, hic laudantium suscipit quo inventore ipsum natus? Officiis numquam repudiandae cumque facilis sunt porro.'
//   },
//   {
//     question: 'Lorem 40',
//     answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos laborum sapiente magnam, est error sint dolore, hic laudantium suscipit quo inventore ipsum natus? Officiis numquam repudiandae cumque facilis sunt porro.'
//   }
// ];

//  Get cards from local storage

const cardsData = getCardsData();


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

// Get Cards from local storage

function getCardsData(){
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}
//  Set Cards data in Localstorage

function setCardData(cards){
  localStorage.setItem('cards', JSON.stringify(cards));

}

createCards();

// Event listners for next and previous button (Slider)

nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';
  currentActiveCard += 1; 

  if(currentActiveCard > cardsEl.length - 1 ){
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
})
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';
  currentActiveCard -= 1; 

  if(currentActiveCard < 0 ){
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
})

//  Show/Hide Add Cards container 

showBtn.addEventListener('click', () => {
  addContainer.classList.add('show');
})

hideBtn.addEventListener('click', () => {
  addContainer.classList.remove('show');
})



//  Add card (Q&A) by clicking add card

addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if(question.trim() && answer.trim()){
    // ES6 Destructuring method
    const newCard = {question, answer};

    createCard(newCard);

    //  Empty the fields 
    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardData();
  }
})

clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});