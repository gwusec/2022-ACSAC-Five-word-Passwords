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
            html: presurveyInstructions
        }]
    },
    {
        name: "FiveWordPasswordContextPage",
        elements: [{
            type: "html",
            name: "FiveWordPasswordContext",
            html: fivewordPwordExplainationText
        }]
    }, {
        name: "generateEnterStartPage",
        elements: [{
            type: "html",
            name: "generatePasswordStartTreatment1",
            html: generatePasswordContextTreatment1 + generatePasswordTreatment1,
            visibleIf: "{treatmentVer} == 'treatment1'"
        }, {
            type: "html",
            name: "generatePasswordStartTreatment2",
            html: generatePasswordContextTreatment2 + generatePasswordTreatment2,
            visibleIf: "{treatmentVer} == 'treatment2'"
        }, {
            type: "html",
            name: "generatePasswordStartTreatment3",
            html: generatePasswordContextTreatment3 + generatePasswordTreatment3,
            visibleIf: "{treatmentVer} == 'treatment3'"
        }, {
            type: "html",
            name: "enterPasswordStart",
            html: enterPasswordStartMid
        }]
    },
    {
        name: "ScreeningPage1",
        elements: [{
            type: "radiogroup",
            name: "num_unique_pword",
            title: "How many unique passwords do you have?",
            isRequired: true,
            choices: [{
                value: "1",
                text: "I use the same password for every account."
            },
            {
                value: "2-3",
                text: "2-3"
            },
            {
                value: "4-6",
                text: "4-6"
            },
            {
                value: "7-10",
                text: "7-10"
            },
            {
                value: "more than 10",
                text: "More than 10 "
            }
            ]
        }, {
            type: "comment",
            name: "manage_pword",
            title: "Please describe how your password(s) are managed/used across different online accounts.",
            isRequired: true,
            validators: [
                {
                    type: "text",
                    minLength: "5"
                }]
        },
        {
            type: "checkbox",
            name: "store_pword",
            title: "Indicate if you use any of the following password management techniques (Select all that apply).",
            isRequired: true,
            choices: [{
                value: "store_write_down",
                text: "I try to remember my passwords without writing them down or storing them digitally."
            },
            {
                value: "reset_every_time",
                text: "I reset my password every time I log in rather than remembering my password."
            },
            {
                value: "physical_note",
                text: "I keep physical notes of my passwords."
            },
            {
                value: "save_as_file",
                text: "I store my passwords as a digital file or files."
            },
            {
                value: "save_in_browser",
                text: "I save my passwords in the browser (for example, passwords saved in Chrome)."
            },
            {
                value: "third_party_manager",
                text: "I use a third-party password manager (for example, Lastpass or 1Password)."
            },
            {
                value: "system_provide_manager",
                text: "I use a system provided password manager (for example, Apple's Keychain)."
            },
            {
                value: "none_of_the_above",
                text: "None of the above"
            }
            ],
            hasOther: true,
            otherText: "Other: please specify"
        }
        ]
    },
    {
        name: "ScreeningPage1-2",
        elements: [{
            type: "comment",
            name: "imagine_create_pword",
            title: "Imagine you just joined a company or organization and are required by the IT department to create an account, how would you create a password for this account?",
            isRequired: true,
            validators: [
                {
                    type: "text",
                    minLength: "5"
                }]
        }, {
            type: "comment",
            name: "how_create_strong_pword",
            title: "Think of the strongest password you have. How did you create this password?",
            isRequired: true,
            validators: [
                {
                    type: "text",
                    minLength: "5"
                }]
        }],
    },
    {
        name: "generateEnterMidPage",
        elements: [{
            type: "html",
            name: "generatePasswordStartTreatment1",
            html: generatePasswordContextTreatment1 + generatePasswordTreatment1,
            visibleIf: "{treatmentVer} == 'treatment1'"
        }, {
            type: "html",
            name: "generatePasswordStartTreatment2",
            html: generatePasswordContextTreatment2 + generatePasswordTreatment2,
            visibleIf: "{treatmentVer} == 'treatment2'"
        }, {
            type: "html",
            name: "generatePasswordStartTreatment3",
            html: generatePasswordContextTreatment3 + generatePasswordTreatment3,
            visibleIf: "{treatmentVer} == 'treatment3'"
        }, {
            type: "html",
            name: "enterPasswordMid",
            html: enterPasswordStartMid
        }]
    },
    {
        name: "afterPwordinstructions",
        elements: [{
            type: "html",
            name: "afterPwordinstructions",
            html: afterPwordinstructions
        }]
    },
    {
        name: "ImmediateReactionPage1",
        elements: [{
            type: "comment",
            name: "why_this_pword_tre1",
            title: "Briefly describe your reasons for stopping on this generated five-word password.",
            isRequired: true,
            visibleIf: "{treatmentVer} == 'treatment1'",
            validators: [
                {
                    type: "text",
                    minLength: "5"
                }]
        }, {
            type: "comment",
            name: "why_this_pword_tre2",
            title: "Briefly describe your reasons for stopping on each word.",
            isRequired: true,
            visibleIf: "{treatmentVer} == 'treatment2'",
            validators: [
                {
                    type: "text",
                    minLength: "5"
                }]
        }, {
            type: "comment",
            name: "why_this_pword_tre3",
            title: "Briefly describe your reasons for choosing the words you decided on.",
            isRequired: true,
            visibleIf: "{treatmentVer} == 'treatment3'",
            validators: [
                {
                    type: "text",
                    minLength: "5"
                }]
        },
        {
            type: "radiogroup",
            name: "secure_pword_rating",
            title: "Compared to other accounts where you use a password, please indicate how secure the generated five-word password is",
            isRequired: true,
            choices: [{
                value: "Much less secure",
                text: "Much less secure"
            },
            {
                value: "Somewhat less secure",
                text: "Somewhat less secure"
            },
            {
                value: "About equally secure",
                text: "About equally secure"
            },
            {
                value: "Somewhat more secure",
                text: "Somewhat more secure"
            },
            {
                value: "Much more secure",
                text: "Much more secure"
            }
            ]
        },
        {
            type: "checkbox",
            name: "comfortable_platforms",
            title: "What platforms are you comfortable using this generated five-word password with? (Select all that apply)",
            isRequired: true,
            choices: [{
                value: "email_accounts",
                text: "Email accounts"
            },
            {
                value: "bank_accounts",
                text: "Bank accounts"
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
            otherText: "Other: please specify"
        },
        {
            type: "comment",
            name: "mem_actions_taken",
            title: "Please describe any methods you used to memorize the generated five-word password",
            isRequired: true,
            validators: [
                {
                    type: "text",
                    minLength: "5"
                }]
        }, {
            type: "comment",
            name: "why_effective",
            title: "Why do you think the technique(s) above was effective?",
            isRequired: true,
            validators: [
                {
                    type: "text",
                    minLength: "5"
                }]
        },
        ]
    },
    {
        name: "LaterReactionPage1",
        elements: [{
            type: "radiogroup",
            name: "how_likely_remem_1week",
            title: "If you were asked to recall this generated five-word password in one week, how likely would you be to remember it?",
            isRequired: true,
            choices: [{
                value: "Very likely",
                text: "Very likely"
            },
            {
                value: "Somewhat likely",
                text: "Somewhat likely"
            },
            {
                value: "Neutral",
                text: "Neutral"
            },
            {
                value: "Somewhat unlikely",
                text: "Somewhat unlikely"
            },
            {
                value: "Very unlikely",
                text: "Very unlikely"
            }
            ]
        },
        {
            type: "radiogroup",
            name: "how_likely_to_use",
            title: "How likely would you be to use a five-word password outside of this study?",
            isRequired: true,
            choices: [{
                value: "Very likely",
                text: "Very likely"
            },
            {
                value: "Somewhat likely",
                text: "Somewhat likely"
            },
            {
                value: "Neutral",
                text: "Neutral"
            },
            {
                value: "Somewhat unlikely",
                text: "Somewhat unlikely"
            },
            {
                value: "Very unlikely",
                text: "Very unlikely"
            }
            ]
        }
        ]
    },
    {
        name: "DemographicsPage",
        elements: [{
            type: "radiogroup",
            name: "Demo_gender",
            title: "What is your gender?",
            isRequired: true,
            choices: [{
                value: "Woman",
                text: "Woman"
            },
            {
                value: "Man",
                text: "Man"
            },
            {
                value: "Non-binary",
                text: "Non-binary"
            },
            {
                value: "Prefer not to disclose",
                text: "Prefer not to disclose"
            }
            ],
            hasOther: true,
            otherText: "Prefer to self-describe"
        },
        {
            type: "radiogroup",
            name: "Demo_age",
            title: "How old are you?",
            isRequired: true,
            choices: [{
                value: "18 - 24",
                text: "18 - 24"
            },
            {
                value: "25 - 34",
                text: "25 - 34"
            },
            {
                value: "35 - 44",
                text: "35 - 44"
            },
            {
                value: "45 - 54",
                text: "45 - 54"
            },
            {
                value: "55 - 64",
                text: "55 - 64"
            },
            {
                value: "65 or older",
                text: "65 or older"
            },
            {
                value: "Prefer not to disclose",
                text: "Prefer not to disclose"
            }
            ]
        },
        {
            type: "radiogroup",
            name: "Demo_edu",
            title: "What is the highest degree or level of school you have completed?",
            isRequired: true,
            choices: [{
                value: "No schooling completed",
                text: "No schooling completed"
            },
            {
                value: "Some high school",
                text: "Some high school"
            },
            {
                value: "High school",
                text: "High school"
            },
            {
                value: "Some college",
                text: "Some college"
            },
            {
                value: "Trade, technical, or vocational training",
                text: "Trade, technical, or vocational training"
            },
            {
                value: "Associate's Degree",
                text: "Associate's Degree"
            },
            {
                value: "Bachelor's Degree",
                text: "Bachelor's Degree"
            },
            {
                value: "Master's Degree",
                text: "Master's Degree"
            },
            {
                value: "Professional degree",
                text: "Professional degree"
            },
            {
                value: "Doctorate",
                text: "Doctorate"
            },
            {
                value: "Prefer not to disclose",
                text: "Prefer not to disclose"
            }
            ],
            hasOther: true,
            otherText: "Other (please specify)"
        },
        {
            type: "radiogroup",
            name: "Demo_background",
            title: "Which of the following best describes your educational background or job field?",
            isRequired: true,
            choices: [{
                value: "I have an education in, or work in, the field of computer science, computer engineering or IT.",
                text: "I have an education in, or work in, the field of computer science, computer engineering or IT."
            },
            {
                value: "I do not have an education in, nor do I work in, the field of computer science, computer engineering or IT.",
                text: "I do not have an education in, nor do I work in, the field of computer science, computer engineering or IT."
            },
            {
                value: "Prefer not to disclose",
                text: "Prefer not to disclose"
            }
            ]
        }
        ]
    },
    {
        name: "EnterPasswordEnd",
        elements: [{
            type: "html",
            name: "enterPasswordEnd",
            html: enterPasswordEnd
        }]
    }
    ],
    triggers: [
        {
            'type': 'runexpression',
            'expression': '{store_pword} contains [\'none_of_the_above\']',
            'runExpression': 'checkboxSelectNone(\'store_pword\', {store_pword})'
        }, {
            'type': 'runexpression',
            'expression': '{comfortable_platforms} contains[\'none_of_the_above\']',
            'runExpression': 'checkboxSelectNone(\'comfortable_platforms\', {comfortable_platforms})'
        }
    ],
    cookieName: "five-word-password",
    sendResultOnPageNext: true,
    showPrevButton: false,
    showQuestionNumbers: "off",
    showProgressBar: "both",
    firstPageIsStarted: true
}