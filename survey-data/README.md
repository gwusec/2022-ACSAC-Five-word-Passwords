## Introduction
This folder contains data collected from participants during both parts of our survey. Two tables below explain what each header label correspond to in the survey or during the data collection.

## Pre-survey

### presurvey_data.csv
| Header label | Survey Question                                                                                                                                                                            |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| participant_id | Unique ID assigned to participants upon entering the survey. |
| consent_age | Participant give consent on their age being at least 18 years old. |
| consent_read | Participant confirm that they have read the informed consent. |
| consent_participation | Participant give consent on their willingness to complete the survey. |
| treatment_ver | The number of treatment partcipant were assigned to. |
| num_unique_pword | How many unique passwords do you have? |
| manage_pword | Please describe how your password(s) are managed/used across different online accounts [free text] |
| imagine_create_pword | Imagine you just joined a company or organization and are required by the IT department to create an account, how would you create a password for this account? [free text] |
| how_create_strong_pword | Think of the strongest password you have. How did you create this password? [free text] |
| why_this_pword_tre1 | Treatment 1: Briefly describe your reasons for stopping on this password. |
| why_this_pword_tre2 | Treatment 2: Briefly describe your reasons for stopping on each word. |
| why_this_pword_tre3 | Treatment 3: Briefly describe your reasons for choosing the words you decided on. |
| secure_pword_rating | Compared to other accounts where you use a password, please indicate how secure you view the generated five-word password. |
| mem_actions_taken | Please describe any methods you used to memorize the generated five-word password [free text] |
| how_likely_remem_1week | If you were asked to recall this generated five-word password in one week, how likely would you be to remember it? |
| how_likely_to_use | How likely would you be to use a five-word password outside of this study? |
| demo_gender | What is your gender? |
| demo_age | How old are you? |
| demo_education | What is the highest degree or level of school you have completed? |
| demo_background | Which of the following best describes your educational background or job
field? |
| store_write_down | Indicate if you use any of the following password management techniques (Select all that apply) |
| reset_every_time | Indicate if you use any of the following password management techniques (Select all that apply) |
| physical_note | Indicate if you use any of the following password management techniques (Select all that apply) |
| save_as_file | Indicate if you use any of the following password management techniques (Select all that apply) |
| save_in_browser | Indicate if you use any of the following password management techniques (Select all that apply) |
| third_party_manager | Indicate if you use any of the following password management techniques (Select all that apply) |
| system_provide_manager | Indicate if you use any of the following password management techniques (Select all that apply) |
| none_of_the_above | Indicate if you use any of the following password management techniques (Select all that apply) |
| other_value | Indicate if you use any of the following password management techniques (Select all that apply) |
| email_accounts | What platforms would you be comfortable using this generated five-word password? (Select all that apply) |
| bank_accounts | What platforms would you be comfortable using this generated five-word password? (Select all that apply) |
| work_accounts | What platforms would you be comfortable using this generated five-word password? (Select all that apply) |
| retail_website_accounts | What platforms would you be comfortable using this generated five-word password? (Select all that apply) |
| social_media_accounts | What platforms would you be comfortable using this generated five-word password? (Select all that apply) |
| none_of_the_above | What platforms would you be comfortable using this generated five-word password? (Select all that apply) |
| other_value | What platforms would you be comfortable using this generated five-word password? (Select all that apply) |
| tot_new_pword_cnt | Number of passwords participant generated during the pre-survey. |
| start_attempt_cnt | Number of attempts participant used in the first recall phase. |
| start_new_pword_cnt | Number of passwords participant generated after failing the first recall phase. |
| start_tre2_word1_cnt | Number of clicks participant used for changing the first word in treatment 2 during the start of the survey. |
| start_tre2_word2_cnt | Number of clicks participant used for changing the second word in treatment 2 during the start of the survey. |
| start_tre2_word3_cnt | Number of clicks participant used for changing the third word in treatment 2 during the start of the survey. |
| start_tre2_word4_cnt | Number of clicks participant used for changing the fourth word in treatment 2 during the start of the survey. |
| start_tre2_word5_cnt | Number of clicks participant used for changing the fifth word in treatment 2 during the start of the survey. |
| start_show_pword | Whether or not participant clicked on the box to show their password in plain text in the first recall phase. |
| mid_attempt_cnt | Number of attempts participant used in the second recall phase. |
| mid_new_pword_cnt | Number of passwords participant generated after failing the second recall phase. |
| mid_tre2_word1_cnt | Number of clicks participant used for changing the first word in treatment 2 in the middle of the survey. |
| mid_tre2_word2_cnt | Number of clicks participant used for changing the second word in treatment 2 in the middle of the survey. |
| mid_tre2_word3_cnt | Number of clicks participant used for changing the third word in treatment 2 in the middle of the survey. |
| mid_tre2_word4_cnt | Number of clicks participant used for changing the fourth word in treatment 2 in the middle of the survey. |
| mid_tre2_word5_cnt | Number of clicks participant used for changing the fifth word in treatment 2 in the middle of the survey. |
| mid_show_pword | Whether or not participant clicked on the box to show their password in plain text in the second recall phase |
| end_attempt_cnt | Number of attempts participant used in the third recall phase |
| end_show_pword |  Whether or not participant clicked on the box to show their password in plain text in the third recall phase |

