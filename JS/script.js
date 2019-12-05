// declared variables
const jobRole = $('#title');
const otherJobRole = $('#other-title');
const tshirtDesign = $('#design');
const tshirtColor = $('#colors-js-puns');
const selectTheme = $('#select-theme');
const design = $('select#design');
const colorOptions = $('select#color option');
const paymentOption = $('#payment');
const paymentCC = $('#credit-card');
const paymentPayPal = $('#paypal');
const paymentBitCoin = $('#bitcoin');

// set focus on the first text field
$(document).ready(function () {
  $('#name').focus();

  // hides other job role input field before called
  otherJobRole.hide();
  paymentCC.hide();
  paymentPayPal.hide();
  paymentBitCoin.hide();
});



// hides the color dropdown until a design theme is chosen
// tshirtColor.hide();

// hides activity error message
$('#select-activity').hide();

// set credit card as default display
$('#credit-card').show();
$('#paypal').hide();
$('#bitcoin').hide();
$('#payment').val('Credit Card');
$('option[value="select method"]').attr('disabled', true);



//      ---------------- Job Role -----------------------
// Include a text field that will be revealed when the 'Other' option is selected from the 'Job Role' drop down menu. If 'Other' selected in job role drop down, show other-title input field
$(jobRole).change(function () {
  if (jobRole.val().toLowerCase() === 'other') {
    otherJobRole.show();
  } else {
    otherJobRole.hide();
  }
});

//    ------------------- T-Shirt Info ----------------------
// Do not show the t-shirt color options until the user selects a design, and then show only the relevant t-shirt color options, with the first options selected

design.change(e => {
  // Hide the color div and color options
  tshirtColor.hide();
  colorOptions.hide();

  console.log("e: ", tshirtDesign.val());


  // findOptions -->  collection of items containing
  function findOptions(element, text) {
    return element.filter(function (index, item) {
      const passes = $(this).text().indexOf(text) > 0;
      return passes;
    });
  }
  // user selects 'js puns' designs --> show the puns colors
  if (tshirtDesign.val().toLowerCase() === 'js puns') {
    console.log("js puns: ", tshirtDesign.val());

    // show the color section
    tshirtColor.show();
    // display first option pre-selected
    findOptions(colorOptions, 'puns').show().first().prop('selected', true);
    // user selects the 'heart js' designs --> show the heart colors
  } else if (tshirtDesign.val().toLowerCase() === 'heart js') {
    tshirtColor.show();
    // display first option pre-selected
    findOptions(colorOptions, 'heart').show().first().prop('selected', true);
  };
})


// ---------- Register for Activities” section ---------
// User should not be able to choose events that conflict with one another. Disable/enable depending on checkboxes. As a user selects activities, a running total should display below the list of checkboxes

$(".activities").on("click", function () {
  let total = 0;
  if ($("input[name='all']").is(":checked")) {
    total += 200;
  }
  if ($("input[name='js-frameworks']").is(":checked")) {
    total += 100;
    $("input[name='express']").attr("disabled", true);
  } else {
    $("input[name='express']").attr("disabled", false);
  }
  if ($("input[name='js-libs']").is(":checked")) {
    total += 100;
    $("input[name='node']").attr("disabled", true);
  } else {
    $("input[name='node']").attr("disabled", false);
  }
  if ($("input[name='express']").is(":checked")) {
    total += 100;
    $("input[name='js-frameworks']").attr("disabled", true);
  } else {
    $("input[name='js-frameworks']").attr("disabled", false);
  }
  if ($("input[name='node']").is(":checked")) {
    total += 100;
    $("input[name='js-libs']").attr("disabled", true);
  } else {
    $("input[name='js-libs']").attr("disabled", false);
  }

  if ($("input[name=build-tools]").is(":checked")) {
    total += 100;
  }
  if ($("input[name=npm]").is(":checked")) {
    total += 100;
  }
  totalPrice(total);
});

// running total function --> adds content total to html
function totalPrice(total) {
  if (typeof total !== 0) {
    $("#totalDiv").remove();
    $(".activities").append("<div id='totalDiv'><strong>Total: $" + total + "</strong></div>");
  } else {
    $("#totalDiv").remove();
  }
}



// ---------------- "Payment Info" section ---------------
// Display payment sections based on the payment option chosen in the select menu. Hide of display information depending on user selection.

//event listener for payment section
$('#payment').on('change', function() {
  $('option[value="select method"]').hide();
  if ($('#payment').val().toLowerCase() === 'credit card') {
    $('#credit-card').show();
    $('#paypal').hide();
    $('#bitcoin').hide();
  } else if ($('#payment').val().toLowerCase() === 'paypal') {
    $('#credit-card').hide();
    $('#paypal').show();
    $('#bitcoin').hide();
  } else if ($('#payment').val().toLowerCase() === 'bitcoin') {
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').show();
  }
})

