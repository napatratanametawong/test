//Journey
document.addEventListener("DOMContentLoaded", function() {
  const moreButtons = document.querySelectorAll('.more_btn');
  
  moreButtons.forEach(function(button) {
    
      button.addEventListener('click', function() {
          const card = this.closest('.card');
          
          const moreText = card.querySelector('.more_text');
          if (moreText) {
              moreText.classList.toggle('active');
          }

          const icon = card.querySelector('.ri-add-large-line');
          if (icon) {
              icon.classList.toggle('active');
          }

      });

  });

});



//Homepage
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
//slider member
let items = document.querySelectorAll('.card-slider .card-item');
let next = document.getElementById('right');
let prev = document.getElementById('left');
    
let active = 3;
function loadShow(){
    let stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    for(var i = active + 1; i < items.length; i++){
    stt++;
    items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
    stt = 0;
    for(var i = active - 1; i >= 0; i--){
        stt++;
        items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}
loadShow();
next.onclick = function(){
    active = active + 1 < items.length ? active + 1 : active;
    loadShow();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow();
}

//form guest book
//validate data input in guest book
  // Function validate fullname
  function validateName() {
    const fullnameInput = document.getElementById("fullname");
    const names = fullnameInput.value.trim().split(" ");
    const errorElement = document.getElementById("fullnameError");
  
    if (names.length !== 2 || names[0] === "" || names[1] === "") {
      errorElement.textContent = "Please enter only first name and last name, separated by spaces."; //Show a message when the user enters invalid information.
      return false;
    } 
    else {
      errorElement.textContent = ""; // Clear the error message when valid
    }
    return true;
}
document.getElementById("fullname").addEventListener("input", validateName); // Event listeners for input name

// Function validate Email
function validateEmail() {
    const emailInput = document.getElementById("email");
    const emailValue = emailInput.value.trim();
    console.log("Email Input:", emailValue); // Check the values received.

    const emailPattern = /^.+@dome\.tu\.ac\.th$/;
    const errorElement = document.getElementById("emailError");

    if (!emailPattern.test(emailValue)) {
      errorElement.textContent = "Please enter your university email in this format 'aaa.bbb@dome.tu.ac.th'.";
      console.log("Validation Failed"); // Check email meet the specified conditions.
      return false;
    } 
    else {
      errorElement.textContent = ""; // Clear the error message when valid
      console.log("Validation Passed"); // Check email through verification
    }
    return true;
}
document.getElementById("email").addEventListener("input", validateEmail); // Event listeners for input email

// star rating
function getStarRating(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? '★' : '☆'; 
  }
  return stars;
}
function getSelectedRating() {
  const selectedStar = document.querySelector('.rating input:checked');
  if (selectedStar) {
    return parseInt(selectedStar.id.replace('star', ''));
  }
  return 0; 
}

// Function to submit the form
async function submitForm(event) {
    event.preventDefault();
  
    // Validate form inputs before submission
    if (!validateName() || !validateEmail()) {
      //alert when user input invalid data
      Swal.fire({
        icon: 'error',
        title: 'Invalid data!!',
        text: 'Please fill in the information correctly before submitting.',
        confirmButtonText: 'OK'
      });
      return;
    }
    Swal.fire({
      icon: 'success',
      title: 'Thank you!',
      text: 'Your comment has been successfully submitted',
      confirmButtonText: 'OK'
    }).then(() => {
      displayComment(); // Call function to display comment
    });
}
// Event listener submission form
document.getElementById("myForm").addEventListener("submit", submitForm);

//display all comments in comment container
// Select the form element and the comment container
function displayComment() {
  const form = document.querySelector('#myForm');
  const commentContainer = document.getElementById('commentContainer');

  // Get user input values
  const fullname = document.querySelector('#fullname').value;
  const email = document.querySelector('#email').value;
  const date = document.querySelector('#date').value;
  const topic = document.querySelector('#topic').value;
  const comment = document.querySelector('#comment').value;
  const rating = getSelectedRating(); 
  const starDisplay = getStarRating(rating); 
  // Create a new comment element
  const newComment = document.createElement('div');
  newComment.className = 'user-comment';
  newComment.innerHTML = `
      <p><strong>Name:</strong> ${fullname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Topic:</strong> ${topic}</p>
      <p><strong>Rating:</strong> ${starDisplay}</p>
      <p><strong>Your comment:</strong> ${comment}</p>
       
      <hr>
  `;
 
  // Append the new comment to the comment container
  commentContainer.appendChild(newComment);

  // Clear the form inputs after submit
  form.reset();

  // Clear rating stars after submit
  const stars = document.querySelectorAll('.rating input[type="radio"]');
  stars.forEach((star) => {
    star.checked = false; // Uncheck all selected stars
  });
}
