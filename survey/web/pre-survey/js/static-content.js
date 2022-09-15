const presurveyInstructions = `
    <div class="card mb-3">
        <h4 class="card-header">
            Overview
        </h4>
        <div class="card-body">
            <p class="card-text">
                In the following section you will be asked to generate a five-word 
                password (which will be explained on the next page) and then answer
                several questions related to this password and your general password
                management habits. During the survey, you will be asked to re-enter
                this password several times. If you enter the password incorrectly
                too many times, you will be prompted to choose a new password.
            </p>
        </div>
    </div>
`;

const fivewordPwordExplainationText = `
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
                
                This password will be computer generated, but you will have the ability to 
                regenerate this password as many times as you would like until you reach a 
                password that you prefer. We will ask you to confirm this password is the one 
                you want to use for the study by reentering it.           
            </p>
        </div>
    </div>
`;

// Treatment1 - Regenrate five-word
const generatePasswordContextTreatment1 = `
    <div class="card mb-3" id="generate_context_card">
        <h4 class="card-header">
            Context for Generating a Five-Word Password
        </h4>
        <div class="card-body">
            <p class="card-text">
                Imagine you are going to be assigned a five-word password by your 
                school or employer. Click the button to generate your password. 
                We are going to ask you to memorize this password and enter it at 
                later points in the study. You are allowed to regenerate this password 
                as many times as you would like.
            </p>
        </div>
    </div>
`;

const generatePasswordTreatment1 = `
    <div class="card mb-3" id="generate_card">
        <h4 class="card-header">
            Generate Five-Word Password
        </h4>
        <div class="card-body">
            <h5 class="card-title" id="password_v1"></h5>
            <h5 class="card-title" id="password_final"></h5>
            
            <button id="create_password_btn" class="btn btn-success" onclick="create_password_v1(survey)">
                Generate Password
            </button>

            <button id="confirm_password_btn" class="btn btn-primary" onclick="confirm_password_v1()"
            style="display:none">Choose this Password</button>

            <hr class="my-4" style="display:none">

            <input type="text" id="gene_password_input" style="width:100%;display:none">
            <p class="card-text" id="geneMsg"></p>

            <hr class="my-4" style="display:none">
            <button id="remember_password_btn" class="btn btn-warning" onclick="remember_password(survey)"
            style="display:none; margin-top:10px">I have memorized the above password</button>
        </div>
    </div>
`;

// Treatment2 - Regenerate each of the 5 words
const generatePasswordContextTreatment2 = `
    <div class="card mb-3" id="generate_context_card">
        <h4 class="card-header">
            Context for Generating a Five-Word Password
        </h4>
        <div class="card-body">
            <p class="card-text">
            Imagine you are going to be assigned a five-word password by your school or employer.
            Click the button to generate your password. We are going to ask 
            you to memorize this password and enter it at later points in the study. You 
            are allowed to regenerate each of the five words as many times as you would like.
            </p>
        </div>
    </div>
`;

const generatePasswordTreatment2 = `
    <div class="card mb-3" id="generate_card">
        <h4 class="card-header">
            Generate Five-Word Password
        </h4>   
        <div class="card-group">
            <div class="card text-center mb-3" id="password_card1">
                <div class="card-body">
                    <h5 class="card-title" id="password_word1"></h5>
                    <button id="create_password_btn1" class="btn btn-warning" onclick="create_password_v2(survey, 1)"
                    style="display:none" disabled>Change this Word</button>
                </div>
            </div>
            <div class="card text-center mb-3" id="password_card2">
                <div class="card-body">
                    <h5 class="card-title" id="password_word2"></h5>
                    <button id="create_password_btn2" class="btn btn-warning" onclick="create_password_v2(survey, 2)"
                    style="display:none" disabled>Change this Word</button>
                </div>
            </div>
            <div class="card text-center mb-3" id="password_card3">
                <div class="card-body">
                    <h5 class="card-title" id="password_word3"></h5>
                    <button id="create_password_btn3" class="btn btn-warning" onclick="create_password_v2(survey, 3)"
                    style="display:none" disabled>Change this Word</button>
                </div>
            </div>
            <div class="card text-center mb-3" id="password_card4">
                <div class="card-body">
                    <h5 class="card-title" id="password_word4"></h5>
                    <button id="create_password_btn4" class="btn btn-warning" onclick="create_password_v2(survey, 4)"
                    style="display:none" disabled>Change this Word</button>
                </div>
            </div>
            <div class="card text-center mb-3" id="password_card5">
                <div class="card-body">
                    <h5 class="card-title" id="password_word5"></h5>
                    <button id="create_password_btn5" class="btn btn-warning" onclick="create_password_v2(survey, 5)"
                    style="display:none" disabled>Change this Word</button>
                </div>
            </div>
        </div>

        <div class="card-body">
            <h5 class="card-title" id="password_final"></h5>
            <button id="create_password_btn" class="btn btn-success" onclick="create_password_v2(survey, 0)">
                Generate Password
            </button>
            
            <button id="confirm_password_btn" class="btn btn-primary" onclick="confirm_password_v2()"
            style="display:none">Choose this Password</button>

            <hr class="my-4" style="display:none">

            <input type="text" id="gene_password_input" style="width:100%;display:none">
            <p class="card-text" id="geneMsg"></p>

            <hr class="my-4" style="display:none">
            <button id="remember_password_btn" class="btn btn-warning" onclick="remember_password(survey)"
            style="display:none; margin-top:10px">I have memorized the above password</button>
        </div>
    </div> 
`;

