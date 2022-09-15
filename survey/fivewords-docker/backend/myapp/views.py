import random
import urllib.parse

import json
import base64
import logging
import datetime
import traceback

from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse, Http404, HttpResponseServerError
from django.shortcuts import redirect
from django.contrib.sites.shortcuts import get_current_site
from django.views.decorators.clickjacking import xframe_options_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from django.conf import settings

from django import forms
from django.urls import reverse
from django.utils import timezone

from django.forms.models import model_to_dict
from django.http import JsonResponse

from django.views import View

from .models import Participant,FiveWordPasswordStats,FiveWordPassword,PreSurveyData,PreSurveyStoreMethod, \
                    PreSurveyComfPlat,PostSurveyData,PostSurveyMemoryMethod,PostSurveyPlatUse, \
                    ProlificData,ErrorData,Feedback

logging.basicConfig()
logging.getLogger().setLevel(logging.DEBUG)
logger = logging.getLogger(__name__)

################################################################################

'''
/five-word/presurvey/
'''
@method_decorator(csrf_exempt, name='dispatch') # TODO remove this in production
class PreSurveyView(View):
    def post(self, request):
        survey_db_mapping = {'treatment_ver':'treatmentVer', \
         'study':'studyId', \
         \
         'num_unique_pword':'num_unique_pword', \
         'manage_pword':'manage_pword', \
         'imagine_create_pword':'imagine_create_pword', \
         'how_create_strong_pword':'how_create_strong_pword', \
         'why_this_pword_tre1':'why_this_pword_tre1', \
         'why_this_pword_tre2':'why_this_pword_tre2', \
         'why_this_pword_tre3':'why_this_pword_tre3', \
         'secure_pword_rating':'secure_pword_rating', \
         'mem_actions_taken':'mem_actions_taken', \
         'how_likely_remem_1week':'how_likely_remem_1week', \
         'why_effective':'why_effective', \
         'how_likely_to_use':'how_likely_to_use', \
         \
         'demo_gender':'Demo_gender', \
         'demo_age':'Demo_age', \
         'demo_education':'Demo_edu', \
         'demo_background':'Demo_background', \
        }
        survey_db_mapping = {value:key for key, value in survey_db_mapping.items()} # Flip the keys and values, for convenience

        status = {'success': False}
        post_data = None
        participant_obj = None
        try:
            post_data = json.loads(request.body)

            # Create a Participant entry if it doesn't exist already
            prolific_id = post_data['prolificId']
            participant_obj,is_created = Participant.objects.get_or_create(prolific_id=prolific_id)

            if not participant_obj.presurvey_complete:
                # Create PreSurveyData entries
                presurvey_obj,is_created = PreSurveyData.objects.get_or_create(participant=participant_obj)

                # Update any POSTed fields
                posted_fields = set(post_data.keys()).intersection(set(survey_db_mapping.keys()))
                presurvey_row = dict()
                for post_field in posted_fields:
                    db_field = survey_db_mapping[post_field]
                    presurvey_row[db_field] = post_data[post_field]

                # These have to be handled specially
                presurvey_row['consent_age'] = presurvey_obj.consent_age or _get_consent(post_data, 'age')
                presurvey_row['consent_read'] = presurvey_obj.consent_read or _get_consent(post_data, 'read')
                presurvey_row['consent_participation'] = presurvey_obj.consent_participation or _get_consent(post_data, 'participation')


                # Separate table for storing method question (array of answers)
                if('store_pword' in post_data.keys()):
                    presurvey_storemeth_obj,is_created = PreSurveyStoreMethod.objects.get_or_create(participant=participant_obj)
                    for item in post_data['store_pword']:
                        setattr(presurvey_storemeth_obj, item, True)
                    if('store_pword-Comment' in post_data.keys()):
                        setattr(presurvey_storemeth_obj, 'other_value', post_data['store_pword-Comment'])
                    presurvey_storemeth_obj.save()
                
                # Separate table for comfortable platform question (array of answers)
                if('comfortable_platforms' in post_data.keys()):
                    presurvey_comfplat_obj,is_created = PreSurveyComfPlat.objects.get_or_create(participant=participant_obj)
                    for item in post_data['comfortable_platforms']:
                        setattr(presurvey_comfplat_obj, item, True)
                    if('comfortable_platforms-Comment' in post_data.keys()):
                        setattr(presurvey_comfplat_obj, 'other_value', post_data['comfortable_platforms-Comment'])
                    presurvey_comfplat_obj.save()

                if('password' in post_data.keys()):
                    fiveWordPassword_obj,is_created = FiveWordPassword.objects.get_or_create(participant=participant_obj, password=post_data['password'])
                    setattr(fiveWordPassword_obj, 'password', post_data['password'])
                    fiveWordPassword_obj.save()

                    fiveWordPasswordStats_obj,is_created = FiveWordPasswordStats.objects.get_or_create(participant=participant_obj)
                    setattr(fiveWordPasswordStats_obj, 'password', post_data['password'])
                    setattr(fiveWordPasswordStats_obj, 'tot_new_pword_cnt', post_data['tot_new_pword_cnt'])

                    setattr(fiveWordPasswordStats_obj, 'start_attempt_cnt', post_data['start_attempt_cnt'])
                    setattr(fiveWordPasswordStats_obj, 'start_new_pword_cnt', post_data['start_new_pword_cnt'])

                    setattr(fiveWordPasswordStats_obj, 'mid_attempt_cnt', post_data['mid_attempt_cnt'])
                    setattr(fiveWordPasswordStats_obj, 'mid_new_pword_cnt', post_data['mid_new_pword_cnt'])

                    for i in range(0, 5):
                        tempStr = 'start_tre2_word' + str(i+1) + '_cnt'
                        setattr(fiveWordPasswordStats_obj, tempStr, post_data[tempStr])
                        tempStr = 'mid_tre2_word' + str(i+1) + '_cnt'
                        setattr(fiveWordPasswordStats_obj, tempStr, post_data[tempStr])
                    
                    setattr(fiveWordPasswordStats_obj, 'start_show_pword', post_data['start_show_pword'])
                    setattr(fiveWordPasswordStats_obj, 'mid_show_pword', post_data['mid_show_pword'])
                    setattr(fiveWordPasswordStats_obj, 'end_show_pword', post_data['end_show_pword'])

                    setattr(fiveWordPasswordStats_obj, 'end_attempt_cnt', post_data['end_attempt_cnt'])

                    fiveWordPasswordStats_obj.save()

                for (key, value) in presurvey_row.items():
                    setattr(presurvey_obj, key, value)
                presurvey_obj.save()               

                # Mark the presurvey as complete, if the POSTed data says so
                presurvey_complete = post_data.get('presurvey_complete', False)
                if presurvey_complete:
                    participant_obj.presurvey_complete = presurvey_complete
                    participant_obj.save()

                status['success'] = True
                status['data'] = model_to_dict(presurvey_obj)
                status['updated'] = list(presurvey_row.keys())
                status['complete'] = presurvey_complete

            else:
                raise RuntimeError('Attempted to submit data after already completing the presurvey')


        except Exception as e:
            status['data'] = traceback.format_exc()

            logger.error({'prolific_id':prolific_id, 'error':status['data'], \
                          'data':post_data, 'view': 'presurvey'})

            # Save error and request in the ErrorData table
            ErrorData.objects.create(participant=participant_obj, \
                                     error=status['data'], \
                                     request_data=post_data,
                                     method='presurvey')

        finally:
            return JsonResponse(status)

