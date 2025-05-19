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

  //Question Random

  // မေးခွန်းများ
  const questions = [
    "သူက ကိုယ့်အပေါ်စိတ်ဝင်စားမှု ဘယ်လောက်ထိရှိလဲ?",
    "သူ့ရဲ့ typeက ကိုယ်နဲ့ ကိုက်ညီမှုရှိလား?",
    "သူနဲ့ ရေရှည်ဆက်သွားနိုင်မလား?",
    "သူက ကိုယ့်ကို ချစ်တယ်လို့ခံစားမိရဲ့လား?",
    "သင့်အပေါ်ကို သူက သည်းခံပေးနိုင်မှုအတိုင်းအတာက ဘယ်လောက်ထိရှိလဲ?",
    "သူ့ရဲ့ အကျင့်စာရိတ္တ ကိုကောဘယ်လိုမြင်လဲ?",
    "သင့်ပေါ်ကို သူက ဘယ်လောက်ထိ ဂရုစိုက်မှုပေးနိုင်လဲ?",
    "သင့်ရဲ (ကောင်းကွက်၊ဆိုးကွက်)တွေကိုကော သူက ဘယ်လောက်ထိ သည်းခံပေးနိုင်လဲ?",
    "သူ့ရဲ ပြောပုံဆိုပုံကို ဘယ်လိုမြင်လဲ?",
    "သင့်ရဲ့ ဘဝအတွက် သူက ဘယ်လောက်ထိ အရေးပါသလဲ?",
    "သူ့ကို ဘယ်လောက်ထိ ယုံကြည်ိလို့ ရလဲ?"
  ];

  // Initialize properly
  let form_count = 1;
  let previous_form = $("fieldset").first();
  let next_form = null;
  let total_forms = $("fieldset").length;
  let usedIndices = [];
  let currentIndex;

  // Show first question
  showRandomQuestion(previous_form);

  $(".next-form").click(function () {
    previous_form = $(this).closest("fieldset");

    if (!previous_form.length) {
      console.error("Current form not found");
      return;
    }

    next_form = previous_form.next("fieldset");

    if (!next_form.length) {
      console.error("No next form available");
      return;
    }

    showRandomQuestion(next_form);
    previous_form.hide();
    next_form.show();
    setProgressBarValue(++form_count);
  });

  $(".previous-form").click(function () {
    previous_form = $(this).closest("fieldset");

    if (!previous_form.length) {
      console.error("Current form not found");
      return;
    }

    next_form = previous_form.prev("fieldset");

    if (!next_form.length) {
      console.error("No previous form available");
      return;
    }

    previous_form.hide();
    next_form.show();
    setProgressBarValue(--form_count);
  });

  function showRandomQuestion(targetForm) {
    // if (usedIndices.length === questions.length) {
    //   usedIndices = [];
    //   alert("မေးခွန်းအားလုံးကိုပြပြီးပါပြီ! နောက်တစ်ခါထပ်စမည်။");
    // }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedIndices.includes(randomIndex));

    usedIndices.push(randomIndex);
    currentIndex = randomIndex;

    targetForm.find(".question-text").text(questions[currentIndex]);
  }

  function setProgressBarValue(value) {
    var percent = parseFloat(100 / total_forms) * value;
    percent = percent.toFixed();
    $(".progress-bar")
      .css("width", percent + "%")
      .html(percent + "%");
  }

  // var form_count = 1,
  //   previous_form,
  //   next_form,
  //   total_forms;
  // total_forms = $("fieldset").length;
  // $(".next-form").click(function () {
  //   previous_form = $(this).parent();
  //   console.log(previous_form);
  //   next_form = $(this).parent().next();
  //   next_form.show();
  //   previous_form.hide();
  //   setProgressBarValue(++form_count);
  // });
  // $(".previous-form").click(function () {
  //   previous_form = $(this).parent();
  //   next_form = $(this).parent().prev();
  //   next_form.show();
  //   previous_form.hide();
  //   setProgressBarValue(--form_count);
  // });
  // setProgressBarValue(form_count);
  // function setProgressBarValue(value) {
  //   var percent = parseFloat(100 / total_forms) * value;
  //   percent = percent.toFixed();
  //   $(".progress-bar")
  //     .css("width", percent + "%")
  //     .html(percent + "%");
  // }

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

    if (score < 40) {
      titleMessage = "Score Low";
      resultClass = "score-low";
      message =
        "You scored is lower than 40% of the total marks! More study is needed.";
    } else if (score >= 40 && score < 80) {
      titleMessage = "Score Medium";
      resultClass = "score-medium";
      message =
        "You scored is a medium section of the total mark! You should try a little harder.";
    } else {
      titleMessage = "Score High";
      resultClass = "score-high";
      message = "You scored is higher than 80% of the total marks! Great Job.";
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

  // Check if localStorage is supported
  // if (typeof Storage !== "undefined") {
  //   // Get current count or initialize
  //   let visitCount = localStorage.getItem("visitCount") || 0;

  //   // Increment count
  //   visitCount++;

  //   // Store updated count
  //   localStorage.setItem("visitCount", visitCount);

  //   // Display count
  //   document.getElementById("visitor-counter").textContent = visitCount;
  // } else {
  //   document.getElementById("visitor-counter").textContent =
  //     "Counter not supported";
  // }

  // Questions JSON file ကိုဖတ်ပါ
  // $.getJSON("questions.json", function (data) {
  //   var questions = data.questions;
  //   console.log(questions);

  //   // Random question တစ်ခုကိုရွေးပါ
  //   function getRandomQuestion() {
  //     var randomIndex = Math.floor(Math.random() * questions.length);
  //     return questions[randomIndex];
  //   }

  //   // Question ကိုပြသပါ
  //   function displayQuestion(question) {
  //     // var questionHtml = '<div class="question">';
  //     // questionHtml += "<h3>" + question + "</h3>";
  //     // questionHtml += "</div>";

  //     var questionHtml = "";
  //     questionHtml += "<h1>" + question + "</h1>";

  //     $("#question-container").html(questionHtml);
  //   }

  //   // ပထမဆုံး question ကိုပြပါ
  //   displayQuestion(getRandomQuestion());

  //   // Next button အတွက် event listener
  //   $(".next-form").click(function () {
  //     displayQuestion(getRandomQuestion());
  //   });
  // }).fail(function () {
  //   console.error("Error loading questions file");
  //   $("#question-container").html("<p>Questions could not be loaded.</p>");
  // });
});
