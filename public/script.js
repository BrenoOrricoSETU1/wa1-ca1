
//Here I wanted a yearly-updating date on my Footer, found the information on Stack Overflow: 
// https://stackoverflow.com/questions/20846264/dynamically-change-the-year-when-calculating-date-ranges-using-javascript
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.innerText = `© ${new Date().getFullYear()}`;
}

//Getting elements from the page
const carousel = document.getElementById("featuredCarousel");
const leftBtn = document.querySelector(".carousel-arrow.left");
const rightBtn = document.querySelector(".carousel-arrow.right");

//The element listen sets up a function that will be called whenever the specified event is delivered to the target. If the user clics the button, something will happen, in this case, it will move the carousel
if (carousel && leftBtn && rightBtn) {
    //here is to define how far the carousel moves
  const scrollAmount = 360;

  leftBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  rightBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
}

//As seemed in class that's the alert button. I wanted to warn the user that The Phantom of the Opera is celebrating its 40th this year. Then I might have to take this out next year, or change 40 to 41...
function showLondonMessage(event) {
  event.preventDefault();

  alert("The Phantom of the Opera is celebrating its 40th year. It is definitely worth having a look!");

  window.location.href = "/region/london";
}

//Activating rating option
$('.ui.rating').rating();

function toggleEdit(button) {
  const card = button.closest('.ui.card');

  const display = card.querySelector('.display-mode');
  const edit = card.querySelector('.edit-mode');

  display.classList.toggle('hide');
  edit.classList.toggle('hide');
}

function toggleEdit(button) {
  const card = button.closest('.ui.card');

  const display = card.querySelector('.display-mode');
  const edit = card.querySelector('.edit-mode');

  display.classList.toggle('hide');
  edit.classList.toggle('hide');
}