'''
/five-word/postsurvey/
'''
@method_decorator(csrf_exempt, name='dispatch') # TODO remove this in production
class PostSurveyView(View):
    def post(self, request):
        survey_db_mapping = {'study':'studyId', \
         \
         'used_outside_study':'used_outside_study', \
         'motivation_use_accounts':'motivation_use_accounts', \
         'what_to_change_specific':'what_to_change_specific', \
         'how_confident_secure':'how_confident_secure', \
         'elaborate_confident_secure':'elaborate_confident_secure', \
         'how_confident_remember':'how_confident_remember', \
         'elaborate_confident_remember':'elaborate_confident_remember', \
         'what_to_change_general':'what_to_change_general', \
        }
        survey_db_mapping = {value:key for key, value in survey_db_mapping.items()} # Flip the keys and values, for convenience

        status = {'success': False}
        post_data = None
        participant_obj = None
        try:
            post_data = json.loads(request.body)

            # Create a Participant entry if it doesn't exist already
            prolific_id = post_data['prolificId']
            participant_obj,is_created = Participant.objects.get_or_create(prolific_id=prolific_id)

            if not participant_obj.postsurvey_complete:
                # Create PreSurveyData entries
                postsurvey_obj,is_created = PostSurveyData.objects.get_or_create(participant=participant_obj)

                # Update any POSTed fields
                posted_fields = set(post_data.keys()).intersection(set(survey_db_mapping.keys()))
                presurvey_row = dict()
                for post_field in posted_fields:
                    db_field = survey_db_mapping[post_field]
                    presurvey_row[db_field] = post_data[post_field]

                # These have to be handled specially
                presurvey_row['consent_age'] = postsurvey_obj.consent_age or _get_consent(post_data, 'age')
                presurvey_row['consent_read'] = postsurvey_obj.consent_read or _get_consent(post_data, 'read')
                presurvey_row['consent_participation'] = postsurvey_obj.consent_participation or _get_consent(post_data, 'participation')

                # Separate table for memory method question (array of answers)
                if('memory_method' in post_data.keys()):
                    postsurvey_memmet_obj,is_created = PostSurveyMemoryMethod.objects.get_or_create(participant=participant_obj)
                    for item in post_data['memory_method']:
                        setattr(postsurvey_memmet_obj, item, True)
                    if('memory_method-Comment' in post_data.keys()):
                        setattr(postsurvey_memmet_obj, 'other_value', post_data['memory_method-Comment'])
                    postsurvey_memmet_obj.save()

                # Separate table for what platform used question (array of answers)
                if('what_platform_used' in post_data.keys()):
                    postsurvey_whatplat_obj,is_created = PostSurveyPlatUse.objects.get_or_create(participant=participant_obj)
                    for item in post_data['what_platform_used']:
                        setattr(postsurvey_whatplat_obj, item, True)
                    if('what_platform_used-Comment' in post_data.keys()):
                        setattr(postsurvey_whatplat_obj, 'other_value', post_data['what_platform_used-Comment'])
                    postsurvey_whatplat_obj.save()
                    
                if('what_platform_would_use' in post_data.keys()):
                    postsurvey_whatplat_obj,is_created = PostSurveyPlatUse.objects.get_or_create(participant=participant_obj)
                    for item in post_data['what_platform_would_use']:
                        setattr(postsurvey_whatplat_obj, item, True)
                    if('what_platform_would_use-Comment' in post_data.keys()):
                        setattr(postsurvey_whatplat_obj, 'other_value', post_data['what_platform_would_use-Comment'])
                    postsurvey_whatplat_obj.save()

                if('password' in post_data.keys()):
                    fiveWordPasswordStats_obj,is_created = FiveWordPasswordStats.objects.get_or_create(participant=participant_obj)
                    setattr(fiveWordPasswordStats_obj, 'password', post_data['password'])
                    setattr(fiveWordPasswordStats_obj, 'post_attempt1_cnt', post_data['post_attempt1_cnt'])
                    setattr(fiveWordPasswordStats_obj, 'post_attempt2_cnt', post_data['post_attempt2_cnt'])
                    setattr(fiveWordPasswordStats_obj, 'post_show_pword', post_data['post_show_pword'])
                    setattr(fiveWordPasswordStats_obj, 'post_second_try', post_data['post_second_try'])

                    fiveWordPasswordStats_obj.save()

                for (key, value) in presurvey_row.items():
                    setattr(postsurvey_obj, key, value)
                postsurvey_obj.save()               

                # Mark the presurvey as complete, if the POSTed data says so
                postsurvey_complete = post_data.get('postsurvey_complete', False)
                if postsurvey_complete:
                    participant_obj.postsurvey_complete = postsurvey_complete
                    participant_obj.save()

                status['success'] = True
                status['data'] = model_to_dict(postsurvey_obj)
                status['updated'] = list(presurvey_row.keys())
                status['complete'] = postsurvey_complete

            else:
                raise RuntimeError('Attempted to submit data after already completing the postsurvey')


        except Exception as e:
            status['data'] = traceback.format_exc()

            logger.error({'prolific_id':prolific_id, 'error':status['data'], \
                          'data':post_data, 'view': 'postsurvey'})

            # Save error and request in the ErrorData table
            ErrorData.objects.create(participant=participant_obj, \
                                     error=status['data'], \
                                     request_data=post_data,
                                     method='postsurvey')

        finally:
            return JsonResponse(status)

