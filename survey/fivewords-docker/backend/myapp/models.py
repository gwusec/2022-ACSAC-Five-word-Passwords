
import uuid

from django.db import models
from django.utils import timezone

class Participant(models.Model):
    prolific_id = models.CharField(max_length=191, unique=True) # prolificId
    uuid = models.UUIDField(default=uuid.uuid4) 

    presurvey_complete = models.BooleanField(default=False)
    postsurvey_complete = models.BooleanField(default=False)

class PreSurveyData(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, unique=True)
    study = models.CharField(default='', max_length=191)    # studyId

    '''
    CONSENT AND INTRO
    '''
    ## consentPage
    consent_age = models.BooleanField(default=False)    # informedConsent.age
    consent_read = models.BooleanField(default=False)   # informedConsent.read
    consent_participation = models.BooleanField(default=False)  # informedConsent.participation

    treatment_ver = models.CharField(max_length=191) # treatmentVer

    num_unique_pword = models.CharField(max_length=191)
    manage_pword = models.TextField()
    imagine_create_pword = models.TextField()
    how_create_strong_pword = models.TextField()
    why_this_pword_tre1 = models.TextField()
    why_this_pword_tre2 = models.TextField()
    why_this_pword_tre3 = models.TextField()
    secure_pword_rating = models.CharField(max_length=191)
    mem_actions_taken = models.TextField()
    how_likely_remem_1week = models.CharField(max_length=191)
    how_likely_to_use = models.CharField(max_length=191)

    '''
    DEMOGRAPHICS
    '''
    ## DemographicsPage
    demo_gender = models.CharField(max_length=191)    # Demo_gender
    demo_age = models.CharField(max_length=191)   # Demo_age
    demo_education = models.CharField(max_length=191) # Demo_edu
    demo_background = models.CharField(max_length=191)    # Demo_background

'''
Table for Storing five-word password and how many attempts participants 
have taken to get their passwords correct.
'''
class FiveWordPasswordStats(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    password = models.CharField(max_length=191)

    tot_new_pword_cnt = models.IntegerField(default=0)
    
    start_attempt_cnt = models.IntegerField(default=0)
    start_new_pword_cnt = models.IntegerField(default=0)
    start_tre2_word1_cnt = models.IntegerField(default=0)
    start_tre2_word2_cnt = models.IntegerField(default=0)
    start_tre2_word3_cnt = models.IntegerField(default=0)
    start_tre2_word4_cnt = models.IntegerField(default=0)
    start_tre2_word5_cnt = models.IntegerField(default=0)
    start_show_pword = models.BooleanField(default=False)

    mid_attempt_cnt = models.IntegerField(default=0)
    mid_new_pword_cnt = models.IntegerField(default=0)
    mid_tre2_word1_cnt = models.IntegerField(default=0)
    mid_tre2_word2_cnt = models.IntegerField(default=0)
    mid_tre2_word3_cnt = models.IntegerField(default=0)
    mid_tre2_word4_cnt = models.IntegerField(default=0)
    mid_tre2_word5_cnt = models.IntegerField(default=0)
    mid_show_pword = models.BooleanField(default=False)

    end_attempt_cnt = models.IntegerField(default=0)
    end_show_pword = models.BooleanField(default=False)

    post_attempt1_cnt = models.IntegerField(default=0)
    post_attempt2_cnt = models.IntegerField(default=0)
    post_show_pword = models.BooleanField(default=False)
    post_second_try = models.BooleanField(default=False)

class FiveWordPassword(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    password = models.CharField(max_length=191)

class PreSurveyStoreMethod(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    store_write_down = models.BooleanField(default=False)
    reset_every_time = models.BooleanField(default=False)
    physical_note = models.BooleanField(default=False)
    save_as_file = models.BooleanField(default=False)
    save_in_browser = models.BooleanField(default=False)
    third_party_manager = models.BooleanField(default=False)
    system_provide_manager = models.BooleanField(default=False)
    none_of_the_above = models.BooleanField(default=False)
    other_value = models.TextField(null=True)

class PreSurveyComfPlat(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    email_accounts = models.BooleanField(default=False)
    bank_accounts = models.BooleanField(default=False)
    work_accounts = models.BooleanField(default=False)
    retail_website_accounts = models.BooleanField(default=False)
    social_media_accounts = models.BooleanField(default=False)
    none_of_the_above = models.BooleanField(default=False)
    other_value = models.TextField(null=True)

class PostSurveyData(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, unique=True)
    study = models.CharField(default='', max_length=191)    # studyId

    '''
    CONSENT AND INTRO
    '''
    ## consentPage
    consent_age = models.BooleanField(default=False)    # informedConsent.age
    consent_read = models.BooleanField(default=False)   # informedConsent.read
    consent_participation = models.BooleanField(default=False)  # informedConsent.participation

    used_outside_study = models.CharField(max_length=191)
    motivation_use_accounts = models.TextField()
    what_to_change_specific = models.TextField()
    how_confident_secure = models.CharField(max_length=191)
    elaborate_confident_secure = models.TextField()
    how_confident_remember = models.CharField(max_length=191)
    elaborate_confident_remember = models.TextField()
    what_to_change_general = models.TextField()

class PostSurveyMemoryMethod(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    store_write_down = models.BooleanField(default=False)
    physical_note = models.BooleanField(default=False)
    save_as_file = models.BooleanField(default=False)
    save_in_browser = models.BooleanField(default=False)
    third_party_manager = models.BooleanField(default=False)
    system_provide_manager = models.BooleanField(default=False)
    none_of_the_above = models.BooleanField(default=False)
    other_value = models.TextField(null=True)

class PostSurveyPlatUse(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    email_accounts = models.BooleanField(default=False)
    bank_accounts = models.BooleanField(default=False)
    work_accounts = models.BooleanField(default=False)
    retail_website_accounts = models.BooleanField(default=False)
    social_media_accounts = models.BooleanField(default=False)
    none_of_the_above = models.BooleanField(default=False)
    other_value = models.TextField(null=True)

class Feedback(models.Model):
    timestamp = models.DateTimeField(default=timezone.now())
    referer = models.CharField(blank=True, null=True, default=None, max_length=191)
    feedback = models.TextField(blank=True, null=True, default=None)

class ProlificData(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    session_id = models.CharField(max_length=191, unique=True)

    status = models.CharField(max_length=191)
    started_datetime = models.CharField(max_length=191)
    completed_date_time = models.CharField(max_length=191)
    time_taken = models.CharField(max_length=191)
    age = models.CharField(max_length=191)
    num_approvals = models.CharField(max_length=191)
    num_rejections = models.CharField(max_length=191)
    prolific_score = models.CharField(max_length=191)
    reviewed_at_datetime = models.CharField(max_length=191)
    entered_code = models.CharField(max_length=191)
    country_of_birth = models.CharField(max_length=191)
    current_country_of_residence = models.CharField(max_length=191)
    employment_status = models.CharField(max_length=191)
    first_language = models.CharField(max_length=191)
    nationality = models.CharField(max_length=191)
    sex = models.CharField(max_length=191)
    student_status = models.CharField(max_length=191)

class ErrorData(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, default=None, blank=True, null=True)
    session_id = models.CharField(max_length=191)
    
    timestamp = models.DateTimeField(default=timezone.now())
    error = models.TextField()
    request_data = models.TextField()
    method = models.CharField(max_length=191)