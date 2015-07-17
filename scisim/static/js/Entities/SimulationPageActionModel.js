/**
 * Page actions are actions simulation pages can take on load.
 *
 * Could extend the functionality of this class in the future. For now, it is
 * mainly to keep consistent with the rest of our editor code base.
 *
 * SimulationPageModel at the moment uses a key-value store which shortcuts iterating
 * over its array of SimulationPageModifers and SimulationPageActions.
 *
 * @param {String} name  [Name of action]
 * @param {String} value [Value of action]
 */
var SimulationPageActionModel = function(name, value) {
    this.name = name;
    this.value = value;
};

/**
 * An enum of all the current possible page actions. This may possibly change or
 * be extended more than the modifiers on a page. Have to give more thought as to
 * how to make these easy to add/remove.
 */
SimulationPageModel.ACTIONS = Object.freeze({
    ADD_TO_NOTEBOOK: "This action adds to a users lab notebook",
    SHOW_PATIENT_CHOICES: "Show the patient choices",
    SHOW_HYPOTHESES: "Show the patient hypotheses"
});
