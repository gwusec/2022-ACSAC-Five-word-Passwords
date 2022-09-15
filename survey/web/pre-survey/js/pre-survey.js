const maxTrials = 5;
var trialsLeft = maxTrials;
var treatmentVer = "treatment1";

// The completionCode for the pre-survey
const completionCode = "123AB45"; // Fake completion code

// Name of the locale storage to store the survey progress
const localStorageName = "five-word-pre-survey";
const password_correct = "<b>Correct password.</b> Please proceed by clicking the <b>Next</b> button.";
const password_correct_end = "<b>Correct password.</b> Please proceed by clicking the <b>Complete</b> button.";

var passwordGlobal = '';
var totNewPwordCnt = 0;
var startAttemptCnt = 0;
var startNewPwordCnt = 0;
var startShowPword = false;
var midAttemptCnt = 0;
var midNewPwordCnt = 0;
var midShowPword = false;
var endAttemptCnt = 0;
var endShowPword = false;
var startTre2Cnt = new Array(0,0,0,0,0);
var midTre2Cnt = new Array(0,0,0,0,0);

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
            if (survey.getValue("hasWithdrawn") !== 'true') {
                resultJSON.presurvey_complete = 1;
            }

            if(passwordGlobal != '') {
                resultJSON.password = passwordGlobal;
                resultJSON.tot_new_pword_cnt = totNewPwordCnt;

                resultJSON.start_attempt_cnt = startAttemptCnt;
                resultJSON.start_new_pword_cnt = startNewPwordCnt;
                resultJSON.start_show_pword = startShowPword;
                
                resultJSON.mid_attempt_cnt = midAttemptCnt;
                resultJSON.mid_new_pword_cnt = midNewPwordCnt;
                resultJSON.mid_show_pword = midShowPword;
                
                // Counting each of the 5 words for treatment 2 at start and mid
                for(let i=0; i < 5; i++){
                    let tempStr = 'start_tre2_word'+(i+1)+'_cnt';
                    resultJSON[tempStr] = startTre2Cnt[i];
                    tempStr = 'mid_tre2_word'+(i+1)+'_cnt';
                    resultJSON[tempStr] = midTre2Cnt[i];
                }

                resultJSON.end_attempt_cnt = endAttemptCnt;
                resultJSON.end_show_pword = endShowPword;
            }

            // console.log(resultJSON);

            // POST the survey results to the server for processing.
            $.ajax({
                type: "POST",
                url: pre_survey_url,
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
            resultJSON.presurvey_complete = 0;

            if(passwordGlobal != '') {
                resultJSON.password = passwordGlobal;
                resultJSON.tot_new_pword_cnt = totNewPwordCnt;
                
                resultJSON.start_attempt_cnt = startAttemptCnt;
                resultJSON.start_new_pword_cnt = startNewPwordCnt;
                resultJSON.start_show_pword = startShowPword;

                resultJSON.mid_attempt_cnt = midAttemptCnt;
                resultJSON.mid_new_pword_cnt = midNewPwordCnt;
                resultJSON.mid_show_pword = midShowPword;

                // Counting each of the 5 words for treatment 2 at start and mid
                for(let i=0; i < 5; i++){
                    let tempStr = 'start_tre2_word'+(i+1)+'_cnt';
                    resultJSON[tempStr] = startTre2Cnt[i];
                    tempStr = 'mid_tre2_word'+(i+1)+'_cnt';
                    resultJSON[tempStr] = midTre2Cnt[i];
                }

                resultJSON.end_attempt_cnt = endAttemptCnt;
                resultJSON.end_show_pword = endShowPword;
            }

            // console.log(resultJSON);

            // POST the survey results to the server for processing.
            $.ajax({
                type: "POST",
                url: pre_survey_url,
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
            if (survey.currentPage.name === 'generateEnterStartPage') {
                survey.showNavigationButtons = false;
                enc.decode(data.buffer)
                // Auto focus on enter button everytime participants enter their passwords
                document.getElementById("gene_password_input").addEventListener("keyup", event => {
                    if(event.key === "Enter"){
                        document.getElementById("remember_password_btn").click();
                        event.preventDefault();
                    }
                });

                // Auto focus on enter button everytime participants enter their passwords
                document.getElementById("password_input").addEventListener("keyup", event => {
                    if(event.key === "Enter"){
                        document.getElementById("password_submit").click();
                        event.preventDefault();
                    }
                });
            } else if (survey.currentPage.name === "EnterPasswordStart") {
                survey.showNavigationButtons = false;
                trialsLeft = maxTrials;
            } else if (survey.currentPage.name === "generateEnterMidPage") {
                survey.showNavigationButtons = false;
                // Middle page show enter password, hide generate password
                document.getElementById("enter_password_card").style.display = "block";
                document.getElementById("generate_context_card").style.display = "none";
                document.getElementById("create_password_btn").disabled = true;
                document.getElementById("generate_card").style.display = "none";

                // Focus cursor on textbox
                document.getElementById("password_input").focus();
                document.getElementById("password_input").select();

                trialsLeft = maxTrials;

                if (treatmentVer === "treatment2") {
                    for (let i = 1; i < 6; i++) {
                        document.getElementById("create_password_btn" + i).disabled = true;
                    }
                }

                // Auto focus on enter button everytime participants enter their passwords
                document.getElementById("password_input").addEventListener("keyup", event => {
                    if(event.key === "Enter"){
                        document.getElementById("password_submit").click();
                        event.preventDefault();
                    }
                });

                // Auto focus on enter button everytime participants enter their passwords
                document.getElementById("gene_password_input").addEventListener("keyup", event => {
                    if(event.key === "Enter"){
                        document.getElementById("remember_password_btn").click();
                        event.preventDefault();
                    }
                });
            } else if(survey.currentPage.name === "EnterPasswordEnd") {
                survey.showNavigationButtons = false;
                trialsLeft = maxTrials;

                // Focus cursor on textbox
                document.getElementById("password_input").focus();
                document.getElementById("password_input").select();
                
                // // Auto focus on enter button everytime participants enter their passwords
                // document.getElementById("password_input").addEventListener("keyup", event => {
                //     if(event.key === "Enter"){
                //         document.getElementById("password_submit").click();
                //         event.preventDefault(); 
                //     }
                // });
            }
        });

    survey
        .onStarted
        .add(function (survey) {
            let random = Math.floor(Math.random() * 3);
            if (random == 0) {
                treatmentVer = "treatment1";
                survey.setValue("treatmentVer", "treatment1");
            } else if (random == 1) {
                treatmentVer = "treatment2";
                survey.setValue("treatmentVer", "treatment2");
            } else {
                treatmentVer = "treatment3";
                survey.setValue("treatmentVer", "treatment3");
            }

            // console.log(random);
        });

    survey
        .onValueChanged
        .add(function (survey) {
            if (survey.currentPage.name === 'ScreeningPage2') {
                mostLikelyPword = survey.getQuestionByName('most_likely_pword');
                let pwordchoice = '';
                let pwordchoicecnt = 0;
                for (let i = 0; i < mostLikelyPword.cachedValueForUrlRequests.length; i++) {
                    let choice = mostLikelyPword.cachedValueForUrlRequests[i];
                    if (choice != 'None of the above') {
                        pwordchoice += '\"' + choice + '\", ';
                        pwordchoicecnt++;
                        survey.setValue('purposeVisible', 'true');
                    } else {
                        mostLikelyPword.cachedValueForUrlRequests = ['None of the above'];
                        survey.setValue('purposeVisible', 'false');
                    }
                }

                // Get rid of the last ', '
                pwordchoice = pwordchoice.substring(0, pwordchoice.length - 2);
                // If more than 1 pwords are chosen
                if (pwordchoicecnt > 1) {
                    pwordchoice += ' are';
                } else {
                    pwordchoice += ' is';
                }
                survey.setValue('pwordchoice', pwordchoice);
            }
        });
}

function randomNumner(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Version 1 of Generating password
 */
function create_password_v1(survey) {
    password = [];
    for (var i = 0; i < 5; i++) {
        password.push(words[randomNumner(0, words.length)]);
    }

    passwordGlobal = password.join(".");
    document.getElementById("password_v1").innerHTML = passwordGlobal;
    document.getElementById("create_password_btn").innerHTML = "Generate Another Password";
    document.getElementById("confirm_password_btn").style.display = "inline-block";

    if(survey.currentPage.name === 'generateEnterStartPage') {
        startNewPwordCnt++;
    } else {
        midNewPwordCnt++;
    }

    totNewPwordCnt++;
}

function confirm_password_v1() {
    document.getElementById("create_password_btn").style.display = "none";
    document.getElementById("create_password_btn").disabled = true;
    document.getElementById("confirm_password_btn").style.display = "none";

    document.getElementById("remember_password_btn").style.display = "block";
    document.getElementById("remember_password_btn").disabled = false;

    document.getElementById("geneMsg").textContent = geneRemeMsg;
    document.getElementById("password_final").innerHTML = "Your five-word password is: <span style=\"color:blue;\">" + passwordGlobal + "</span>";
    document.getElementById("password_v1").style.display = "none";

    document.getElementById("gene_password_input").style.display = "block";

    // Focus cursor on textbox
    document.getElementById("gene_password_input").focus();
    document.getElementById("gene_password_input").select();
}

/**
 * Version 2 of Generating password
 */
function create_password_v2(survey, index) {
    if (index == 0) {
        password = [];
        for (var i = 1; i < 6; i++) {
            password.push(words[randomNumner(0, words.length)]);
            document.getElementById("password_word" + i).innerHTML = password[i - 1];
            document.getElementById("create_password_btn" + i).style.display = "block";
            document.getElementById("create_password_btn" + i).style.textAlign = "center";
            document.getElementById("create_password_btn" + i).disabled = false;
        }
        document.getElementById("create_password_btn").style.display = "none";
        document.getElementById("create_password_btn").disabled = true;

        if(survey.currentPage.name === 'generateEnterStartPage') {
            startNewPwordCnt++;
        } else {
            midNewPwordCnt++;
        }

        totNewPwordCnt++;
    } else {
        password[index - 1] = words[randomNumner(0, words.length)]
        document.getElementById("password_word" + index).innerHTML = password[index - 1];
        
        if(survey.currentPage.name === 'generateEnterStartPage') {
            startTre2Cnt[index - 1]++;
        } else {
            midTre2Cnt[index - 1]++;
        }
    }

    passwordGlobal = password.join(".");
    document.getElementById("confirm_password_btn").style.display = "inline-block";
}

function confirm_password_v2() {
    for (let i = 1; i < 6; i++) {
        document.getElementById("password_card" + i).style.display = "none";
        document.getElementById("create_password_btn" + i).disabled = true;
    }

    document.getElementById("confirm_password_btn").style.display = "none";
    document.getElementById("remember_password_btn").style.display = "block";
    document.getElementById("remember_password_btn").disabled = false;

    document.getElementById("geneMsg").textContent = geneRemeMsg;

    document.getElementById("password_final").style.display = "block";
    document.getElementById("password_final").innerHTML = "Your five-word password is: <span style=\"color:blue;\">" + passwordGlobal + "</span>";

    document.getElementById("gene_password_input").style.display = "block";

    // Focus cursor on textbox
    document.getElementById("gene_password_input").focus();
    document.getElementById("gene_password_input").select();
}

/**
 * Version 3 of Generating password
 */

function create_password_v3(survey) {
    // checking to make sure they entered valid dictionary words
    password = [];

    password_entry = document.getElementById("password_entry").value.toLowerCase().split(".");
    // console.log(password_entry);
    // console.log(password_entry.length);

    if (password_entry.length != 5 || password_entry.includes('')) {
        document.getElementById("error_word").textContent = "Invalid format of five-word password.";
        return;
    }

    for (var i = 0; i < password_entry.length; i++) {
        word = password_entry[i];

        // console.log("Word: " + word);
        // no repeated words allowed
        if (password.includes(word)) {
            document.getElementById("error_word").textContent = "Word cannot be repeated.";
            // word_error = `<br><span style=\"color:red; @page :left; font-size:14px\">Word cannot be repeated.</span>`;
            // document.getElementById("error_word").innerHTML = word_error;
            return;
        } else if (!words.includes(word)) {
            document.getElementById("error_word").textContent = "Invalid word: " + word;
            // word_error = `<br><span style=\"color:red; @page :left; font-size:14px\">Invalid word: ` + word + `.</span>`;
            // document.getElementById("error_word").innerHTML = word_error;
            return;
        } else {
            document.getElementById("error_word").innerHTML = "";
            password.push(word);
        }
    }

    // console.log(password);
    // console.log(password_entry);

    passwordGlobal = password.join(".");

    // the password they entered was valid -- display appropriate buttons, else do nothing
    document.getElementById("create_password_btn").style.display = "none";
    document.getElementById("create_password_btn").disabled = true;

    document.getElementById("create_another_password_btn").style.display = "inline-block";
    document.getElementById("create_another_password_btn").disabled = false;
    document.getElementById("confirm_password_btn").style.display = "inline-block";

    // Change the boxes to be readonly and get the input password 
    document.getElementById("password_entry").style.display = "none";
    document.getElementById("error_word").display = "none";

    document.getElementById("password_display").style.display = 'block';
    document.getElementById("password_display").innerHTML = '<b>' + passwordGlobal + '</b>';

    if(survey.currentPage.name === 'generateEnterStartPage') {
        startNewPwordCnt++;
    } else {
        midNewPwordCnt++;
    }

    totNewPwordCnt++;
}

function create_another_password() {
    document.getElementById("confirm_password_btn").style.display = "none";
    document.getElementById("create_another_password_btn").style.display = "none";
    document.getElementById("create_another_password_btn").disabled = true;
    document.getElementById("create_password_btn").style.display = "inline-block";
    document.getElementById("create_password_btn").disabled = false;

    document.getElementById("password_entry").style.display = "block";
    document.getElementById("error_word").display = "block";

    document.getElementById("password_display").style.display = "none";
}

function confirm_password_v3() {
    document.getElementById("create_password_btn").style.display = "none";
    document.getElementById("create_password_btn").disabled = true;
    document.getElementById("confirm_password_btn").className = "btn btn-secondary";
    document.getElementById("confirm_password_btn").disabled = true;

    document.getElementById("password_display").style.display = "none";    

    document.getElementById("create_another_password_btn").style.display = "none";
    document.getElementById("create_another_password_btn").disabled = true;
    
    document.getElementById("confirm_password_btn").style.display = "none";

    document.getElementById("remember_password_btn").style.display = "block";
    document.getElementById("remember_password_btn").disabled = false;

    document.getElementById("geneMsg").textContent = geneRemeMsg;
    document.getElementById("gene_password_input").style.display = "block";
    document.getElementById("password_final").innerHTML = "Your five-word password is: <span style=\"color:blue;\">" + passwordGlobal + "</span>";

    // Focus cursor on textbox
    document.getElementById("gene_password_input").focus();
    document.getElementById("gene_password_input").select();
}

// Function triggered when user remembers their password
function remember_password() {
    password = document.getElementById("gene_password_input").value.toLowerCase();

    // console.log(password);
    // console.log(passwordGlobal);

    if (password == passwordGlobal) {
        document.getElementById("password_final").style.display = "none";
        document.getElementById("remember_password_btn").style.display = "none";
        document.getElementById("remember_password_btn").disabled = true;
        // Hide all horizontal lines
        document.querySelectorAll('.my-4').forEach(function(item) {
            item.style.display = 'none';
        });

        proceed_password();
    } else {
        document.getElementById("geneMsg").innerHTML = geneCheckMsg;
    }
}

function confirm_forget() {
    document.getElementById("confirm_forget_btn").style.display = "none";
    document.getElementById("confirm_forget_btn").disabled = false;

    document.getElementById("password_newone").style.display = "none";
    document.getElementById("password_newone").disabled = false;

    document.getElementById("password_forget").style.display = "block";
    document.getElementById("password_forget").disabled = false;

    document.getElementById("password_submit").style.display = "block";
    document.getElementById("password_submit").disabled = false;

    document.getElementById("password_input").disabled = false;
    document.getElementById("show_password_checkbox").disabled = false;

    // Show all horizontal lines
    document.querySelectorAll('.my-4').forEach(function(item) {
        item.style.display = 'block';
    });
}

function proceed_password() {
    document.getElementById("generate_context_card").style.display = "block";
    document.getElementById("generate_card").style.display = "none";

    document.getElementById("enter_password_card").style.display = "block";

    reset_enterpassword_card();
}

function reset_enterpassword_card() {
    document.getElementById("password_submit").className = "btn btn-success";
    document.getElementById("password_submit").style.display = "block";
    document.getElementById("password_submit").disabled = false;
    
    document.getElementById("password_check").innerText = "";
    document.getElementById("password_check").style.color = "";

    document.getElementById("password_newone").style.display = "none";
    document.getElementById("password_newone").disabled = true;

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

// Go back a page on 5 failure and reset number of trials left
function another_password() {
    document.getElementById("enter_password_card").style.display = "none";
    // document.getElementById("password_entry").style.display = "block";

    document.getElementById("generate_context_card").style.display = "block";
    document.getElementById("generate_card").style.display = "block";

    // Reset the generate password part
    document.getElementById("create_password_btn").style.display = "inline-block";
    document.getElementById("create_password_btn").className = "btn btn-success";
    document.getElementById("create_password_btn").disabled = false;
    document.getElementById("create_password_btn").innerText = "Generate Password";

    document.getElementById("gene_password_input").value = "";
    document.getElementById("gene_password_input").style.display = "none";

    document.getElementById("confirm_password_btn").className = "btn btn-primary";
    document.getElementById("confirm_password_btn").style.display = "none";
    document.getElementById("confirm_password_btn").disabled = false;

    document.getElementById("geneMsg").innerText = "";

    if (treatmentVer === "treatment1") {
        document.getElementById("password_v1").innerText = "";
        document.getElementById("password_v1").style.display = "block";
        document.getElementById("password_final").innerText = "";
        document.getElementById("password_final").style.display = "block";

        document.getElementById("password_input").value = "";
    } else if (treatmentVer === "treatment2") {
        for (let i = 1; i < 6; i++) {
            document.getElementById("password_card" + i).style.display = "block";
            document.getElementById("create_password_btn" + i).style.display = "none";
            document.getElementById("create_password_btn" + i).disabled = true;
            document.getElementById("password_word" + i).innerText = "";
        }

        document.getElementById("password_input").value = "";
    } else if (treatmentVer === "treatment3") {
        document.getElementById("password_entry").style.display = "block";
        document.getElementById("password_entry").disabled = false;
        document.getElementById("password_entry").value = "";
    }

    trialsLeft = maxTrials;
}

// Function for showing password on enterPassword section
function show_password(survey) {
    if (document.getElementById("password_input").type === "password") {
        document.getElementById("password_input").type = "text";
    } else {
        document.getElementById("password_input").type = "password";
    }

    if(survey.currentPage.name === 'generateEnterStartPage') {
        startShowPword = true;
    } else if(survey.currentPage.name === 'generateEnterMidPage') {
        midShowPword = true;
    } else {
        endShowPword = true;
    }
}

// Function for checking if the password entered is correct at the beginning of the survey
function check_password_start(survey) {
    password = document.getElementById("password_input").value.toLowerCase();

    // console.log(password);
    // console.log(passwordGlobal);

    trialsLeft--;
    if(survey.currentPage.name === 'generateEnterStartPage') {
        startAttemptCnt++;
    } else {
        midAttemptCnt++;
    }
    let password_error = `<b>Incorrect</b> password. Please try again. You have <b>
    ${trialsLeft} ${trialsLeft == 1 ? 'attempt' : 'attempts'}</b> left.`;
    if (trialsLeft == 0 && password !== passwordGlobal) {
        // update message after all the trials used
        password_error = `<b>Incorrect</b> password, you have used all <b>5 attempts</b>. 
        Please <b>go back</b> to generate a new password.`;

        // Disable and change submit button color
        document.getElementById("password_submit").disabled = true;
        document.getElementById("password_submit").style.display = "none";

        //hide the forgot password link
        document.getElementById("password_forget").style.display = "none";

        // Hide all horizontal lines
        document.querySelectorAll('.my-4').forEach(function(item) {
            item.style.display = 'none';
        });

        // Show the button to go back
        document.getElementById("password_newone").style = "display:inline-block";
        document.getElementById("password_newone").disabled = false;

        document.getElementById("confirm_forget_btn").style.display = "display:inline-block";
        document.getElementById("confirm_forget_btn").disabled = false;
        document.getElementById("did_not_forget_btn").style.display = "display:inline-block";
        document.getElementById("did_not_forget_btn").disabled = false;

        // Disable the password input field and show password checkbox
        document.getElementById("password_input").disabled = true;
        document.getElementById("show_password_checkbox").disabled = true;
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

// Function for checking if the password entered is correct at the end of the survey
function check_password_end(survey) {
    password = document.getElementById("password_input").value.toLowerCase();

    // console.log(password);
    // console.log(passwordGlobal);

    trialsLeft--;
    endAttemptCnt++;
    let password_error = `<b>Incorrect</b> password. Please try again. You have <b>
    ${trialsLeft} ${trialsLeft == 1 ? 'attempt' : 'attempts'}</b> left.`;
    if (trialsLeft == 0 && password !== passwordGlobal) {
        // update message after all the trials used
        password_error = `<b>Incorrect</b> password, you have used all <b>5 attempts</b>.<br>
        Please click the <b>Complete</b> button below to complete the survey.`;

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
        document.getElementById("password_check").innerHTML = password_correct_end;
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

// Function for when participants choose they have forgot the password during start/mid survey
function forgot_password_start(survey) {
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

function confirm_forget(){
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

    // Show the button to go back
    document.getElementById("password_newone").style = "display:inline-block";
    document.getElementById("password_newone").disabled = false;
}

// Function for when participants choose they have forgot the password during the end of survey
function forgot_password_end(survey) {
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

function confirm_forget_end() {
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
    
    password_error = `Please click the <b>Complete</b> button below to complete the survey.`;
    document.getElementById("password_check").innerHTML = password_error;

    survey.showNavigationButtons = true;
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
