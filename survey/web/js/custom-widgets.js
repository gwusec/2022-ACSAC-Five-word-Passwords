function init(Survey) {
    let widget = {
        name: "slider",
        title: "Slider",
        iconName: "icon-slider",
        widgetIsLoaded: function () {
            return typeof noUiSlider != "undefined";
        },
        isFit: function (question) {
            return question.getType() === "slider";
        },
        htmlTemplate:
            "<div><div></div></div>",
        activatedByChanged: function (activatedBy) {
            Survey.JsonObject.metaData.addClass("slider", [], null, "empty");
            Survey.JsonObject.metaData.addProperties("slider", [
                {
                    name: "sliderConfig:string",
                    default: { start: 50, connect: true, range: { "min": 0, "max": 100 } },
                }
            ]);
        },
        afterRender: function (question, el) {
            el.style.paddingBottom = "19px";
            el.style.paddingLeft = "30px";
            el.style.paddingRight = "30px";
            el.style.paddingTop = question.sliderConfig.tooltips !== undefined ? "44px" : "19px";
            el.style.overflow = "visible";
            el = el.children[0];
            el.style.marginBottom = "60px";
            if (question.sliderConfig.orientation === "vertical") {
                el.style.height = "250px";
            }
            let slider = noUiSlider.create(el, question.sliderConfig );
            slider.on("change.questionValue", function() {
                question.value = Number(slider.get());
            });
            // if (question.isRequired) {
            //     slider.updateOptions({"connect": false});
            //     slider.on("change.isRequired", () => {
            //         slider.updateOptions({"connect": true});
            //         slider.off('change.isRequired');
            //     });
            // }
            let updateValueHandler = function () {
                slider.set(question.value);
            };
            if (question.isReadOnly) {
                el.setAttribute("disabled", true);
            }
            updateValueHandler();
            question.noUiSlider = slider;
            question.valueChangedCallback = updateValueHandler;
            question.readOnlyChangedCallback = function () {
                if (question.isReadOnly) {
                    el.setAttribute("disabled", true);
                } else {
                    el.removeAttribute("disabled");
                }
            };
        },
        willUnmount: function (question, el) {
            if (!!question.noUiSlider) {
                question.noUiSlider.destroy();
                question.noUiSlider = null;
            }
            question.readOnlyChangedCallback = null;
        },
        pdfRender: function (_, options) {
            if (options.question.getType() === "slider") {
                let point = options.module.SurveyHelper.createPoint(
                    options.module.SurveyHelper.mergeRects.apply(null, options.bricks)
                );
                point.xLeft += options.controller.unitWidth;
                point.yTop +=
                    options.controller.unitHeight *
                    options.module.FlatQuestion.CONTENT_GAP_VERT_SCALE;
                let rect = options.module.SurveyHelper.createTextFieldRect(
                    point,
                    options.controller
                );
                let textboxBrick = new options.module.TextFieldBrick(
                    options.question,
                    options.controller,
                    rect,
                    true,
                    options.question.id,
                    options.question.value || options.question.defaultValue || "",
                    "",
                    options.question.isReadOnly,
                    false,
                    "text"
                );
                options.bricks.push(textboxBrick);
            }
        },
    };

    Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
}

if (typeof Survey !== "undefined") {
    init(Survey);
}
