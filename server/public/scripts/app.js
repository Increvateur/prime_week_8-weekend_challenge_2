$(document).ready(function(){
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        startCarousel(data);
      }
    });

    // Setting up the click events
    $(".main").on('click', '.next', buttonSwitch);
    $(".main").on('click', '.previous', buttonSwitch);
    $(".main").on('click', '.circle', circleSwitch);
});

// Initializing variables
var arrayKappa;
var currentPerson = 1;
var timeCounter = setInterval(switchTimer, 10000);

// Starts the Kappa Cohort Carousel
function startCarousel(data) {
  fillKappaArray(data);
  displayInfo();
  $(".header").hide();
  $(".main").hide();
  createButtons();
  $(".header").slideDown();
  $(".main").delay(1000).slideDown();
}

// Fills out the array with the returned data from the AJAX call
function fillKappaArray(data){
  arrayKappa = data.kappa;
  return arrayKappa;
}

// Displays the initial information to the DOM
function displayInfo() {
  $(".main").append('<div class="display"></div>');

  var $el = $(".main").children().last();
  $el.append('<h2 class="name">' + arrayKappa[currentPerson - 1].name + '</h2>');
  $el.append('<h3 class="location">Location: <span id="location-text">' + arrayKappa[currentPerson - 1].location + '</span></h3>');
  $el.append('<h3 class="spirit-animal">Spirit Animal: <span id="spirit-animal-text">' + arrayKappa[currentPerson - 1].spirit_animal + '</span></h3>');
  $el.append('<h3 class="shout-out">\"' + arrayKappa[currentPerson - 1].shoutout + '\"</h3>');
}

// Creates the buttons used for the Kappa Carousel
function createButtons() {
  $(".main").append('<div class="button-panel"></div>');
  var $el = $(".main").children().last();
  $el.append('<button class="btn previous">Previous</button>');
  $el.append('<button class="btn next">Next</button>');
  $el.append('<p></p>');

  for (var i = 1; i <= arrayKappa.length; i++) {
    var $el = $(".main").children().last();
    $el.append('<div class="circle' + [i] + ' circle"></div>');
  }
  $(".circle" + currentPerson).toggleClass("circleHighlight");
}

// Checks the position of the current person and switches accordingly
// when a button is pressed
function buttonSwitch() {
  var buttonDirection = $(this).attr("class");
  if (buttonDirection == "btn previous" && currentPerson == 1) {
    var previousPerson = currentPerson;
    currentPerson = arrayKappa.length;
  } else if (buttonDirection == "btn next" && currentPerson == arrayKappa.length) {
    var previousPerson = currentPerson;
    currentPerson = 1;
  } else if (buttonDirection == "btn next") {
    var previousPerson = currentPerson;
    currentPerson++;
  } else {
    var previousPerson = currentPerson;
    currentPerson--;
  }
  circleSwitch("button", previousPerson);
  return currentPerson;
}

// Switches the row of circles to the current person
function circleSwitch(input, number) {
  if (input == "button" || input == "timer") {
    $(".circle" + number).removeClass("circleHighlight");
  } else {
    var currentCircle = $(this).attr("class");
    if (currentCircle == "circle" + currentPerson + " circle circleHighlight") {
      return;
    } else {
      $(".circle" + currentPerson).removeClass("circleHighlight");
      var findValue = currentCircle.replace("circle", "");
      currentPerson = parseInt(findValue);
    }
  }
  $(".circle" + currentPerson).toggleClass("circleHighlight");
  $(".display").fadeOut(1000, updateDisplay);
  timerReset();
  return currentPerson;
}

// Initiates when the timer counts down
function switchTimer() {
  if (currentPerson == arrayKappa.length) {
    var previousPerson = currentPerson;
    currentPerson = 1;
  } else {
    var previousPerson = currentPerson;
    currentPerson++;
  }
  circleSwitch("timer", previousPerson);
  return currentPerson;
}

// Updates the display information for each person
function updateDisplay() {
  $("h2.name").replaceWith('<h2 class="name">' + arrayKappa[currentPerson - 1].name + '</h2>');
  $("h3.location").replaceWith('<h3 class="location">Location: <span id="location-text">' + arrayKappa[currentPerson - 1].location + '</span></h3>');
  $("h3.spirit-animal").replaceWith('<h3 class="spirit-animal">Spirit Animal: <span id="spirit-animal-text">' + arrayKappa[currentPerson - 1].spirit_animal + '</span></h3>');
  $("h3.shout-out").replaceWith('<h3 class="shout-out">\"' + arrayKappa[currentPerson - 1].shoutout + '\"</h3>');
  $(".display").fadeIn(1000);
  return;
}

// Resets the timer when a button is pressed
function timerReset() {
  clearInterval(timeCounter);
  timeCounter = setInterval(switchTimer, 10000);
}
