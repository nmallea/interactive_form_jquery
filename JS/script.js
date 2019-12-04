// Declared variables
const jobRole = $('#title');
const otherJobRole = $('#other-title');
const tshirtDesign = $('#design');
const tshirtColor = $('#colors-js-puns');
const selectTheme = $('#select-theme');
const design = $('select#design');
const colorOptions = $('select#color option');

// Set focus on the first text field
$(document).ready(function() {
  document.getElementById('name').focus();
});

// Hides other job role input field before called
otherJobRole.hide();

// Hides the color dropdown until a design theme is chosen
//tshirtColor.hide();

//      ---------------- Job Role -----------------------
// Include a text field that will be revealed when the 'Other' option is selected from the 'Job Role' drop down menu. If 'Other' selected in job role drop down, show other-title input field
$(jobRole).change(function() {
  if (jobRole.val() === 'other') {
    otherJobRole.show();
  } else {
    otherJobRole.hide();
  }
});

//    ------------------- T-Shirt Info ----------------------
// Do not show the t-shirt color options until the user selects a design, and then show only the relevant t-shirt color options, with the first options selected

//$(name="user-design").change( function() {
 // $("select[id="color"]").removeAttr("disabled");
//});

design.change(e=> {
  // Hide the color div and color options
  tshirtColor.hide();
  colorOptions.hide();


  // findOptions -->  collection of items containing
  function findOptions(element, text){
    return element.filter(function (index, item) {
      const passes = $(this).text().indexOf(text) > 0;
      return passes;
      });
  }
  // User selects 'js puns' designs --> show the puns colors
  if (tshirtDesign.val() === 'js puns') {
    // Show the color section
    tshirtColor.show();
    // Display first option pre-selected
    findOptions(colorOptions, 'puns').show().first().prop('selected', true);
    // User selects the 'heart js' designs --> show the heart colors
  } else if (tshirtDesign.val() === 'heart js') {
      tshirtColor.show();
      // Display first option pre-selected
      findOptions(colorOptions, 'heart').show().first().prop('selected', true);
  };
})
// ---------- ”Register for Activities” section ---------
// User should not be able to choose events that conflict with one another. Disable/enable depending on checkboxes. As a user selects activities, a running total should display below the list of checkboxes



//$('input[type="checkbox"]').on('click', function() {
  // 1) Create a variable named `clicked` to store the checkbox input that was just clicked - `e.target` will be helpful here
  // 2) Create a variable named `clickedType` to store the `data-type` attribute of the checkbox that was just clicked
 // console.log('bla: ', this.value);

  //console.log('totalSum: ', totalSum);

// ----------
  if($(e.target).prop('checked') === true){
   $('input[type="checkbox"]').each(function() {
    if($(e.target).data('dayAndTime') === $(this).data('dayAndTime')) {
      $(this).attr('disabled', true);
      $(e.target).attr('disabled', false);
    }
  })
  }
  else {
      $('input[type="checkbox"]').each(function() {
    if($(e.target).data('dayAndTime') === $(this).data('dayAndTime')) {
      $(this).attr('disabled', false);
    }
    })
  }
  // Disable (grey out) conflicting options
  $('input[type="checkbox"]').each(function() {
    if($(this).prop('disabled') === true) {
      $(this).parent().wrap("<grey>"); }
    else {
      if($(this).parent().parent().is('grey')) {
      $(this).parent().unwrap();
     }
    }
  })
// running total function ?


 // adds content total to html $('#total').text('Total $' + runningTotal);


// ---------------- "Payment Info" section ---------------
// Display payment sections based on the payment option chosen in the select menu. Hide of dislay information depending on user selection.



// --------------- Form Validation & Messages ---------------------
// validate fields. if errors exist, prevent the user from submitting the form. Provide indication when there’s a validation error.

//name field
$(document).ready(function() {
  //const name = $('#name').val();
  const errorMessage = '<span class="error">This field is required</span>';
  $('#name').focusout(function() {
    if($(this).val()=='') {
      $(this).css('border', 'solid 2px red');
      $('#name').after(errorMessage);}
    else { // If it is not blank.
      $(this).css('border', 'solid 2px green');
    }
  }) .trigger("focusout");
});


//----------------

$('#submit').submit(function(e) {
  e.preventDefault();

  const emailField = $('#email');

  const email = emailField.val();
  const errorMessage = '<span class="error">This field is required</span>';
  const checkEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validEmail = checkEmail.test(email);

  $('.error').remove();

  if (name === '') {
    $('#name').after(errorMessage);
  }
  if (email === '') {
    emailField.after(errorMessage);
  } else {

    if (!validEmail) {
      emailField.after('<span class="error">Enter a valid email</span>');
    }
  }

});

