/******************************************************************************
 * Common survey functions
 ******************************************************************************/

// Function to load the survey state from local storage.
function loadState(survey, localStorageName) {
    let storageSt = window
        .localStorage
        .getItem(localStorageName);

    if (storageSt !== null) {
        let surveyRecord = JSON.parse(storageSt);
        // Set survey results
        survey.data = surveyRecord.data;

        // Restore survey state
        switch (surveyRecord.state) {
            // Set survey to 'completed' state via doComplete method
            case 'completed':
                survey.doComplete();
                break;
                // Set survey to 'running' state via start method
            case 'running':
                survey.start();
                survey.currentPageNo = surveyRecord.currentPageNo;
                break;
                // For this states nothing has to be done
            case 'loading':
            case 'starting':
            case 'empty':
            default:
                break;
        }
    }
}

// Function to record the current state of the survey into local storage.
function saveState(survey, localStorageName) {
    let surveyRecord = {
        state: survey.state,
        currentPageNo: survey.currentPageNo,
        data: survey.data
    };
    window.localStorage.setItem(localStorageName, JSON.stringify(surveyRecord));
}


// Function that is called if withdraw button is pressed
function withdrawSurvey(survey) {
    $('#withdrawDialogBackdrop').modal('hide')

    survey.setValue('hasWithdrawn', 'true');
    // Go do survey completion page
    survey.doComplete();

    // Show the withdraw page if the withdraw was initiated from the resolution warning box.
    $("#desktop-resize-warning").hide();
}


// Function to redirect the participant to prolific
function redirectToProlificWithCompletionCode() {
    // Redirect to Prolific with the completion code.

    // window.location.replace('https://app.prolific.co/submissions/complete?cc=' + completionCode);
    window.location.replace('http://localhost/completion/?cc=' + completionCode);

}

// Function to update a count down for the redirect to prolific.
function startCountDownForRedirect() {
    // 30 seconds in milliseconds.
    let timeoutInMilliseconds = 30 * 1000;

    // Update and display the time left before redirect occurs.
    let updateTimer = (timeLeft) => {
        let seconds = Math.max(0, Math.floor((timeLeft % (1000 * 60)) / 1000));

        let redirectCountDownDiv = $('#redirectCountDownDiv');

        let redirectMessage = 'You will be automatically redirected to the Prolific completion page in ';

        if (redirectCountDownDiv) {
            redirectCountDownDiv.empty().append(redirectMessage + String(seconds) + ' seconds.');
        }
    };

    // Initialize timer
    updateTimer(timeoutInMilliseconds);

    // Calculate timestamp for timeout
    let endTime = new Date().getTime() + timeoutInMilliseconds;

    // Update the count down timer every second.
    let countDownInterval = setInterval(function() {
        updateTimer(endTime - new Date().getTime());
    }, 1000);

    // Clear the interval timer.
    setTimeout(function() {
        clearInterval(countDownInterval);
        redirectToProlificWithCompletionCode();
    }, timeoutInMilliseconds);
}


// Function to restart the survey by clearing local storage and clearing the survey and resetting the page to zero.
function restartSurvey(survey) {
    // Clear the local storage.
    window.localStorage.clear();

    // Show withdraw button
    $('#withdrawButton').show();

    // Clear the survey and restart from the beginning.
    survey.clear(true, true);
    survey.deleteCookie();

    // Set the current page zero and start the survey.
    survey.currentPageNo = 0;

    // Re-render the survey after page change.
    survey.render();
}


// Registers listeners for events fired by the survey model
function registerCommonSurveyListener(survey) {

    survey
        .onComplete
        .add(function(result) {
            // Scroll to the top of the page after completing the survey
            $('html,body').scrollTop(0);
            // Hide withdraw button on complete page
            $('#withdrawButton').hide();
        });

    // Create showdown markdown converter
    const converter = new showdown.Converter();
    // Add Markdown functionality to the survey
    survey
        .onTextMarkdown
        .add(function(survey, options) {
            // Convert the markdown text to html
            let str = converter.makeHtml(options.text);
            // Remove root paragraphs <p></p>
            str = str.substring(3);
            str = str.substring(0, str.length - 4);
            // Set html
            options.html = str;
        });

    // Scroll to the top of the page after changing the page
    survey
        .onCurrentPageChanged
        .add(function() {
            $('html,body').scrollTop(0);
        });
}


// Add none option to checkbox questions
function checkboxSelectNone(params) {
    let questionName = params[0];
    let items = params[1];
    if (items.length > 1) {
        if (items.indexOf('none_of_the_above') === 0) {
            let slice = items.slice(1);
            survey.setValue(questionName, slice);
        } else {
            survey.setValue(questionName, ["none_of_the_above"]);
        }
    }
}

// Function that save an error message to the data set of the article tag.
function logErrorMessage(error) {
    // Get the article tag data set.
    console.log(error.toString());
}

// Function to return a formatted date and time.
function getCurrentDateTime() {
    let now = new Date();
    let date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    let time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    return date + ' ' + time;
}