// Ver 3 - user enters their own five-word password 
const generatePasswordContextTreatment3 = `
    <div class="card mb-3" id="generate_context_card">
        <h4 class="card-header">
            Context for Generating a Five-Word Password
        </h4>
        <div class="card-body">
            <p class="card-text">
            Imagine you are asked to come up with a five-word password by your school or employer.
            The individual words within the password must be between length 3 
            and 8 and will be checked against a dictionary of common words. Please enter your five 
            word password below with each word separated by a ".", follow the example:  
            <b>this.could.bee.your.password</b>  
            
            </p>
        </div>
    </div>
`;

const generatePasswordTreatment3 = `
    <div class="card mb-3" id="generate_card">
        <h4 class="card-header">
            Please Enter Your Preferred Five-Word Password:
        </h4>

        <div class="card-body">
            <input type="text" id="password_entry" style="width:100%"> 
            <p class="card-text" id="error_word" style="text-align:left; color:red"></p>
            <p class="card-text" id="password_display" style="display:none;text-align: left">

            <h5 class="card-title" id="password_final"></h5>

            <button id="create_password_btn" class="btn btn-success" onclick="create_password_v3(survey)">
                Create Password
            </button> 

            <button id="create_another_password_btn" class="btn btn-success" onclick="create_another_password()"
            style="display:none">Create Another Password</button>

            <button id="confirm_password_btn" class="btn btn-primary" onclick="confirm_password_v3()"
            style="display:none">Choose this Password</button>
            
            <hr class="my-4" style="display:none">

            <input type="text" id="gene_password_input" style="width:100%;display:none">
            <p class="card-text" id="geneMsg"></p>

            <hr class="my-4" style="display:none">
            
            <button id="remember_password_btn" class="btn btn-warning" onclick="remember_password(survey)"
            style="display:none; margin-top:10px">I have memorized the above password</button>

            <h4 class="card-text" id="geneMsg"></h4>
            <button id="proceed_btn" class="btn btn-primary" onclick="proceed_password()"
            style="display:none; margin-top:10px">Proceed</button>
        </div>
    </div>
`;


const geneRemeMsg = `
    Please type out your password in the text box above 
    and than press the yellow button below to confirm.
`;

const geneCheckMsg = `
    The password you typed in is <b>not correct</b>.<br>
    Please check again and type the exact password(including dots) 
    shown in blue above into the text box.
`;

const passwordPostGen = `
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


const enterPasswordStartMid = `
    <div class="card mb-3" id="enter_password_card" style="display:none;">
        <h4 class="card-header">
            Please enter your generated password:
        </h4>
        <div class="card-body">
            <input type="password" id="password_input" style="width:100%" autocomplete="off">
            <br><br>
            <input type="checkbox" id="show_password_checkbox" onclick="show_password(survey)">  Show password in plain text
            <br><br>
            <span class="link" id="password_forget" onclick="forgot_password_start(survey);">I forgot my password</span>
            <p class="card-text" id="confirm_forget_prompt" style="display:none">
                Click the <span style="color:red">red button </span> below to confirm you have forgot your password.
            </p>
            <button id="confirm_forget_btn" class="btn btn-danger" onclick="confirm_forget()" style="display:none">
                Confirm forgot password
            </button>
            <button id="did_not_forget_btn" class="btn btn-primary" onclick="did_not_forget()" style="display:none">
                I did not forget my password
            </button>
            <hr class="my-4">
            <button id="password_submit" class="btn btn-success" onclick="check_password_start(survey)">Submit</button>
            <hr class="my-4">
            <p class="card-text" id="password_check"></p>
            <button id="password_newone" class="btn btn-warning" onclick="another_password()" style="display:none">
                Go back to generate another password
            </button>
        </div>
    </div>
`;

const enterPasswordEnd = `
    <div class="card mb-3">
        <h4 class="card-header">
            Please enter your generated password:
        </h4>
        <div class="card-body">
            <input type="password" id="password_input" style="width:100%" autocomplete="off">
            <br><br>
            <input type="checkbox" id="show_password_checkbox" onclick="show_password(survey)">  Show password in plain text
            <br><br>
            <span class="link" id = "password_forget" onclick="forgot_password_end(survey);">I forgot my password</span>
            <p class="card-text" id="confirm_forget_prompt" style="display:none">
                Click the <span style="color:red">red button </span> below to confirm you have forgot your password.
            </p>
            <button id="confirm_forget_btn" class="btn btn-danger" onclick="confirm_forget_end()" style="display:none" disabled>
                Confirm forgot password
            </button>
            <button id="did_not_forget_btn" class="btn btn-primary" onclick="did_not_forget()" style="display:none" disabled>
                I did not forget my password
            </button>
            <hr class="my-4">
            <button id="password_submit" class="btn btn-success" onclick="check_password_end(survey)">Submit</button>
            <hr class="my-4">
            <p class="card-text" id="password_check"></p>
        </div>
    </div>
`;

const afterPwordinstructions = `
    <div class="card mb-3">
        <h4 class="card-header">
            Instructions: 
        </h4>
        <div class="card-body">
            <p class="card-text">
                 The next few questions will ask about the five-word password you just entered.            
            </p>
        </div>
    </div>
`;