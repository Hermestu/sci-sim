/**
 * Holds information about a PageSection.
 *
 * This model is interesting and we may
 * want to modify how it currently looks. In the database, we only have generic
 * page sections which have a content field containing the raw html that should
 * be placed into the section. We do need some abstract concept of a section so
 * that we can order the sections properly on the page, however it might be desirable
 * to have different types of page sections. This will be especially useful in the
 * SimulationEditor because when editing, the user will be choosing between
 * different types of sections anyway, rather than working with raw html.
 *
 * This reorganization of the model is a TODO for now. The current main gripe is
 * that the current model forces either the application to know how to transform
 * different "types" of sections into the right content or force the model to
 * expose different functions for parsing content based on type, which is how the
 * model is currently implemented.
 *
 * @param {{}} args [Object containing key-value pairs received from db]
 */
var SimulationPageSectionModel = function(args) {

    // Content in raw html. Will need to be formatted by model or application based on type of section
    this.content = args.content;

    // This field will be kept here for now, but can be determined through the parent Page
    // Consider removing
    this.order = args.order;

    // Determines whether or not section is displayed or not. Use of this field is questionable.
    this.show = args.show;
};

/**
 * Enum for types of sections taken initially from sim_parser.py parser.
 */
SimulationPageSectionModel.TYPES = Object.freeze({

    // Might be able to merge into just a HEADING type but leaving separate for now
    HEADING_BIG: "big_heading",
    HEADING_MEDIUM: "medium_heading",
    HEADING_SMALL: "small_heading",
    HEADING_REGULAR: "regular_heading",

    TEXT: "text",

    // Media might need to be broken up into separate types
    MEDIA: "media",
    // IMAGE: "image",
    // AUDIO: "audio"
});

/**
 * Takes in a json object from api call and returns a new SimulatioPageSectionModel
 *
 * See API documentation for more information on object that is passed in.
 *
 * @param  {{}}                 sim     [json objects representing a simulation page section]
 * @return {SimulationModel}            [An SimulationPageSectionModel representing a simulation page section]
 */
SimulationPageSectionModel.from_object = function(section) {
    return new SimulationPageSectionModel(section);
};

/**
 * Set content based to section based on content type. Will be called by
 * the simulation editor when creating a page section
 *
 * @param {String}                  content         [semantic content of section]
 * @param {PageSectionModel.TYPEs}  content_type    [type of content which will determine the raw html]
 */
SimulationPageSectionModel.prototype.setContent = function(content, content_type) {
    // TODO: Add parsing code
};

/**
 * Probably not the best way to set order, especially through editor. Would be
 * better if we could do this through PageModel itself using its array of page sections
 * @param {[type]} order [description]
 */
SimulationPageSectionModel.prototype.setOrder = function(order) {
    this.order = order;
};
