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
=======
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

    if (e.name === SimulationEditorModel.EVENTS.MENU_ITEM_CLICKED) {

        if (this.simEditorModel.state !== SimulationEditorModel.STATE.MENU) {
            console.log("Received <" + SimulationEditorModel.EVENTS.MENU_ITEM_CLICKED + "> when not in menu state.");
            return;
        }

        var menu_idx = e.value;

        if (menu_idx === this.simEditorModel.simulations.length) {
            // Create New Sim button is clicked
            console.log("Create New Sim");
            this.simEditorModel.addSimulation(new SimulationModel());
            this.simEditorModel.startEditing(menu_idx);
            this.renderer.render();
        }

    } else if (e.name === SimulationEditorModel.EVENTS.EDITOR_ITEM_CLICKED) {

        if (this.simEditorModel.state !== SimulationEditorModel.STATE.EDITING) {
            console.log("Received <" + SimulationEditorModel.EVENTS.EDITOR_ITEM_CLICKED + "> when not in editor state.");
            return;
        }

        // Assume
        var widget_name = e.value;
        var widget_options = e.options;

        // For now, hardcoding out widget names, but in the future maybe they
        // can be placed in their own object defs to store metadata/state
        if (widget_name === "submit-simulation") {

            // TODO: Confirmation that user wants to submit

            // TODO: Map fields of page to Model

            if (this.simEditorModel.hasAllRequiredFields()) {
                // check to see if simulation is valid before saving
                console.log("Saving " + this.simEditorModel.title);

                // TODO: Maybe have a warpper function for persistence operations
                // For now, we will just ship to API
                ModelAPIBridge.sendSimulation(this.simEditorModel);

                this.simEditorModel.finishEditing();

                this.renderer.render();

            } else {
                // TODO: Handle pressing of simulation submit before ready
                console.log("Simulation not ready for saving yet.");
            }

        } else if (widget_name === "submit-page") {

            // TODO: Confirmation that user wants to submit

            // TODO: Map fields of page to model

        }

    }
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

    } else if (this.simEditorModel.state === SimulationEditorModel.STATE.EDITING) {



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