### presurvey_demo_data.csv
* File containing only demographics data from the pre-survey.

| Header label | Survey Question |
|--------------| --------------- |
| demo_gender | What is your gender? |
| demo_age | How old are you? |
| demo_education | What is the highest degree or level of school you have completed? |
| demo_background | Which of the following best describes your educational background or job field? |

### postsurvey_data.csv
| Header label | Survey Question                                                                                                                                                                            |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| participant_id | Unique ID assigned to participants in the pre-survey. |
| consent_age | Participant give consent on their age being at least 18 years old. |
| consent_read | Participant confirm that they have read the informed consent. |
| consent_participation | Participant give consent on their willingness to complete the survey. |
| used_outside_study | Have you used your five-word password on any platforms outside of this study? |
| motivation_use_accounts | What is your motivation for using your five-word password for the accounts you mentioned? [free text] |
| what_to_change_specific | What do you want to change (if any) about your five-word password? [free text] |
| how_confident_secure | How confident are you that five-word passwords are capable of keeping your online accounts safe? |
| elaborate_confident_secure | Please elaborate on your choice of how confident you are about five-word passwords [free text] |
| how_confident_remember | Do you feel confident in remembering several different five-word passwords for your online accounts? |
| elaborate_confident_remember | Please elaborate on your choice of how confident you are [free text] |
| what_to_change_general | What do you want to change (if any) about five-word passwords? [free text] |
| email_accounts | On what platforms have you used (would you use) your five-word password (Select all that apply)? |
| bank_accounts | On what platforms have you used (would you use) your five-word password (Select all that apply)? |
| work_accounts | On what platforms have you used (would you use) your five-word password (Select all that apply)? |
| retail_website_accounts | On what platforms have you used (would you use) your five-word password (Select all that apply)? |
| social_media_accounts | On what platforms have you used (would you use) your five-word password (Select all that apply)? |
| platform_none_of_the_above | On what platforms have you used (would you use) your five-word password (Select all that apply)? |
| platform_other_value | On what platforms have you used (would you use) your five-word password (Select all that apply)? |
| store_write_down | What method (if any) did you use to help you memorize the five-word password you just entered? |
| physical_note | What method (if any) did you use to help you memorize the five-word password you just entered? |
| save_as_file | What method (if any) did you use to help you memorize the five-word password you just entered? |
| save_in_browser | What method (if any) did you use to help you memorize the five-word password you just entered? |
| third_party_manager | What method (if any) did you use to help you memorize the five-word password you just entered? |
| system_provide_manager | What method (if any) did you use to help you memorize the five-word password you just entered? |
| mem_act_none_of_the_above | What method (if any) did you use to help you memorize the five-word password you just entered? |
| mem_act_other_value | What method (if any) did you use to help you memorize the five-word password you just entered? |