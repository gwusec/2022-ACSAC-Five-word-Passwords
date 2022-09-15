const postsurveyInstructions = `
    <div class="card mb-3">
        <h4 class="card-header">
            Context
        </h4>
        <div class="card-body">
            <p class="card-text">
                In the previous survey, you have generated a five-word password as well as 
                answered questions revolving around your general password habits and 
                about the five-word password you generated. In this survey, you will 
                be typing out the exact same five-word password and answer several 
                questions about five-word passwords in general.
            </p>
        </div>
    </div>
`;

const fivewordPwordExplainationTextPost = `
    <div class="card mb-3">
        <h4 class="card-header">
            Five-Word Password Explanation: 
        </h4>
        <div class="card-body">
            <p class="card-text">
                A five-word password is a password that follows a specific format consisting 
                of 5 separate words connected by the ‘.’ symbol. The following is an example 
                of a potential password:

                <p style="text-align:center"><b>this.could.bee.your.password</b></p>        
            </p>
        </div>
    </div>
`;

const generatePassword = `
    <p id="div"> Your suggested password is: <p id="password"> </p> </p>
    <button id="create_password">Generate Password</button>
`;

const passwordPostEntered = `
    <div class="card mb-3">
        <h4 class="card-header">
            Your five-word password is:
        </h4>
        <div class="card-body">
            <p class="card-text" id="passwordPostGen">
            </p>
        </div>
    </div>
`;

const enterPasswordPostSurvey = `
    <div class="card mb-3" id="enter_pword_card">
        <h4 class="card-header">
            Please enter your five-word password:
        </h4>
        <div class="card-body">
            <input type="password" id="password_input" style="width:100%">
            <br><br>
            <input type="checkbox" id="show_password_checkbox" onclick="show_password()">  Show password in plain text
            <br><br>
            <span class="link" id="password_forget" onclick="forgot_password_post_survey(survey);">I forgot my password</span>
            <p class="card-text" id="confirm_forget_prompt" style="display:none">
                Click the <span style="color:red">red button </span> below to confirm you have forgot your password.
            </p>
            <button id="confirm_forget_btn" class="btn btn-danger" onclick="confirm_forget()" style="display:none" disabled>
                Confirm forgot password
            </button>
            <button id="did_not_forget_btn" class="btn btn-primary" onclick="did_not_forget()" style="display:none" disabled>
                I did not forget my password
            </button>
            <hr class="my-4">
            <button id="password_submit" class="btn btn-success" onclick="check_password_post_survey(survey)">Submit</button>
            <hr class="my-4">
            <p class="card-text" id="password_check"></p>
        </div>
    </div>
`;

const showPasswordPostSurvey = `
    <div class="card mb-3" id="show_pword_card" style="display:none">
        <h4 class="card-header">
            Your five-word password is:
        </h4>
        <div class="card-body">
            <p class="card-text" id="passwordPostGen"></p>
            <button id="remember_password_btn" class="btn btn-warning" onclick="confirm_remember(survey)" margin-top:10px">
                I have memorized the above password
            </button>
        </div>
    </div>
`;