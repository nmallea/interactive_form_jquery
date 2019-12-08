// declared variables
const name = $('#name');
const jobRole = $('#title');
const otherJobRole = $('#other-title');
const paymentOption = $('#payment');
const paymentCC = $('#credit-card');
const paymentPayPal = $('#paypal');
const paymentBitCoin = $('#bitcoin');
const submit = $('button[type="submit"]');

$(() => {
  // set focus on the first text field
  name.focus();
  // hides other job role, t-shirt color and payment fields before called
  otherJobRole.hide();
  tshirtColor.hide();
  paymentPayPal.hide();
  paymentBitCoin.hide();
});

// set credit card as default display#
paymentOption.val('credit card');
paymentPayPal.hide();
paymentBitCoin.hide();

// disable option "selectors"
$('option[value="select method"]').attr('disabled', true);
$('option:contains("Select Theme")').attr('disabled', true);

/*       ---------------- Job Role -----------------------
 Include a text field that will be revealed when the 'Other' option is selected from the 'Job Role' drop down menu. If 'Other' selected in job role drop down, show other-title input field */

$(jobRole).change(() => {
  if (jobRole.val().toLowerCase() === 'other') {
    otherJobRole.show();
  } else {
    otherJobRole.hide();
  }
});

/*     ------------------- T-Shirt Info ----------------------
 do not show the t-shirt color options until the user selects a design, and then show only the relevant t-shirt color options, with the first options selected */

// hide 'select theme' in design menu
const tshirtColor = $('#colors-js-puns');
const tshirtDesign = $('#design');
const designSelectOptions = $('#design option');

// change default color dropdown option//hide all others
const colorSelect = $('#color');
const colorSelectOptions = $('#color option');
const colorPlaceholder = $("<option value='choosetheme' selected='selected'>Please select a T-shirt design</option>");
colorSelect.prepend(colorPlaceholder);
colorSelect.children().hide();

// change color dropdown options when design is chosen
// tshirtDesign.on('change', function(event) {
tshirtDesign.on('change', ({target}) => {
  $('#colors-js-puns').show();
  colorPlaceholder.remove();
  // if ($(event.target).val() === 'js puns') {
  if ($(target).val() === 'js puns') {
    colorSelectOptions.eq(0).prop('selected', true);
    $('#color option:gt(2)') && $('#color option:lt(6)').hide();
    $('#color option:gt(0)') && $('#color option:lt(3)').show();
  } else {
    colorSelectOptions.eq(3).prop('selected', true);
    $('#color option:gt(2)') && $('#color option:lt(6)').show();
    $('#color option:gt(0)') && $('#color option:lt(3)').hide();
  }
});

/*  ---------- Register for Activities section ---------
 User should not be able to choose events that conflict with one another. Disable/enable depending on checkboxes. As a user selects activities, a running total should display below the list of checkboxes
 */
$('.activities').on('click', () => {
  let total = 0;

  // remove error message
  $('#ca').remove();

  if ($('input[name="all"]').is(':checked')) {
    total += 200;
  }

  if ($("input[name='js-frameworks']").is(':checked')) {
    total += 100;
    $("input[name='express']").attr('disabled', true);
  } else {
    $("input[name='express']").attr('disabled', false);
  }

  if ($("input[name='js-libs']").is(':checked')) {
    total += 100;
    $("input[name='node']").attr('disabled', true);
  } else {
    $("input[name='node']").attr('disabled', false);
  }

  if ($("input[name='express']").is(':checked')) {
    total += 100;
    $("input[name='js-frameworks']").attr('disabled', true);
  } else {
    $("input[name='js-frameworks']").attr('disabled', false);
  }

  if ($("input[name='node']").is(':checked')) {
    total += 100;
    $("input[name='js-libs']").attr('disabled', true);
  } else {
    $("input[name='js-libs']").attr('disabled', false);
  }

  if ($('input[name=build-tools]').is(':checked')) {
    total += 100;
  }
  if ($('input[name=npm]').is(':checked')) {
    total += 100;
  }
  totalPrice(total);
});

// running total function --> adds content total to html
// function totalPrice(total) {
const totalPrice = total => {
  const price = parseInt(total, 10);

  if (price !== 0 || price > 0) {
    $('#totalDiv').remove();
    $('.activities').append(`<div id='totalDiv'><strong>Total: $${total}</strong></div>`);
  } else {
    $('#totalDiv').remove();
  }
}

/*  ---------------- "Payment Info" section ---------------
 Display payment sections based on the payment option chosen in the select menu. Hide of display information depending on user selection. */

