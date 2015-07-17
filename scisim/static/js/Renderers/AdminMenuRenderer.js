/**
 * Renderer takes care of rendering views. Its render method should be called
 * by its Controller. After receiving events
 * @param {[type]} controller [description]
 * @param {[type]} menu       [description]
 */
var AdminMenuRenderer = function(controller, menu) {
    this.controller = controller;
    this.menu = menu;
    this.drawn = false;
    this.views = {
        adminView: new AdminMenuView(menu)
    };
};

/**
 * Generic render function that can be exposed to any controller. options
 * argument gives us flexibility but this process may need refactoring.
 *
 * @param  {Object} options hash of options key-valule pairs
 */
AdminMenuRenderer.prototype.render = function(options) {
    if (!this.drawn) {
        var html = this.views.adminView.template();
        ps.transitionPage(html);
        this.attachListeners();
        this.drawn = true;
    }
};

/**
 * Attach listeners to elements on page to pass back to controller
 */
 AdminMenuRenderer.prototype.attachListeners = function() {
    var $choices = $('.list-group-item');
    var $choice;
    for (var i=0; i<$choices.length; i++) {
        $choice = $($choices[i]);
        $choice.click(this.handleClicked.bind(this));
    }
 };

/**
 * Some more rendering-specific handling can be done here if necessary but
 * leave all logic to the controller
 */
AdminMenuRenderer.prototype.handleClicked = function(e) {
    var choice = $(e.currentTarget).find("input").val();
    console.log("handleClicked passing " + choice + " to controller");
    this.controller.handleEvent(choice);
};

/**
 * Tear down procedures should be placed here. This method can be called by
 * the controller when it is torn down by the engine.
 */
AdminMenuRenderer.prototype.teardown = function() {
    this.drawn = false;
};