// Function to submit feedback for the survey.
function submitFeedback() {
    // Hide the feedback form.
    $('#feedbackFormDiv').hide();
    $('#feedbackSubmittedDiv').addClass('d-block').removeClass('d-none');

    // Create a feedback JSON object.
    let feedbackJSON = {};

    // Add the feedback text to the JSON.
    feedbackJSON.feedback = $('#feedbackTextarea').val();

    // Add a timestamp to the JSON.
    feedbackJSON.timestamp = getCurrentDateTime();

    // POST the feedback to the server for processing.
    $.ajax({
        type: "POST",
        url: feedback_url,
        data: JSON.stringify(feedbackJSON, null, 3),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        headers: { "Authorization": "Basic " + btoa("survey:BYoJSd5Pp7YN1pc5Z") },
        success: function(data, status, jqXHR) {
            // Success handler
            console.log(status);
        },
        error: function(jqXHR, status) {
            // Error handler
            console.log(status);
        }
    });
}

/******************************************************************************
 * Global survey-js configuration
 ******************************************************************************/
// Apply the "bootstrap" theme and custom styles
Survey.defaultBootstrapCss.footer = 'panel-footer card-footer d-flex flex-row-reverse';
Survey.defaultBootstrapCss.navigationButton = 'btn btn-primary';
Survey.defaultBootstrapCss.page.root = 'container card-body';
Survey.defaultBootstrapCss.completedPage = 'container card-body';

Survey.defaultBootstrapCss.question.description = 'small form-text text-muted mb-2';
Survey.defaultBootstrapCss.question.descriptionUnderInput = 'smallform-text text-muted';
Survey.defaultBootstrapCss.question.requiredText = 'text-danger';

Survey.defaultBootstrapCss.rating.item = 'btn btn-outline-secondary';

Survey.defaultBootstrapCss.boolean.switch = 'sv-boolean__switch-blue';

Survey.defaultBootstrapCss.imagepicker.item = 'imgCheckbox';
Survey.defaultBootstrapCss.imagepicker.itemInline = '';
Survey.defaultBootstrapCss.imagepicker.itemChecked = 'imgCheckbox_checked';
Survey.defaultBootstrapCss.imagepicker.itemHover = 'imgCheckbox_hover';
Survey.defaultBootstrapCss.imagepicker.itemText = 'imgCheckbox_text';

Survey.defaultBootstrapCss.radiogroup.root = 'list-group';
Survey.defaultBootstrapCss.radiogroup.item = '';
Survey.defaultBootstrapCss.radiogroup.itemChecked = '';
Survey.defaultBootstrapCss.radiogroup.itemInline = '';
Survey.defaultBootstrapCss.radiogroup.label = 'list-group-item list-group-item-action';
Survey.defaultBootstrapCss.radiogroup.labelChecked = 'active';
Survey.defaultBootstrapCss.radiogroup.itemControl = 'sv-hidden';
Survey.defaultBootstrapCss.radiogroup.materialDecorator = 'sv-hidden';
Survey.defaultBootstrapCss.radiogroup.column = '';

Survey.defaultBootstrapCss.checkbox.root = 'list-group';
Survey.defaultBootstrapCss.checkbox.item = '';
Survey.defaultBootstrapCss.checkbox.itemChecked = '';
Survey.defaultBootstrapCss.checkbox.itemInline = '';
Survey.defaultBootstrapCss.checkbox.label = 'list-group-item list-group-item-action';
Survey.defaultBootstrapCss.checkbox.labelChecked = 'list-group-item-success active';
Survey.defaultBootstrapCss.checkbox.itemControl = 'sv-hidden';
Survey.defaultBootstrapCss.checkbox.materialDecorator = 'sv-hidden';

Survey.defaultBootstrapCss.matrix.headerCell += ' text-center';
Survey.defaultBootstrapCss.matrix.itemHover = '';
Survey.defaultBootstrapCss.matrix.itemChecked = 'matrixRadio--checked';
Survey.defaultBootstrapCss.matrix.itemValue = 'sv-visuallyhidden matrixItem__control';
Survey.defaultBootstrapCss.matrix.materialDecorator = 'matrixItem__decorator matrixRadio__decorator';
Survey.defaultBootstrapCss.matrix.itemDecorator = 'sv-item__svg matrixRadio__svg';
Survey.defaultBootstrapCss.matrix.label = 'sv-item matrixRadio sv-matrix__label w-100 text-center';


// Survey.defaultBootstrapCss.multipletext.itemTitle = 'flex-grow-0';
// Survey.defaultBootstrapCss.multipletext.cell = 'flex-fill';
// Survey.defaultBootstrapCss.multipletext.row += ' d-flex flex-row ';

Survey
    .StylesManager
    .applyTheme('bootstrap');

// Register function for custom runexpression
Survey
    .FunctionFactory
    .Instance
    .register('checkboxSelectNone', checkboxSelectNone);

// Remove the page numbers from the progress bar text.
let englishLocalization = Survey
    .surveyLocalization
    .locales['en'];
englishLocalization.progressText = '';