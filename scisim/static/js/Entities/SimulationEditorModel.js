/**
 * Model representing the SimulationEditor.
 *
 * This model will keep track of editable
 * simulations as well as the state of the editor which will be used in application
 * and rendering logic
 *
 * @param {Array} simulations A list of initial simulations that the editor can handle
 */
var SimulationEditorModel = function(simulations) {

    // simulations passed in will usually be null
    this.simulations = simulations || [];

    // loaded will be set after the Simulation Editor is loaded, but this class is created before then
    this.loaded = false;

    // ready will be set after initial simulations have been loaded from database and are ready for rendering into menu
    this.ready = false;

    // state of the editor will be used to drive logic and change display
    this.state = SimulationEditorModel.STATE.NOT_READY;

    // Reference to simulation currently being edited. null if not editing
    this.currentlyEditingSim = null;
};

SimulationEditorModel.STATE = Object.freeze({
    NOT_READY: "Not ready or not loaded",
    MENU: "Initial menu showing simulations to edit",
    EDITING: "Editing a simulation"
});

/**
 * Adds a simulation to the current list of simulations.
 *
 * @param {SimulationModel} simulation [Model representing a simulation]
 */
SimulationEditorModel.prototype.addSimulation = function(simulation) {
    console.log(simulation);
    this.simulations.push(simulation);
};

/**
 * Set ready. Should be called by controller after simulations have been initialized
 */
SimulationEditorModel.prototype.setReady = function() {
    this.ready = true;

    // Might need to check if loaded first. For now, assuming this will always be the case
    this.state = SimulationEditorModel.STATE.MENU;
};

/**
 * Set loaded. Should be called by controller after it has been loaded. (run by the Engine)
 */
SimulationEditorModel.prototype.setLoaded = function() {
    this.loaded = true;
};

/**
 * @return {Boolean} [true if editor is ready to start]
 */
SimulationEditorModel.prototype.isReady = function() {
    return this.state !== SimulationEditorModel.STATE.NOT_READY;
};

/**
 * @return {Array} List of simulations currently managed by the editor
 */
SimulationEditorModel.prototype.getSimulations = function() {
    return this.simulations;
};

/**
 * Will be called by controller when editing starts.
 *
 * In the future, should make this function not depend on receiving
 * an index into the simulations array. Maybe it would be better to go by
 * the order field of each Simulation object. This will make it easier to modify
 * the order of how simulations appear if desired.
 *
 * This is a task that will need coordination with the renderer/views as well
 *
 * @param  {Integer} sim_idx An index into the simulations array
 */
SimulationEditorModel.prototype.startEditing = function(sim_idx) {
    this.state = SimulationEditorModel.STATE.EDITING;
    this.currentlyEditingSim = this.simulations[sim_idx];
};

/**
 * Will be called by controller when editing concludes.
 */
 SimulationEditorModel.prototype.finishEditing = function() {

    // TODO: Additional teardown logic such as saving sim to database although
    // this should probably be handled by controller instead

    this.state = SimulationEditorModel.STATE.MENU;
    this.currentlyEditingSim = null;
 };
=======
/**
 * Model representing the SimulationEditor.
 *
 * This model will keep track of editable
 * simulations as well as the state of the editor which will be used in application
 * and rendering logic
 *
 * @param {Array} simulations A list of initial simulations that the editor can handle
 */
var SimulationEditorModel = function(simulations) {

    // simulations passed in will usually be null
    this.simulations = simulations || [];

    // loaded will be set after the Simulation Editor is loaded, but this class is created before then
    this.loaded = false;

    // ready will be set after initial simulations have been loaded from database and are ready for rendering into menu
    this.ready = false;

    // state of the editor will be used to drive logic and change display
    this.state = SimulationEditorModel.STATE.NOT_READY;

    // Reference to simulation currently being edited. null if not editing
    this.currentlyEditingSim = null;
};

SimulationEditorModel.STATE = Object.freeze({
    NOT_READY: "Not ready or not loaded",
    MENU: "Initial menu showing simulations to edit",
    EDITING: "Editing a simulation"
});

