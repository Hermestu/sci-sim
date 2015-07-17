/**
 * A model representing a simulation page. This model will be used by the editor
 * engine and may in the future be extended for use in running the main simulation.
 *
 * When the editor adds or edits pages, it should not edit straight into the database
 * but rather create/edit SimulationPageModels which should be attached to SimulationModels
 *
 * The Models will then be used to update the database. The goal is to abstract
 * away that behavior from the Editor/Application
 *
 * @param {{}} args [Object containing key-value pairs received from db]
 */
var SimulationPageModel = function(args) {
    this.id = args.id;
    this.title = args.title;

    // Keep this for now, but don't know what to do with it. Might remove.
    this.links_incoming = args.links_incoming || [];
    this.links_outgoing = args.links_outgoing || [];

    // Array of PageModfierModels
    this.modifiers = args.modifiers || [];

    // Key-Value map for easy access
    this.modifiers_kv = {};
    _.each(args.modifiers, function(modifier) {
        this.modifiers_kv[modifier.name] = modifier.value;
    }.bind(this));

    // Array of PageActionModels
    this.actions = args.actions || [];

    // Key-Value map for easy access
    this.actions_kv = {};
    _.each(args.actions, function(action) {
        this.actions_kv[action.name] = action.value;
    }.bind(this));

    // Array of PageSectionModels
    this.sections = args.sections || [];
    this._orderSections();
};

/**
 * Takes in a json object from api call and returns a new SimulatioPageModel
 *
 * See API documentation for more information on object that is passed in.
 *
 * @param  {{}}                 sim     [json objects representing a simulation page]
 * @return {SimulationPageModel}            [A SimulationPageModelrepresenting a simulation]
 */
SimulationPageModel.from_object = function(page) {

    // Parse modifiers
    if (page.page_modifiers) {
        var modifiers = [];
        _.each(page.page_modifiers, function(modifier) {
            modifiers.push(new SimulationPageModifierModel(modifier.name, modifier.value));
        });
        page.modifiers = modifiers;
    }

    // parse actions
    if (page.page_actions) {
        var actions = [];
        _.each(page.page_actions, function(action) {
            actions.push(new SimulationPageActionModel(action.name, action.value));
        });
        page.actions = actions;
    }

    // parse sections
    if (page.sections) {
        var sections = [];
        _.each(page.sections, function(section) {
            sections.push(SimulationPageSectionModel.from_object(section));
        });
        page.sections = sections;
    }

    return new SimulationPageModel(page);
};

SimulationPageModel.prototype.addSection = function(section) {
    this.sections.push(section);
    this._orderSections();
};

SimulationPageModel.prototype.addModifier = function(modifier) {
    this.modifiers.push(modifier);
    this.modifiers_kv[modifier.name] = modifier.value;
};

SimulationPageModel.prototype.addAction = function(action) {
    this.actions.push(action);
    this.actions_kv[action.name] = action.value;
};

SimulationPageModel.prototype.setTitle = function(title) {
    this.title = title;
};

/**
 * Might be easier for now to just let editor change section order.
 */
SimulationPageModel.prototype.setSections = function(sections) {
    this.sections = sections;
};

SimulationPageModel.prototype._orderSections = function() {
    // Sorts by order of sections
    this.sections.sort(function(a, b) {return a.order - b.order;});
};