// --------------- Form Validation & Messages ---------------------
// validate fields. if errors exist, prevent the user from submitting the form. Provide indication when there’s a validation error.


// name
function checkName() {
  let nameRegex = /^[a-zA-Z]+$/;
  if (nameRegex.test($('#name').val())) {
    return true;
  } else {
    return false;
  }
}

// email
function checkEmail() {
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
  if (emailRegex.test($('#mail').val())) {
    return true;
  } else {
    return false;
  }
}

// credit card number
function checkCreditCard() {
  const creditCardRegex = /^\d{4}([ \-]?)((\d{6}\1?\d{5})|(\d{4}\1?\d{4}\1?\d{4}))$/gm;
  if (creditCardRegex.test($('#cc-num').val())) {
    return true;
  } else {
    return false;
  }
}
// zip
function checkZip() {
  let zipRegex = /^[0-9]{5}$/;
  if (zipRegex.test($('#zip').val())) {
    return true;
  } else {
    return false;
  }
}

// cvv
function checkCvv() {
  let cvvRegex = /^[0-9]{3}$/;
  if (cvvRegex.test($('#cvv').val())) {
    return true;
  } else {
    return false;
  }
}
console.log(checkCvv);

// activities
function checkActivities() {
  if ($('input[type=checkbox]:checked').length < 1) {
    return false;
  } else {
    return true;
  }

}



// function to run all validations
function checkForm() {
  if ($('#payment').val() === 'Credit Card') {
    if (checkName() && checkEmail() && checkActivities() && (checkCreditCard() && checkCreditCard() !== -1) && checkZip() && checkCvv()) {
      return true;
    } else {
      return false;
    }
  } else {
    if (checkName() && checkEmail() && checkActivities()) {
      return true;
    } else {
      return false;
    }
  }
}



//function to display validation messages
function errorMessages() {
  if (!checkName()) {
    $('label[for="name"]').text('Please enter your name.').css('color', 'red');
  };

  if (!checkEmail()) {
    $('label[for="mail"]').text('Please enter a valid email address.').css('color', 'red');
  };

  if (!checkActivities()) {
    $('label[for="checkbox"]').text('Please select activities').css('color', 'red');
    console.log("hello")
/*   };
    $('#select-activity').show();
    $('#select-activity').css('color', 'red'); */
  }

  if ($('#payment').val() === 'Credit Card') {
    if (!checkCreditCard()) {
      $('label[for="cc-num"]').text('Please enter a valid credit card number').css('color', 'red');
    } else if (checkCreditCard() === -1) {
      $('label[for="cc-num"]').text('Please enter a valid credit card number').css('color', 'red');
    };

    if (!checkZip()) {
      $('label[for="zip"]').text('Enter the Zip-code.').css('color', 'red');
    };

    if (!checkCvv()) {
      $('label[for="cvv"]').text('Enter a 3 digit CVV').css('color', 'red');
    };
  }
}



// event listeners for fields

// name
$('#name').on('focusout', function () {
  if (!checkName()) {
    $('label[for="name"]').text('Please enter your name').css('color', 'red');
  } else {
    $('label[for="name"]').text('Name:').css('color', 'black')
  }
})

// email
$('#mail').on('focusout', function () {
  if (!checkEmail()) {
    $('label[for="mail"]').text('Please enter a valid email address').css('color', 'red');
  } else {
    $('label[for="mail"]').text('Email:').css('color', 'black');
  }
})

// credit Card Number
$('#cc-num').on('focusout', function () {
  if (!checkCreditCard()) {
    $('label[for="cc-num"]').text('Please enter a valid credit card number').css('color', 'red');
  } else if (checkCreditCard() === -1) {
    $('label[for="cc-num"]').text('Please enter a valid credit card number').css('color', 'red');
  } else {
    $('label[for="cc-num"]').text('Card Number:').css('color', 'black');
  }
})

// zip
$('#zip').on('focusout', function () {
  if (!checkZip()) {
    $('label[for="zip"]').text('Enter the Zip-code').css('color', 'red');
  } else {
    $('label[for="zip"]').text('Zip Code:').css('color', 'black');
  }
})

// cvv
$('#cvv').on('focusout', function () {
  if (!checkCvv()) {
    $('label[for="cvv"]').text('Enter a 3 digit CVV').css('color', 'red');
  } else {
    $('label[for="cvv"]').text('CVV:').css('color', 'black');
  }
})


// event listener --> submit button
$('button[type="submit"]').on('click', function (e) {
  if (checkForm()) {
    alert('Registration submitted. See you at the conference!')
  } else {
    e.preventDefault();
    errorMessages();
  }
})