// handles the interactions between the user and pages
var PatientEngine = function(){
	storageHelper.initJsonArray('visited_pages');
	this.patientManager = new PatientManager();
	this.hypothesisManager = new HypothesisManager();
	this.renderPage(storageHelper.get("first_page_id"));
	this.choiceLogger = new ChoiceLogManager();
};

PatientEngine.prototype.renderPage = function(page_id){
	var that = this;

	if($.inArray(page_id, storageHelper.getJson('visited_pages')) > -1){
		this.restorePage(page_id);
		return;
	}

	storageHelper.appendJsonArray('visited_pages', page_id);

	api.getPage(page_id).done(function(response){
		if($.isEmptyObject(response)){
			throw "this page doesn't exist:";
		}

		var pageContext = response;
		var patient = that.patientManager.discoverFromResponse(response.sections);
		var hypothesis = that.hypothesisManager.discover();

		if(patient !== null){
			$.extend(pageContext, {"patient": patient});
		}

		if(hypothesis !== null){
			$.extend(pageContext, {"hypothesis": hypothesis});
		}

		pageContext['is_popup'] = false;

		$.map(response.page_modifiers, function(val, i){
			if($.inArray("popup_window", Object.values(val)) > 0){
				pageContext['is_popup'] = true;
			}
		});

		$.extend(pageContext, { "visits": 0 });
		
		var directiveApplicator = new PatientPageDirectiveApplicator(pageContext, that.hypothesisManaer);

		$.extend(pageContext, directiveApplicator.applyModifiers());
		$.extend(pageContext, renderer.composePage(pageContext));		 
		$.extend(pageContext, directiveApplicator.applyActions());
		
		if(!pageContext.popup_window) {
			chain.add(pageContext);
			that.applyListeners();
		} else {
			that.changePage(chain.getActivePage().id);
		}
	});
};

PatientEngine.prototype.restorePage = function(page_id){
	var context = chain.findById(page_id);
	var activePage = chain.getActivePage();
	
	if (context.hasOwnProperty('patient') && context.patient !== false) {
		// we create a new patient for each page, including choice pages, so the new choice isn't saved on the page patient.
		// so get copy over the patient from the choice page and put it on the patient choices page. 
		context.patient = $.extend(true, context.patient, activePage.patient);		
	}
	
	var directiveApplicator = new PatientPageDirectiveApplicator(context, this.hypothesisManaer);
	
	context.visits += 1;
	
	$.extend(context, directiveApplicator.applyModifiers());
	$.extend(context, renderer.composePage(context));		 
	$.extend(context, directiveApplicator.applyActions());

	chain.updateContext(context);
	chain.updateActivePage(context);

	this.applyListeners();
};

PatientEngine.prototype.applyListeners = function () {
	var context = chain.getActivePage();
	$('#continue-btn').click(this.onContinueClick.bind(this));
	$('#submit-btn').click(this.onSubmitButtonClick.bind(this));
	$('.choice-binary .well').click(this.onBinaryChoiceClick.bind(this));
	$('#minimum-choice-continue').click(context.minimum_choice_page, this.changePage.bind(this));

	playerFactory.addListeners();
};

PatientEngine.prototype.onContinueClick = function(){
	this.changePage(chain.getActivePage().goes_to_page);
};

PatientEngine.prototype.onSubmitButtonClick = function(e){
	e.stopImmediatePropagation();
	var $inputs = $('input'),
		context = chain.getActivePage(),
		destination = "";

	for (var i = 0; i < $inputs.length; i++) {
		var input = $inputs.eq(i);
		var choiceInfo = {};

		if(input.val().length === 0){
			// TODO: extract this to a form helper class
			input.addClass("has-danger");
			input.attr('placeholder', "This field must be filled.");
			return;
		}

		destination = context.goes_to_page || false;
		if(!destination) destination = input.data("destination");

		choiceInfo.choice = input.val();
		choiceInfo.choice_id = input.data("choice-id");
		choiceInfo.page_context = context;
		choiceInfo.question = input.prev().text();

		this.choiceLogger.logChoice(choiceInfo);	
	}

	this.changePage(destination);
};


PatientEngine.prototype.onBinaryChoiceClick = function(e){
	e.stopImmediatePropagation();
	var $elem = $(e.currentTarget);
	var context = chain.getActivePage();
	if($elem.parent().hasClass("disabled")) return;

	var value = $elem.text(),
		choiceId = $elem.data('choice-id'),
		destinationId = $elem.data('destination'),
		choiceInfo = {
			choice: value,
			choice_id: choiceId,
			page_context: context,
			question: $('.page-section').last().text()
		};

	this.choiceLogger.logChoice(choiceInfo);

	storageHelper.appendJsonArray("choices_made", choiceId);

	$elem.parent().addClass("disabled");

	this.changePage(destinationId);
};

PatientEngine.prototype.changePage = function(destination) {
	this.choiceLogger.flushLog();

	if (typeof destination === "object") {
		destination = destination.data;
	}

	storageHelper.store("last_page_id", chain.getActivePage().id);
	this.renderPage(destination);
};
