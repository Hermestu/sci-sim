/**
 * Page modifiers are options on simulation pages.
 *
 * Could extend the functionality of this class in the future. For now, it is
 * mainly to keep consistent with the rest of our editor code base.
 *
 * SimulationPageModel at the moment uses a key-value store which shortcuts iterating
 * over its array of SimulationPageModifers and SimulationPageActions.
 *
 * @param {String} name  [Name of modifier]
 * @param {String} value [Value of modifier]
 */
var SimulationPageModifierModel = function(name, value) {
    this.name = name;
    this.value = value;
};

/**
 * An enum of all the current possible page modifiers. This will assumedly be
 * fairly static and it will be more expressive to expose modifiers as an
 * enum instead of as string literals
 */
SimulationPageModifierModel.MODIFIERS = Object.freeze({
    POPUP_WINDOW: "Popup window",
    RANDOM_CHOICES: "This page should randomize its choices",
    MINIMUM_CHOICES: "This page has a minimum number of choices to reach",
    MINIMUM_CHOICES_REACHED: "This is the number of minimum choices to reach",
    CAN_ADD_QUESTION_GROUPS: "This page can add question groups"
});
