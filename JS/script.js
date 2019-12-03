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
tshirtColor.hide();

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
design.change(e=>{
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