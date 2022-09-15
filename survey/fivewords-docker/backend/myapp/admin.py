  
from django.contrib import admin
from .models import Participant,FiveWordPasswordStats,FiveWordPassword,PreSurveyData,PreSurveyStoreMethod, \
                    PreSurveyComfPlat,PostSurveyData,PostSurveyMemoryMethod,PostSurveyPlatUse, \
                    ProlificData,ErrorData,Feedback

# Register your models here.
admin.site.register(Participant)
admin.site.register(FiveWordPasswordStats)
admin.site.register(FiveWordPassword)
admin.site.register(PreSurveyData)
admin.site.register(PreSurveyStoreMethod)
admin.site.register(PreSurveyComfPlat)
admin.site.register(PostSurveyData)
admin.site.register(PostSurveyMemoryMethod)
admin.site.register(PostSurveyPlatUse)
admin.site.register(ProlificData)
admin.site.register(ErrorData)
admin.site.register(Feedback)