const maxTrials = 5;
var trialsLeft = maxTrials;

// The completionCode for the pre-survey
const completionCode = "123AB45";   // Fake completion code

// Name of the locale storage to store the survey progress
const localStorageName = "five-word-post-survey";

const password_correct = "<b>Correct password.</b> Please proceed by clicking the <b>Next</b> button.";

var passwordGlobal = "default.password";
var postAttempt1Cnt = 0;
var postAttempt2Cnt = 0;
var postShowPword = false;
var postSecondTry = false;

// Script for Generating a Five-Word Password
var words_zipped = atob(words_base64_zipped); //loaded from words.js
var charData = words_zipped.split('').map(function (x) { return x.charCodeAt(0); });
var binData = new Uint8Array(charData);
var data = pako.inflate(binData);
var enc = new TextDecoder("utf-8");
words = enc.decode(data.buffer).split("\n");

function registerSurveyListener(survey) {
    survey
        .onComplete
        .add(function (result) {
            let resultJSON = result.data;

            resultJSON.prolificId = $("#submitted-prolific-pid").val();
            resultJSON.studyId = studyId;
            // resultJSON.postsurvey_complete = 1;

            if (survey.getValue("hasWithdrawn") !== 'true') {
                resultJSON.postsurvey_complete = 1;
            }

            if(passwordGlobal != 'default.password') {
                resultJSON.password = passwordGlobal;
                resultJSON.post_attempt1_cnt = postAttempt1Cnt;
                resultJSON.post_attempt2_cnt = postAttempt2Cnt;
                resultJSON.post_show_pword = postShowPword;
                resultJSON.post_second_try = postSecondTry;
            }

            // console.log(resultJSON);

            // POST the survey results to the server for processing.
            $.ajax({
                type: "POST",
                url: post_survey_url,
                data: JSON.stringify(resultJSON, null, 3),
                dataType: "json",
                success: function (data, jqXHR) {
                    // Success handler
                    // console.log(data);
                },
                error: function (data, jqXHR) {
                    // Error handler
                    logErrorMessage(JSON.stringify(data) + "  " + jqXHR);
                }
            });

            // document.querySelector('#surveyResult').textContent = "Result JSON:\n" + JSON.stringify(resultJSON, null, 3);
        })

    survey
        .onPartialSend
        .add(function (result) {
            let resultJSON = result.data;

            resultJSON.prolificId = $("#submitted-prolific-pid").val();
            resultJSON.studyId = studyId;
            resultJSON.postsurvey_complete = 0;

            if(passwordGlobal != 'default.password') {
                resultJSON.password = passwordGlobal;
                resultJSON.post_attempt1_cnt = postAttempt1Cnt;
                resultJSON.post_attempt2_cnt = postAttempt2Cnt;
                resultJSON.post_show_pword = postShowPword;
                resultJSON.post_second_try = postSecondTry;
            }

            // console.log(resultJSON);

            // POST the survey results to the server for processing.
            $.ajax({
                type: "POST",
                url: post_survey_url,
                data: JSON.stringify(resultJSON, null, 3),
                dataType: "json",
                success: function (data, jqXHR) {
                    // Success handler
                    // console.log(data);
                },
                error: function (data, jqXHR) {
                    // Error handler
                    logErrorMessage(JSON.stringify(data) + "  " + jqXHR);
                }
            });
        });

    survey
        .onAfterRenderPage
        .add(function (survey) {
            survey.showNavigationButtons = true;

            let element = document.getElementById("passwordPostGen");
            if (element != null) {
                element.innerText = passwordGlobal;
            }

            if (survey.currentPage.name === "enterPasswordPage") {
                let requestJSON = {};
                requestJSON.prolificId = $("#submitted-prolific-pid").val();

                $.ajax({
                    type: "POST",
                    url: get_password_url,
                    data: JSON.stringify(requestJSON, null, 3),
                    dataType: "json",
                    success: function (data, jqXHR) {
                        // Complete survey when retriving password is unsuccessful
                        if(data['success'] === false){
                            survey.doComplete();
                        }
                        // Success handler
                        // console.log(data);
                        passwordGlobal = data['data'].data;
                    },
                    error: function (data, jqXHR) {
                        // Error handler
                        logErrorMessage(JSON.stringify(data) + "  " + jqXHR);
                        // Complete survey when an error occurred upon retriving password
                        survey.doComplete();
                    }
                });

                survey.showNavigationButtons = false;
                trialsLeft = maxTrials;

                // Focus cursor on textbox
                document.getElementById("password_input").focus();
                document.getElementById("password_input").select();

                // Auto focus on enter button everytime participants enter their passwords
                document.getElementById("password_input").addEventListener("keyup", event => {
                    if(event.key === "Enter"){
                        document.getElementById("password_submit").click();
                        event.preventDefault();
                    }
                });
            } else if (survey.currentPage.name === "MotivationPage") {
                let what_platform_used = survey.getValue("what_platform_used");
                let what_platform_would_use = survey.getValue("what_platform_would_use")
                let list_of_platforms = "";

                if (what_platform_would_use != null && what_platform_would_use[0] === "none_of_the_above") {
                    list_of_platforms = "None";
                    survey.setValue("list_of_platforms", list_of_platforms)
                }
                else {
                    let list_of_platforms_arr = [];
                    if (what_platform_used == null) {
                        list_of_platforms_arr = what_platform_would_use;
                    } else {
                        list_of_platforms_arr = what_platform_used;
                    }

                    for(var i = 0; i < list_of_platforms_arr.length; i++) {
                        if(list_of_platforms_arr[i] == 'other'){
                            list_of_platforms_arr[i] = 'other account(s)';
                        }
                        list_of_platforms_arr[i] = list_of_platforms_arr[i].toLowerCase().replace(/_/g, " ");
                    }

                    for (var i = 0; i < list_of_platforms_arr.length - 2; i++) {
                        list_of_platforms += list_of_platforms_arr[i] + ", ";
                    }
                    list_of_platforms += list_of_platforms_arr[list_of_platforms_arr.length - 2] +
                        " and " + list_of_platforms_arr[list_of_platforms_arr.length - 1] + "?";
                    survey.setValue("list_of_platforms", list_of_platforms)
                }
            }
        });
}

