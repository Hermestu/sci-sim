/**
 * Responsible for handling the logic of the simulation editor. We may need several
 * views here but for now stick to the same pattern as AdminMenuController
 */
var SimulationEditorController = function(engine) {
    this.engine = engine;

    // Simulation editor model can be loaded, but not ready
    this.simEditorModel = new SimulationEditorModel();

    // Initialize the simulations that are currently in the database and place into editor model
    // This is an async call
    this.initSimulations();

    // Initialize renderer with controller and model
    this.renderer = new SimulationEditorRenderer(this, this.simEditorModel);
};

/**
 * This method should be used by renderer to pass on events to controller.
 * The method should stay generic so that any renderer can count on any controller
 * having a handleEvent method. The renderer should not have to do any work or have
 * any knowledge of the controller past calling this method on any event. This method
 * should then do the work of deciding what to do afterwards.
 *
 * @param  {Event} e [Event passed from renderer to controller]
 */
SimulationEditorController.prototype.handleEvent = function(e) {
    if (this.simEditorModel.state === SimulationEditorModel.STATE.MENU) {
        // e will be an integer in this case
        // is there a way to abstract away this knowledge?

        if (e === this.simEditorModel.simulations.length) {
            // create new clicked
            console.log("create new sim clicked");
            this.simEditorModel.addSimulation(new SimulationModel());
            this.simEditorModel.startEditing(e);
            this.renderer.render();
        } else {
            // TODO: edit an existing simulation
        }
    }
};

/**
 * Called by Engine to start this controller
 */
SimulationEditorController.prototype.run = function() {
    this.simEditorModel.setLoaded();
    this.renderer.render();
};

/**
 * Initialize the simulations already in the database and then pass to the
 * simulation editor model. This method will be called on load and should aim
 * to have "async" behavior, although really we can just render the SimulationEditor
 * before this method completes. (SimulationEditor should show loading). After the
 * call to API for simulations completes and we parse them into the model, we
 * can call render again to render the actual editor
 *
 * @return {[type]} [description]
 */
SimulationEditorController.prototype.initSimulations = function() {
    var that = this;

    API.getSimulations().then(function(sims) {
        if (!$.isArray(sims)) {
            sims = [sims];
        }
        _.each(sims, function(sim) {
            that.simEditorModel.addSimulation(SimulationModel.from_object(sim));
        });

        // Simulation editor model is ready for full rendering
        that.simEditorModel.setReady();
    });
};