SimulationEditorModel.EVENTS = Object.freeze({
    MENU_ITEM_CLICKED: "Menu item clicked",
    EDITOR_ITEM_CLICKED: "Editor item clicked"
});

/**
 * Enum containing creator functions for events.
 *
 * Actually probably shouldn't be an enum since we won't be using these enums
 * as usual enums, but rather compare the names of the objects returned by them
 * to the EVENTS enum
 *
 * @param {[type]} menu_item_idx)       {                                        return {                    name: SimulationEditorModel.EVENTS.MENU_ITEM_CLICKED,                                                                  value: menu_item_idx                };    } [description]
 * @param {[type]} EDITOR_ITEM_CLICKED: function(editor_item_name, index) {                return {                                                                name: SimulationEditorModel.EVENTS.EDITOR_ITEM_CLICKED,                               value: {                                  widget_name: editor_item_name,                widget_idx: index            }        };    }} [description]
 */
SimulationEditorModel.EVENT_CREATOR = Object.freeze({
    /**
     * Takes in an index representing the index of the simulation clicked in the menu
     *
     * @param {Integer} menu_item_idx   represents the index of the simulation clicked on the menu
     * @return {object} event object    containing name-value
     */
    MENU_ITEM_CLICKED: function(menu_item_idx) {
        return {
            name: SimulationEditorModel.EVENTS.MENU_ITEM_CLICKED,
            value: menu_item_idx
        };
    },

    /**
     * Event that should be created when an editor item is clicked.
     *
     * The value for this event will be a context which the controller can use
     * to determine which editor item got clicked and possibly have optional arguments
     * However, it might not be smart to make the creator of this event have to know
     * that options is an object that they need to create. However, for now we'll
     * deal with it
     *
     * @param {String} editor_item_name name of editor item clicked
     * @param {Object} options          object containing key-value pairs of optiosn
     */
    EDITOR_ITEM_CLICKED: function(editor_item_name, options) {
        return {
            name: SimulationEditorModel.EVENTS.EDITOR_ITEM_CLICKED,
            value: editor_item_name,
            options: options
        };
    }
});

/**
 * Adds a simulation to the current list of simulations.
 *
 * @param {SimulationModel} simulation [Model representing a simulation]
 */
SimulationEditorModel.prototype.addSimulation = function(simulation) {
    console.log(simulation);
    this.simulations.push(simulation);
};

/**
 * Set ready. Should be called by controller after simulations have been initialized
 */
SimulationEditorModel.prototype.setReady = function() {
    this.ready = true;

    // Might need to check if loaded first. For now, assuming this will always be the case
    this.state = SimulationEditorModel.STATE.MENU;
};

/**
 * Set loaded. Should be called by controller after it has been loaded. (run by the Engine)
 */
SimulationEditorModel.prototype.setLoaded = function() {
    this.loaded = true;
};

/**
 * @return {Boolean} [true if editor is ready to start]
 */
SimulationEditorModel.prototype.isReady = function() {
    return this.state !== SimulationEditorModel.STATE.NOT_READY;
};

/**
 * @return {Array} List of simulations currently managed by the editor
 */
SimulationEditorModel.prototype.getSimulations = function() {
    return this.simulations;
};

/**
 * Will be called by controller when editing starts.
 *
 * In the future, should make this function not depend on receiving
 * an index into the simulations array. Maybe it would be better to go by
 * the order field of each Simulation object. This will make it easier to modify
 * the order of how simulations appear if desired.
 *
 * This is a task that will need coordination with the renderer/views as well
 *
 * @param  {Integer} sim_idx An index into the simulations array
 */
SimulationEditorModel.prototype.startEditing = function(sim_idx) {
    this.state = SimulationEditorModel.STATE.EDITING;
    this.currentlyEditingSim = this.simulations[sim_idx];
};

/**
 * Will be called by controller when editing concludes.
 */
 SimulationEditorModel.prototype.finishEditing = function() {

    // TODO: Additional teardown logic such as saving sim to database although
    // this should probably be handled by controller instead

    this.state = SimulationEditorModel.STATE.MENU;
    this.currentlyEditingSim = null;
 };