// Function for showing password on enterPassword section
function show_password() {
    if (document.getElementById("password_input").type === "password") {
        document.getElementById("password_input").type = "text";
    } else {
        document.getElementById("password_input").type = "password";
    }

    postShowPword = true;
}

// Function for when participants choose they have forgot the password during the end of survey
function forgot_password_post_survey(survey) {
    // Hide "I forgot my password"
    document.getElementById("password_forget").style.display = "none";
    document.getElementById("password_forget").disabled = true;

    // Enabling confirming forgot password
    document.getElementById("confirm_forget_prompt").style = "display:block";
    document.getElementById("confirm_forget_prompt").disabled = false;
    document.getElementById("confirm_forget_btn").style = "display:inline-block";
    document.getElementById("confirm_forget_btn").disabled = false;    
    document.getElementById("did_not_forget_btn").style = "display:inline-block";
    document.getElementById("did_not_forget_btn").disabled = false;
}

// Function for checking if the password entered is correct at the start of the post survey
function check_password_post_survey(survey) {
    password = document.getElementById("password_input").value.toLowerCase();

    // console.log(password);
    // console.log(passwordGlobal);

    trialsLeft--;
    if(postSecondTry == false)
        postAttempt1Cnt++;
    else
        postAttempt2Cnt++;

    let password_error = `<b>Incorrect</b> password. Please try again. You have <b>
    ${trialsLeft} ${trialsLeft == 1 ? 'attempt' : 'attempts'}</b> left.`;
    if (trialsLeft == 0 && password !== passwordGlobal) {
        // update message after all the trials used
        password_error = `<b>Incorrect</b> password, you have used all <b>5 attempts</b>.<br>
        Please click the <b>Next</b> button below to continue with the survey.`;

        // Disable and change submit button color
        document.getElementById("password_submit").disabled = true;
        document.getElementById("password_submit").style.display = "none";

        //hide the forgot password link 
        document.getElementById("password_forget").style.display = "none";

        // Hide all horizontal lines
        document.querySelectorAll('.my-4').forEach(function(item) {
            item.style.display = 'none';
        });

        // Disable the password input field
        document.getElementById("password_input").disabled = true;
        document.getElementById("show_password_checkbox").disabled = true;

        survey.showNavigationButtons = true;
    }

    if (password == passwordGlobal) {
        survey.showNavigationButtons = true;
        document.getElementById("password_check").innerHTML = password_correct;
        document.getElementById("password_check").style.color = "green";
        //hide the forgot password link 
        document.getElementById("password_forget").style.display = "none";


        // Disable and change submit button color
        document.getElementById("password_submit").disabled = true;
        document.getElementById("password_submit").style.display = "none";

        // Hide all horizontal lines
        document.querySelectorAll('.my-4').forEach(function(item) {
            item.style.display = 'none';
        });

        // Disable the password input field
        document.getElementById("password_input").disabled = true;
        document.getElementById("show_password_checkbox").disabled = true;
    } else {
        document.getElementById("password_check").innerHTML = password_error;
    }
}

