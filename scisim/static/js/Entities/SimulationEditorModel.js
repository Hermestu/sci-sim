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
