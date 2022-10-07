## Survey

* [Survey Code](./web/)

Our survey contains two parts, a pre-survey and a post-survey done two weeks after the pre-survey.

### Installation/Running Instruction:

Ensure that you have Docker installed on your machine first.

Instructions on how to install Docker can be found [here](https://docs.docker.com/engine/install/).

Change into the docker directory
```
cd /fivewords-docker
```

Build the docker environment

```
docker-compose build
```

If this is the first time running:

```
docker-compose up -d
docker-compose run --workdir /backend/backend django  python manage.py makemigrations myapp
docker-compose run --workdir /backend/backend django  python manage.py migrate
```

Otherwise, you can just bring up the entire environment

```
docker-compose up -d
```

To bring down the environment

```
docker-compose stop
```

With the environment up, you can:

 * Access the survey: [localhost/root](localhost/root)
   * Choose the start of the pre or post-survey   
 * Access the database via phpmyadmin to see stored results: [localhost:8080](localhost:8080)
   * username: user
   * password: user-password

Note for Prolific ID entry at the beginning of both survey: the input box for Prolific ID is prefilled with the string "randomprolificID", please do not change that field as the post-survey uses the Prolific ID to identify and retrieve passwords generated in the pre-survey. For the purpose of running this study locally (without integration with Prolific), the field is prefilled and shall not be changed.

Note for five-word passwords: please remember of use external help to keep track of the five-word password you generated. In order to proceed with the pre-survey, the five-word password needs to be typed out correctly.

### File Structure:
* **completion**
  * *index.html* - Static dummy completion page for both the pre-survey and post-survey. This page informs participants that they have completed the survey during our internal testing stage.
* **css**
  * *custom.css* - Custom stylesheet that supports functionalities of both survey using the SurveyJS library.
  * *gw-style.css* - Custom stylesheet that provides navigation bar styling specifically for the George Washington University GWUSEC Lab.
* **ext-css** - Folder containing external stylesheets for Bootstarp and SurveyJs used for styling.
* **ext-js** - Folder containing external javascripts for Bootstrap and SurveyJs used for survey functionalitites.
* **fonts** - Folder containing font packages used for survey text.
* **icons** - Folder containing icons used for survey.
* **js**
  * *custom-widget.js* - Script that setup widgets and styling of the survey.
  * *pako.js* and *small_words.js* - Scripts used for zipping the dictionary we used.
  * *static-content.js* - Static elements of the survey including survey instructions, extension installation instructions, warning messages and context for certain sections.
  * *survey-common.js* - Functions used in both pre-survey and post-survey are included in this script.
    * Load and save the state of the survey so users do not lose progress when reloading the survey page.
    * Withdraw user from the survey when they click the withdraw button.
    * Redirect user back to Prolific upon survey completion. There is a 30 seconds countdown that starts automatically upon completion of the survey.
  * *survey-settings.js* - Settings file including four different URLs pointing to entry points for sending data to the database.
  * *window-management.js* - Functions used in both pre-survey and post-survey that handles Cookie storage, browser compatibility checking and browser window size checking. 
* **post-survey**
  * **js**
    * *post-survey.js* - Script responsible for post-survey functionalities such as receiving and sending data to the database, checking user input passwords against the correct password, handling user requests when they forgot their five-word passwords and sending participants' response to the database.
    * *static-content.js* - This file contains all the static html including instructions, contexts and prompts for the post-survey.
    * *survey-config.js* - This file contains all the survey configuration of the post-survey utilizing the SurveyJS library in a JSON format.
  * *index.html* -  Main html page for the post-survey including all the stylesheets and scripts needed, static elements as well as `div` elements to hold the survey content.
* pre-survey
  * **js**
    * *pre-survey.js* - Script responsible for pre-survey functionalities such as sending participants' response to the database, checking user input passwords against the correct password and handling user requests when they forgot their five-word passwords.
    * *static-content.js* - This file contains all the static html including instructions, contexts and prompts for the pre-survey.
    * *survey-config.js* - This file contains all the survey configuration utilizing the SurveyJS library in a JSON format.
  * *index.html* - Main html page for the pre-survey including all the stylesheets and scripts needed, static elements as well as `div` elements to hold the survey content.
* **root**
  * **js**
    * *root.js* - Functions used for internal testing purpose and redirecting to pre or post-survey upon user request.
  * *index.html* - Root page of the entire survey, only available for developers as a mean to select pre-survey or post-survey for testing.
* *index.html* - Automatically redirects to the index page under **root** folder.