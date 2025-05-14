$(document).ready(function () {
  //Get Started button Click Event
  $("#getStartedBtn").click(function () {
    //Add zoom-out effect to welcome screen
    $("#welcomeScreen").css({
      transform: "scale(0.5)",
      opacity: "0",
      // transform: "rotate(360deg) scale(0)",
      transition: "all 0.7s ease",
    });

    //Image hover Effect]
    $("#welcomeImage").hover(
      function () {
        //Mouse enter bounce effect
        $(this).css("animation", "float 1s ease-in-out infinite");
      },
      function () {
        //Mouse leave return to normal float
        $(this).css("animation", "float 3s ease-in-out infinite");
      }
    );

    //After animation complete, hide welcome screen
    setTimeout(function () {
      $("#welcomeScreen").hide();

      //Show form with fade-in and slide-up effect
      $("#mainForm").css({
        display: "block",
        opacity: "0",
        transform: "translateY(20px)",
      });

      setTimeout(function () {
        $("#mainForm").css({
          opacity: "1",
          transform: "translateY(0)",
        });
      }, 50);
    }, 400);
  });

  var form_count = 1,
    previous_form,
    next_form,
    total_forms;
  total_forms = $("fieldset").length;
  $(".next-form").click(function () {
    previous_form = $(this).parent();
    console.log(previous_form);
    next_form = $(this).parent().next();
    next_form.show();
    previous_form.hide();
    setProgressBarValue(++form_count);
  });
  $(".previous-form").click(function () {
    previous_form = $(this).parent();
    next_form = $(this).parent().prev();
    next_form.show();
    previous_form.hide();
    setProgressBarValue(--form_count);
  });
  setProgressBarValue(form_count);
  function setProgressBarValue(value) {
    var percent = parseFloat(100 / total_forms) * value;
    percent = percent.toFixed();
    $(".progress-bar")
      .css("width", percent + "%")
      .html(percent + "%");
  }

  const colors = [
    "#1125d41a",
    "#dcedfc",
    "#d6f3e9",
    "#ff575733",
    "#ffb01f33",
    "#00bd9133",
    "#ffedb8",
    "#c3e4f4",
    "#eac1f9",
    "#c3c3f5",
  ];

  // Calculate Button Click Event
  $("#submitBtn").click(function () {
    var total = 0;
    var selectedOptions = [];

    // Calculate total and collect selected options
    $('input[type="radio"]:checked').each(function () {
      var value = parseFloat($(this).val()) || 0;
      total += value;

      // Get the value text for selected options
      var name = $(this).attr("name");
      var value = $(this).val();
      var label = $('label[for="' + $(this).attr("id") + '"]').text();

      // Find the fieldset title (legend text) for this radio button
      var fieldsetTitle = $(this).closest("fieldset").find("h1").text();

      selectedOptions.push({
        category: fieldsetTitle,
        option: label,
        value: value,
      });
    });


    showResultPage(total);

    displayResults(selectedOptions);

    displayScoreResult(total);
  });

  function displayResults(options) {
    var resultHtml = "";
    var resultCategory = "";
    var resultValue = "";
    var colorIndex = 0;

    options.forEach(function (item, index) {
      // Get color from palette (loop back to start if needed)
      var color = colors[colorIndex % colors.length];

      resultHtml += `

      <div class="gird-single" style="background-color: ${color}">
				<div class="gird-item">
					<span class="one" id="">${item.category}</span>
				</div>
			  <div class="grid-right">
					<span id="">${item.value} <span class="ash">/ 10</span></span>
				</div>
			</div>
      `;

      colorIndex++;

      resultCategory += item.category;
      resultValue += item.value;
    });

    $("#resultContent").html(resultHtml);

  }

  function displayScoreResult(score) {
    var message = "";
    var resultClass = "";
    var titleMessage = "";
    

    if(score < 40) {
      titleMessage = "Score Low";
      resultClass = "score-low";
      message = "You scored is lower than 40% of the total marks ပိုမိုလေ့လာဖို့လိုအပ်ပါသည်!";
    } else if (score >= 40 && score < 80) {
      titleMessage = "Score Medium";
      resultClass = "score-medium";
      message = 'You scored is a medium section of the total mark!။ နည်းနည်းထပ်ကြိုးစားရင် ပိုကောင်းမယ်။';
    } else {
      titleMessage = "Score High";
      resultClass = 'score-high';
      message = "You scored is higher than 80% of the total marks Great Job!";
    }

    $("#resultMessage").text(message);
    $("#titleMessage").text(titleMessage);
  }



  // Back Button Click Event
  $("#backBtn").click(function () {
    showFormPage();
    $("#multiform").trigger("reset");
    location.reload();
    
  });

  // Function to show result page with transition
  function showResultPage(total) {
    // Fill result data
    $("#totalAmount").html(total);

    // Add fade-out effect to form
    $("#mainForm").addClass("fade-out");

    // After fade-out completes, hide form and show result
    setTimeout(function () {
      $("#mainForm").hide();
      
      $("#resultPage")
        .css("display", "block")
        .hide()
        .addClass("fade-in")
        .fadeIn(500);
    }, 500);
  }

  // Function to show form page with transition
  function showFormPage() {
    // Add fade-out effect to result
    $("#resultPage").removeClass("fade-in").addClass("fade-out");

    // After fade-out completes, hide result and show form
    setTimeout(function () {
      $("#resultPage").hide();
      $("#mainForm")
        .removeClass("fade-out")
        .css("display", "block")
        .hide()
        .fadeIn(500);
    }, 500);
  }

});