function did_not_forget() {
    document.getElementById("password_forget").style.display = "block";
    document.getElementById("password_forget").disabled = false;

    document.getElementById("confirm_forget_prompt").style.display = "none";
    document.getElementById("confirm_forget_prompt").disabled = true;
    document.getElementById("confirm_forget_btn").style.display = "none";
    document.getElementById("confirm_forget_btn").disabled = true;
    document.getElementById("did_not_forget_btn").style.display = "none";
    document.getElementById("did_not_forget_btn").disabled = true;
}

function confirm_remember(){
    document.getElementById("show_pword_card").style.display = "none";
    document.getElementById("enter_pword_card").style.display = "block";

    reset_enterpassword_card();
}

function reset_enterpassword_card() {
    document.getElementById("password_submit").className = "btn btn-success";
    document.getElementById("password_submit").style.display = "block";
    document.getElementById("password_submit").disabled = false;
    
    document.getElementById("password_check").innerText = "";
    document.getElementById("password_check").style.color = "";

    document.getElementById("confirm_forget_prompt").style.display = "none";
    document.getElementById("confirm_forget_btn").style.display = "none";
    document.getElementById("confirm_forget_btn").disabled = true;
    document.getElementById("did_not_forget_btn").style.display = "none";
    document.getElementById("did_not_forget_btn").disabled = true;

    // Show all horizontal lines
    document.querySelectorAll('.my-4').forEach(function(item) {
        item.style.display = 'block';
    });
    document.getElementById("password_forget").style.display = "block";

    document.getElementById("password_input").value = "";
    document.getElementById("password_input").disabled = false;

    document.getElementById("show_password_checkbox").disabled = false;

    // Focus cursor on textbox
    document.getElementById("password_input").focus();
    document.getElementById("password_input").select();

    trialsLeft = maxTrials;
}

function confirm_forget(){
    if(postSecondTry == false){
        document.getElementById("enter_pword_card").style.display = "none";
        document.getElementById("show_pword_card").style.display = "block";

        document.getElementById("passwordPostGen").innerHTML = passwordGlobal;
        postSecondTry = true;
    } else {
        document.getElementById("password_check").innerHTML = "";
        document.getElementById("password_check").style.color = "";

        // Disable and change submit button color
        document.getElementById("password_forget").style.display = "none";
        document.getElementById("password_forget").disabled = true;
        document.getElementById("password_submit").style.display = "none";
        document.getElementById("password_submit").disabled = true;
        document.getElementById("confirm_forget_prompt").style.display = "none";
        document.getElementById("confirm_forget_prompt").disabled = true;
        document.getElementById("confirm_forget_btn").style.display = "none";
        document.getElementById("confirm_forget_btn").disabled = true;
        document.getElementById("did_not_forget_btn").style.display = "none";
        document.getElementById("did_not_forget_btn").disabled = true;
    
        document.getElementById("show_password_checkbox").disabled = true;
    
        // Disable the password input field
        document.getElementById("password_input").disabled = true;
    
        // Hide all horizontal lines
        document.querySelectorAll('.my-4').forEach(function(item) {
            item.style.display = 'none';
        });
    
        password_error = `Please click the <b>Next</b> button below to continue with the survey.`;
        document.getElementById("password_check").innerHTML = password_error;
    
        survey.showNavigationButtons = true;
    }
}

/******************************************************************************
 * Set up of survey model instance
 ******************************************************************************/
// Set the survey json, see the file json/survey-config.js.
window.survey = new Survey.Model(surveyJSON);

// Register survey-related listeners
// registerCommonSurveyListener(survey);
registerSurveyListener(survey);
// Load saved state
// loadState(survey, localStorageName);


// Save survey responses when window is closed, refresh, or navigation buttons are used
// window.addEventListener('beforeunload', function(event) {
//     if (survey !== undefined) {
//         saveState(survey, localStorageName);
//     }
// });

// Get the survey element div and apply the survey model.
$("#surveyElement").Survey({
    model: window.survey,
});