// Function to generate a random string used in the root page for generating Prolific IDs.
function generateRandomProlificId() {
    let mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let length = 24;
    let result = '';

    for (let i = length; i > 0; --i) {
        result += mask[Math.floor(Math.random() * mask.length)];
    }

    return result;
}

function deleteCookieByName(cookieName, path) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=" + path + ";";
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

$(document).ready(function() {
    // document.getElementById("pre-survey")
    //     .href = "../pre-survey/index.html?PROLIFIC_PID=" +
    //     generateRandomProlificId() +
    //     "&STUDY_ID=presurvey0123456789&SESSION_ID=" +
    //     generateRandomProlificId() +
    //     "&PROLIFIC_CC=123456789";

    document.getElementById("pre-survey")
        .href = "../pre-survey/index.html?PROLIFIC_PID=" +
        "randomprolificID" +
        "&STUDY_ID=presurvey0123456789&SESSION_ID=" +
        "randomprolificID" +
        "&PROLIFIC_CC=123456789";

    // document.getElementById("post-survey")
    //     .href = "../post-survey/index.html?PROLIFIC_PID=" +
    //     generateRandomProlificId() +
    //     "&STUDY_ID=postsurvey0123456789&SESSION_ID=" +
    //     generateRandomProlificId() +
    //     "&PROLIFIC_CC=1A653587";

    document.getElementById("post-survey")
        .href = "../post-survey/index.html?PROLIFIC_PID=" +
        "randomprolificID" +
        "&STUDY_ID=presurvey0123456789&SESSION_ID=" +
        "randomprolificID" +
        "&PROLIFIC_CC=123456789";

    // Delete old study cookies
    deleteCookieByName('fivewords-study-prolific-session-id', '/');
    deleteCookieByName('fivewords-study-uuid', '/');
    deleteCookieByName('five-word-pre-survey', 'pre-survey');
    deleteCookieByName('five-word-post-survey', 'post-survey');

    // Clear the local storage.
    window.localStorage.clear();
});