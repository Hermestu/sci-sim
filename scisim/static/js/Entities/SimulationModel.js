/**
 * Holds information about an entire simulation.
 *
 * SimulationEditor will use this model when creating/updating simulations instead
 * of directly interacting with database. Provides an abstraction layer between
 * application and database.
 *
 * Maybe in the future, these models may also be extended to use in the actual
 * simulation engine, but it will need to be tweaked. Namely, such a model will
 * need information about state of the running simulation which is not provided by these
 * models. These models represent the format of the simulation.
 *
 * @param {[type]} args [description]
 */
var SimulationModel = function(args) {
    this.title = args.title;
    this.id = args.id;
    this.folder_name = args.folder_name;
    this.preview_image_filename = args.preview_image_filename;
    this.preview_image_credit = args.preview_image_credit;
    this.desc = args.desc;
    this.first_page_id = args.first_page_id;
    this.order = args.order;
    this.password = args.password;
    this.enabled = args.enabled;
    this.show_library = args.show_library;
    this.library = args.library;

    this.pages = args.pages || [];
};

/**
 * Takes in a json object from api call and returns a new SimulationModel
 *
 * See API documentation for more information on object that is passed in.
 *
 * @param  {{}}                 sim     [json objects representing a simulation]
 * @return {SimulationModel}            [An object representing a simulation]
 */
SimulationModel.from_object = function(sim) {

    if (sim.pages) {
        delete sim.pages;
    }

    sim = new SimulationModel(sim);

    // Take the pages given and create SimulationPageModels
    API.getSimulationPages(sim.id).then(function(pages) {
        var page_models = [];
        _.each(pages, function(page) {
            page_models.push(SimulationPageModel.from_object(page));
        });
        sim.pages = page_models;
    });

    return sim;
};

SimulationModel.prototype.addPage = function(page) {
    this.pages.push(page);
};

// TODO: Proper getters and setters if deemed necessary
