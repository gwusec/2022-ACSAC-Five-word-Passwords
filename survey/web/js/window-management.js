/******************************************************************************
 * Cookie management.
 ******************************************************************************/

let sessionIdCookieName = 'fivewords-study-prolific-session-id';
let uuidCookieName = 'fivewords-study-uuid';
let studyId = '';

// Delete after testing
let prolificCookieName = 'fivewords-study-prolific-id';

function setCookieByNameValueExpireDays(cookieName, cookieValue, expireDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    document.cookie = cookieName + "=" + cookieValue + ";" + "expires=" + date.toUTCString() + ";path=/";
}

function getCookieValueByName(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookieByName(cookieName, path) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=" + path + ";";
}

function removeAllMainStudyRelatedCookies() {
    deleteCookieByName(sessionIdCookieName, '/');
    deleteCookieByName(uuidCookieName, '/');
    deleteCookieByName('five-word-after-survey', 'after-survey');
}

function removeAllPreStudyRelatedCookies() {
    deleteCookieByName(sessionIdCookieName, '/');
    deleteCookieByName(uuidCookieName, '/');
    deleteCookieByName('five-word-pre-survey', 'pre-survey');
}

function isUuidCookieAvailable() {
    let uuid = getCookieValueByName(uuidCookieName);
    return uuid !== "";
}

/******************************************************************************
 * Window resize protections, Prolific ID entry, and URL parameter management.
 ******************************************************************************/
function hideSurveyShowProlificIdEntry() {
    $("#surveyElement").hide();
    $("#prolific-id-entry").show();
}

function hideProlificIdEntryShowSurvey() {
    $("#prolific-id-entry").hide();
    $("#prolific-id-alert").hide();
    $("#surveyElement").show();
}

function enableParticipation() {
    $("#desktop-resize-warning").hide();

    // Base the view on the UUID cookie.
    if (isUuidCookieAvailable()) {
        hideProlificIdEntryShowSurvey();
    } else {
        hideSurveyShowProlificIdEntry();
    }
}

function disableParticipation() {
    $("#desktop-resize-warning").show();
    $("#surveyElement").hide();
    $("#prolific-id-entry").hide();
    $("#prolific-id-alert").hide();
}

function decideEnableDisable() {
    if ($(window).width() > 1000) {
        enableParticipation();
    } else {
        disableParticipation();
    }
}

function submitProlificIdAndStartSurvey() {
    let prolificId = $("#submitted-prolific-pid").val();

    // Clear the Prolific ID from URL parameter
    if (window.location.href.includes('?')) {
        history.replaceState({},
            document.title,
            "/" + window.location.href.split('/')[3].split('?')[0] + '/');
    }

    // Get the session id from the cookie.
    let sessionId = getCookieValueByName(sessionIdCookieName);

    // Temporary set uuid to sessionID
    setCookieByNameValueExpireDays(uuidCookieName, sessionId, 1);

    hideProlificIdEntryShowSurvey();
}

function documentReady() {
    // Get the Prolific ID from the URL parameter
    let urlParameters = new URLSearchParams(window.location.search);

    let prolificId = '';

    // If the URL contains the Prolific Id
    if (window.location.href.includes('?')) {
        // Delete after testing
        // if(window.location.href.includes('post-survey')) {
        //     prolificId = getCookieValueByName(prolificCookieName);
        // } else {
        //     if (urlParameters.has('PROLIFIC_PID')) {
        //         prolificId = urlParameters.get('PROLIFIC_PID');
        //     }
        // }

        // Restore after testing
        if (urlParameters.has('PROLIFIC_PID')) {
            prolificId = urlParameters.get('PROLIFIC_PID');
        }

        // Populate the text input with the Prolific ID value.
        $("#submitted-prolific-pid").val(prolificId);
    }

    // If the URL contains all of the parameters.
    if (window.location.href.includes('&')) {
        // Get the rest of the URL parameters

        if (urlParameters.has('STUDY_ID')) {
            studyId = urlParameters.get('STUDY_ID');
        }

        let sessionId = '';

        if (urlParameters.has('SESSION_ID')) {
            sessionId = urlParameters.get('SESSION_ID');
        }

        let prolificCompletionCode = '';

        if (urlParameters.has('PROLIFIC_CC')) {
            prolificCompletionCode = urlParameters.get('PROLIFIC_CC');
        }

        // Clear the URL parameters
        history.replaceState({}, document.title, "/" + window.location.href.split('/')[3] + '/?' +
            window.location.href.split('?')[1].split('&')[0]);

        // Set the session Id into a cookie for later
        setCookieByNameValueExpireDays(sessionIdCookieName, sessionId, 1);
    }

    decideEnableDisable();
}

$(document).ready(function() {
    documentReady();
});

$(window).resize(function() {
    decideEnableDisable();
});
