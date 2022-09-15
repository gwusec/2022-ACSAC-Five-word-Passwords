const surveyJSON = {
    title: "Five-Word Password Survey",
    focusFirstQuestionAutomatic: false,
    completedHtml: successfulCompletionMessage + feedbackForm + redirectToProlific,
    completedHtmlOnCondition: [{
        expression: "{hasWithdrawn} = true",
        html: withdrawnCompletionMessage + feedbackForm
    }],
    pages: [{
        name: "consentPage",
        elements: [{
            type: "comment",
            name: "prolificId",
            visible: false
        },
        {
            type: "html",
            name: "informedConsentText",
            html: informedConsentText
        },
        {
            type: "matrixdropdown",
            name: "informedConsent",
            title: "Statement by person agreeing to participate in this study",
            hideNumber: true,
            isRequired: true,
            requiredErrorText: "Please answer the following questions.",
            validators: [{
                type: "expression",
                text: "Not all requirements for participation are fulfilled.",
                expression: "{informedConsent.age.confirmation} = true and {informedConsent.read.confirmation} = true and {informedConsent.participation.confirmation} = true"
            }],
            showHeader: false,
            columns: [{
                name: "confirmation"
            }],
            cellType: "boolean",
            rows: [{
                value: "age",
                text: "I am 18 years of age, or older"
            },
            {
                value: "read",
                text: "I have read and understand the informed consent"
            },
            {
                value: "participation",
                text: "I consent to participate in the research"
            }
            ]
        }
        ]
    },
    {
        name: "surveyInstructionsPage",
        elements: [{
            type: "html",
            name: "surveyInstructions",
            html: postsurveyInstructions
        }]
    },
    {
        name: "enterPasswordPage",
        elements: [{
            type: "html",
            name: "enterPasswordPostSurvey",
            html: enterPasswordPostSurvey
        },{
            type: "html",
            name: "showPasswordPostSurvey",
            html: showPasswordPostSurvey
        }]
    },
    {
        name: "MemoryMethodPage",
        elements: [{
            type: "html",
            name: "passwordPostEntered",
            html: passwordPostEntered
        }, {
            type: "checkbox",
            name: "memory_method",
            title: "What method did you use to help memorize the five-word password you just entered (Select all that apply)?",
            isRequired: true,
            choices: [{
                value: "store_write_down",
                text: "I remembered it without writing it down or storing it digitally."
            },
            {
                value: "physical_note",
                text: "I wrote it down as a physical note."
            },
            {
                value: "save_as_file",
                text: "I stored my five-word password as a digital file."
            },
            {
                value: "save_in_browser",
                text: "I saved my five-word password in the browser (for example, passwords saved in Chrome)."
            },
            {
                value: "third_party_manager",
                text: "I used a third-party password manager (for example, Lastpass or 1Password)."
            },
            {
                value: "system_provide_manager",
                text: "I used a system provided password manager (for example, Apple's Keychain)."
            },
            {
                value: "none_of_the_above",
                text: "None of the above"
            }
            ],
            hasOther: true,
            otherText: "Other: please specify"
        },
        {
            type: "radiogroup",
            name: "used_outside_study",
            title: "Have you used your five-word password on any platforms outside of this study?",
            isRequired: true,
            choices: [{
                value: "Yes",
                text: "Yes"
            },
            {
                value: "No",
                text: "No"
            }
            ]
        }
        ]
    },
    {
        name: "WhatPlatformPage",
        elements: [{
            type: "html",
            name: "passwordPostEntered",
            html: passwordPostEntered
        }, {
            type: "checkbox",
            name: "what_platform_used",
            title: "On what platforms have you used your five-word password? (Select all that apply)?",
            isRequired: true,
            choices: [{
                value: "bank_accounts",
                text: "Bank accounts"
            }, {
                value: "email_accounts",
                text: "Email accounts"
            },
            {
                value: "work_accounts",
                text: "Work accounts"
            },
            {
                value: "retail_website_accounts",
                text: "Retail website accounts"
            },
            {
                value: "social_media_accounts",
                text: "Social media accounts"
            }
            ],
            hasOther: true,
            otherText: "Other: please specify",
            visibleIf: "{used_outside_study} == 'Yes'"
        }, {
            type: "checkbox",
            name: "what_platform_would_use",
            title: "On what platforms (if any) would you use your five-word password (Select all that apply)?",
            isRequired: true,
            choices: [{
                value: "bank_accounts",
                text: "Bank accounts"
            }, {
                value: "email_accounts",
                text: "Email accounts"
            },
            {
                value: "work_accounts",
                text: "Work accounts"
            },
            {
                value: "retail_website_accounts",
                text: "Retail website accounts"
            },
            {
                value: "social_media_accounts",
                text: "Social media accounts"
            },
            {
                value: "none_of_the_above",
                text: "None of the above"
            }
            ],
            hasOther: true,
            otherText: "Other: please specify",
            visibleIf: "{used_outside_study} == 'No'"
        }]
    },
    {
        name: "MotivationPage",
        elements: [{
            type: "html",
            name: "passwordPostEntered",
            html: passwordPostEntered
        }, {
            type: "comment",
            name: "motivation_use_accounts",
            title: "What is your motivation for using your five-word password for your {list_of_platforms}",
            isRequired: true,
            visibleIf: "{list_of_platforms} != 'None'",
            validators: [
                {
                    type: "text",
                    minLength: "5"
                }]
        }, {
            type: "comment",
            name: "what_to_change_specific",
            title: "What do you want to change (if any) about your five-word password?",
            isRequired: true,
            validators: [
                {
                    type: "text",
                    minLength: "5"
                }]
        }
        ],
    },
    {
        name: "FiveWordPasswordContextPage",
        elements: [{
            type: "html",
            name: "FiveWordPasswordContextPost",
            html: fivewordPwordExplainationTextPost
        }]
    },
    {
        name: "GeneralQuesPage1",
        elements: [{
            type: "radiogroup",
            name: "how_confident_secure",
            title: "How confident are you that five-word passwords are capable of keeping your online accounts safe?",
            isRequired: true,
            choices: [{
                value: "Not confident",
                text: "Not confident"
            },
            {
                value: "Slightly confident",
                text: "Slightly confident"
            },
            {
                value: "Moderately confident",
                text: "Moderately confident"
            },
            {
                value: "Confident",
                text: "Confident"
            },
            {
                value: "Very confident",
                text: "Very confident"
            }
            ]
        }, {
            type: "comment",
            name: "elaborate_confident_secure",
            title: "Please elaborate on your choice of how confident you are about five-word passwords.",
            isRequired: true,
            validators: [
                {
                    type: "text",
                    minLength: "5"
                }]
        }
        ],
    },
    {
        name: "GeneralQuesPage2",
        elements: [{
            type: "radiogroup",
            name: "how_confident_remember",
            title: "Do you feel confident in remembering several different five-word passwords for your online accounts?",
            isRequired: true,
            choices: [{
                value: "Not confident",
                text: "Not confident"
            },
            {
                value: "Slightly confident",
                text: "Slightly confident"
            },
            {
                value: "Moderately confident",
                text: "Moderately confident"
            },
            {
                value: "Confident",
                text: "Confident"
            },
            {
                value: "Very confident",
                text: "Very confident"
            }
            ]
        }, {
            type: "comment",
            name: "elaborate_confident_remember",
            title: "Please elaborate on your choice of how confident you are.",
            isRequired: true,
            validators: [
                {
                    type: "text",
                    minLength: "5"
                }]
        }, {
            type: "comment",
            name: "what_to_change_general",
            title: "What do you want to change (if any) about five-word passwords?",
            isRequired: true,
            validators: [
                {
                    type: "text",
                    minLength: "5"
                }]
        }
        ],
    }
    ],
    triggers: [
        {
            'type': 'runexpression',
            'expression': '{memory_method} contains [\'none_of_the_above\']',
            'runExpression': 'checkboxSelectNone(\'memory_method\', {memory_method})'
        }, {
            'type': 'runexpression',
            'expression': '{what_platform_would_use} contains [\'none_of_the_above\']',
            'runExpression': 'checkboxSelectNone(\'what_platform_would_use\', {what_platform_would_use})'
        }
    ],
    cookieName: "five-word-password",
    sendResultOnPageNext: true,
    showPrevButton: false,
    showQuestionNumbers: "off",
    showProgressBar: "none",
    firstPageIsStarted: true
}