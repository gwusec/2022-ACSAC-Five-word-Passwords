const informedConsentText = `
    <p class="lead">
        The following information is provided to inform you about the research project and your participation 
        in it. Your participation in this research study is voluntary. You are free to withdraw from this study 
        at any time prior to submitting the survey.
    </p>
    <h5>
        1. Purpose of the Study
    </h5>
    <p>
        You are being asked to participate in a research study investigating people's perception and reaction 
        towards a five-word password. This page will give you key information to help you decide whether or not 
        you want to participate.    
    </p>
    <p>
        The goal of this research is to measure your perceptions and reactions toward a computer or user generated 
        password which contains five commonly seen words.
    </p>
    <h5>
        2. Who Is Eligible to Participate?
    </h5>
    <p>
        You may be asked a set of questions that will determine eligibility. Based on your responses you may be 
        invited back to participate in a later study. If you are eligible, we will contact you through Prolific 
        in one to two weeks to complete the later study.
    </p>
    <p>
        This study requires the use of a web browser (Chrome, Firefox, Edge and Safari recommended) on a desktop 
        or laptop computer. You may not participate on a mobile device or tablet.
    </p>
    <p>
        You must be at least 18 years or older to participate in this study.
    </p>

    <h5>
        3. Description of Procedures to Be Followed and Approximate Time Duration Involved for the Participants
    </h5>
    <p>
        The first survey should take approximately 10 minutes to complete and the followup survey should take about 5 
        minutes to complete.
    </p>
    <h5>
        4. Expected Costs
    </h5>
    <p>
        There are no costs for your participation.
    </p>

    <h5>
        5. Description of the Discomforts, Inconveniences, and/or Risks That Can Be Reasonably Expected as a Result of
        Participation
    </h5>
    <p>
        The survey requires cognitive load and memorization of a five-word password that contains five 
        commonly used English words.There will be multiple times within the survey where you will be asked 
        to enter the five-word password generated at the beginning of the survey. You will have 5 trials 
        to correctly type out your five-word password each time. If you cannot remember the password or 
        failed all 5 trials, a new five-word password can be generated.
    </p>
    <h5>
        6. Anticipated Benefits From This Study
    </h5>
    <p>
        Through the course of the study, you may become more aware of ways to generate or create new passwords. 
        You may also become more aware of your own password management habits.
    </p>
    <h5>
        7. Compensation for Participation
    </h5>
    <p>
        You will be compensated $2.50 for completion of the first questionnaire. If you are invited back to complete 
        the followup study, you will be compensated an amount of $1.00. Total compensation is $3.50  for completing 
        the first survey and the followup study.
    </p>
    <h5>
        8. Circumstances Under Which the Principal Investigator May Withdraw You From the Study
    </h5>
    <p>
        If you complete the first survey but are not invited to the followup survey, you are not withdrawn from the study, 
        and your responses are still considered.
    </p>
    <p>
        If you fail attention tests or other checks in the first survey or followup survey, you may be withdrawn from the 
        study by either having your data removed and/or rejecting your responses on Prolific.
    </p>
    <h5>
        9. What Happens if You Choose to Withdraw From the Study
    </h5>
    <p>
        You may withdraw from the study at any point prior to the final submission of the first survey and/or the followup 
        survey. Upon withdrawal your partially completed survey data will be removed and will not be used in the study.
    </p>
    <p>
        If you wish to withdraw from the first survey or followup survey, you may just abandon the survey and not complete it.
    </p>
    <p>
        In both cases we ask that you also return the task in Prolific so that others may take the survey.
    </p>
    <h5>
        10. Contact Information
    </h5>
    <p>
        This research is being conducted by Dr. Adam J. Aviv in the Computer Science Department at The George Washington
        University. You may contact Dr. Aviv with any questions or concerns by email <a href="mailto:aaviv@gwu.edu">
        aaviv@gwu.edu</a> or by phone <a href="tel:+12029946569">202-994-6569</a>.
    </p>
    <p>
        You may also contact the GWU Office of Human Research at <a href="tel:+12029942715">202‐994‐2715</a> or <a
        href="mailto:ohrirb@gwu.edu">ohrirb@gwu.edu</a> if you have questions or comments regarding your rights as a
        participant in the research.
    </p>
    <p>
        This research has been reviewed according to the GWU&rsquo;s procedures governing your participation in this research.
        IRB Approval NCR213631.
    </p>
    <h5>
        11. Confidentiality
    </h5>
    <p>
        All efforts will be made to keep the personal information in your research record private. We will not 
        directly link any personal identifying information with your survey response. However, complete confidentiality 
        cannot be promised. Your information may be shared with the GWU Institutional Review Board.
    </p>
    <p>
        We may use unattributed quotes and aggregate data in research reports in journals or at scientific meetings, 
        but the people who participated in this study will not be named or identified.
    </p>
    <h5>
        12. Use of Data in Future Studies
    </h5>
    <p>
        We will create a publicly available dataset that does not contain identifiable information from you based on the
        survey responses. This dataset can be used by the research team or shared with other researchers without
        additional informed consent.
    </p>
`;

const withdrawnCompletionMessage = `
    <div class="jumbotron">
        <h4>
            You have successfully withdrawn from the survey. Thank you for participating!
        </h4>
        <hr class="my-4">
        <p class="lead">
            We will not use your answers. Please return the task in Prolific so that others may take the survey.
        </p>
    </div>
`;

const feedbackForm = `
    <div id="feedbackFormDiv" class="card mb-4">
        <div class="card-header bg-secondary text-white">Do you have any thoughts or suggestions on the survey? (Optional)</div>
        <div class="card-body">
            <textarea class="form-control" id="feedbackTextarea" rows="3" placeholder="Write your feedback here"></textarea>
        </div>
        <div class="card-footer">
            <input type="button" value="Submit Feedback" class="btn btn-success" onclick="submitFeedback()">
        </div>
    </div>
    <div id="feedbackSubmittedDiv" class="d-none">Feedback submitted. Thank you.</div>
`;

const redirectToProlific = `
    <div class="card mb-4">
        <div class="card-header bg-info text-white">Submit Prolific Completion Code</div>
        <div class="card-body">
            Click the following button to submit your Prolific completion code and return to Prolific.
            <br/>
            <div id="redirectCountDownDiv"></div>
        </div>
        <div class="card-footer">
            <input type="button" 
                value="Submit Completion Code" 
                onclick="redirectToProlificWithCompletionCode();" 
                class="btn btn-success">
        </div>
    </div>
`;

const successfulCompletionMessage = `
    <div class="jumbotron">
        <h4>
            Thank you for participating in our survey!
        </h4>
    </div>
`;