//event listener for payment section
paymentOption.on('change', () => {
  $('option[value="select method"]').hide();
  if (paymentOption.val().toLowerCase() === 'credit card') {
    $('#credit-card').show();
    $('#paypal').hide();
    $('#bitcoin').hide();
  } else if (paymentOption.val().toLowerCase() === 'paypal') {
    $('#credit-card').hide();
    $('#paypal').show();
    $('#bitcoin').hide();
  } else if (paymentOption.val().toLowerCase() === 'bitcoin') {
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').show();
  }
});

/*  --------------- Form Validation & Messages ---------------------
 validate fields. if errors exist, prevent the user from submitting the form. Provide indication when there’s a validation error. */

// name validation
// function checkName() {
const checkName = () => {
  const nameRegex = /^[a-zA-Z]+$/;

  return nameRegex.test($('#name').val());
}

// email validation
// function checkEmail() {
const checkEmail = () => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test($('#mail').val());
}

// credit card number validation
function checkCreditCardNumber() {
  const creditCardRegex = /^(?:\d[ -]*?){13,16}$/gm;

  return creditCardRegex.test($('#cc-num').val());
}

const checkCreditCardNumberLength = () => {
  const regEx = /[^\w\s]/gi;
  const ccNum = $('#cc-num')
    .val()
    .replace(regEx, '').length;

  return ccNum < 13 || ccNum > 16;
};

// zip validation
function checkZip() {
  const zipRegex = /^[0-9]{5}$/;

  return zipRegex.test($('#zip').val());
}

// cvv validation
function checkCvv() {
  const cvvRegex = /^[0-9]{3}$/;

  return cvvRegex.test($('#cvv').val());
}

// activity validation
function checkActivities() {
  return $('input[type=checkbox]:checked').length > 0;
}

const checkDefaults = () => checkName() && checkEmail() && checkActivities();

const checkPayment = () => checkCreditCardNumber() && checkZip() && checkCvv();

const checkPaymentSelection = () => paymentOption.val() === 'select method' ? false : true;

// function to run the validations
const checkForm = () => {
  if (checkPaymentSelection()) {
    if (paymentOption.val() === 'credit card') {
      return checkDefaults() && checkPayment();
    } else {
      return checkDefaults();
    }
  }
}

//function to display validation messages
const errorMessages = () => {
  if (!checkName()) {
    $('label[for="name"]')
      .text('Please enter your name.')
      .addClass('error');
  }

  if (!checkEmail()) {
    $('label[for="mail"]')
      .text('Please enter a valid email address.')
      .addClass('error');
  }

  if (!checkActivities()) {
    $('#ca').remove();

    const errorTemplate = '<div id="ca" class="error error--activities">Please select activities</div>';
    $(errorTemplate).insertBefore('label[for="all"]');
  }
}

const creditCardError = () => {
  const ccNumError = $('label[for="cc-num"]');

  if (checkCreditCardNumberLength()) {
    ccNumError.text('Please enter 13-16 digit number')
    .addClass('error');
  } else if (!checkCreditCardNumber()) {
    ccNumError.text('Please enter a valid credit card number')
    .addClass('error');
  } else {
    ccNumError.text('Card Number:')
    .css('color', 'black')
    .removeClass('error')
    .addClass('label');
  }
};

const zipError = () => {
  const zip = $('label[for="zip"]');

  if (!checkZip()) {
    zip.text('Enter the Zip-code')
    .addClass('error');
  } else {
    zip.text('Zip Code:')
    .removeClass('error')
    .addClass('label');
  }
};

const cvvError = () => {
  const cvv = $('label[for="cvv"]');

  if (!checkCvv()) {
    cvv.text('Enter a 3 digit CVV')
    .addClass('error');
  } else {
    cvv.text('CVV:')
    .removeClass('error')
    .addClass('label');
  }
};

// event listeners for fields

// name
$('#name').on('focusout', () => {
  if (!checkName()) {
    $('label[for="name"]')
      .text('Please enter your name')
      .addClass('error');
  } else {
    $('label[for="name"]')
      .text('Name:')
      .removeClass('error')
      .addClass('label');
  }
});

// email
$('#mail').on('focusout', () => {
  if (!checkEmail()) {
    $('label[for="mail"]')
      .text('Please enter a valid email address')
      .addClass('error');
  } else {
    $('label[for="mail"]')
      .text('Email:')
      .removeClass('error')
      .addClass('label');
  }
});

// credit card Number
$('#cc-num').on('focusout keyup', () => {
  creditCardError();
});

// zip
$('#zip').on('focusout keyup', () => {
  zipError();
});

// cvv
$('#cvv').on('focusout keyup', () => {
  cvvError();
});

// event listener --> submit button
submit.on('click', e => {
  if (checkForm()) {
    alert('Registration submitted. See you at the conference!');
  } else {
    e.preventDefault();
    errorMessages();

    creditCardError();

    zipError();

    cvvError();
  }
});