def _get_consent(data, consent_key):
    '''
    "informedConsent": {
        "age": {
            "confirmation": true
        },
        "read": {
            "confirmation": true
        },
        "participation": {
            "confirmation": true
        }
    }
    '''
    return 'informedConsent' in data and \
        consent_key in data['informedConsent'] and \
        'confirmation' in data['informedConsent'][consent_key] and \
        data['informedConsent'][consent_key]['confirmation']

################################################################################

'''
/five-word/getpassword/
'''
@method_decorator(csrf_exempt, name='dispatch') # TODO remove this in production
class GetPasswordView(View):
    def post(self, request):
        status = {'success': False}
        post_data = None

        try:
            post_data = json.loads(request.body)

            prolific_id = post_data['prolificId']
            participant_obj = Participant.objects.get(prolific_id=prolific_id)
            fiveWordPasswordStats_obj = FiveWordPasswordStats.objects.get(participant=participant_obj)
            
            password = fiveWordPasswordStats_obj.password

            status['success'] = True
            status['data'] = {'data':password}

        except Exception as e:
            status['data'] = traceback.format_exc()

            logger.error({'prolific_id':prolific_id, 'error':status['data'], \
                          'data':post_data, 'view': 'getpassword'})

            # Save error and request in the ErrorData table
            ErrorData.objects.create(error=status['data'], \
                                     request_data=post_data,
                                     method='getpassword')

        finally:
            return JsonResponse(status)

'''
/five-word/feedback/
'''
@method_decorator(csrf_exempt, name='dispatch') # TODO remove this in production
class FeedbackView(View):
    def post(self, request):
        status = {'success': False}
        post_data = None

        try:
            post_data = json.loads(request.body)

            referer = request.META.get('HTTP_REFERER', '')
            feedback = post_data.get('feedback', '')

            # Create a Feedback entry
            feedback_obj = Feedback.objects.create(referer=referer, feedback=feedback)

            status['success'] = True
            status['data'] = {'referer':referer, 'data':feedback}

        except Exception as e:
            status['data'] = traceback.format_exc()

            logger.error({'error':status['data'], \
                          'data':post_data, 'view': 'getpassword'})

            # Save error and request in the ErrorData table
            ErrorData.objects.create(error=status['data'], \
                                     request_data=post_data,
                                     method='feedback')

        finally:
            return JsonResponse(status)