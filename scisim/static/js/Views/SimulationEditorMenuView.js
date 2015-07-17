var SimulationEditorMenuView = function(editor) {
    this.editor = editor;
    console.log(editor);

    /* ---
    * Scoping _.template here so that it will always use this scope
    --- */
    this.template = _.template(' \
        <% var i = 0; %> \
        <% _.each(this.editor.simulations, function(sim) { %> \
            <div class="list-group-item clickable"> \
                <div class="media"> \
                    <div class="media-body"> \
                        <h4 class="media-heading list-item-heading"> \
                            <%= sim.title %> \
                        </h4> \
                        <p> \
                            <%= sim.desc %> \
                        </p> \
                        <input type="hidden" value="<%= i %>"> \
                    </div> \
                </div> \
            </div> \
            <% i = i + 1; %> \
        <% }); %> \
        \
        <div class="list-group-item clickable"> \
            <div class="media"> \
                <h4 class="media-body"> \
                    <h4 class="media-heading list-item-heading"> \
                            Create Simulation \
                        </h4> \
                        <p> \
                            Click here to create a new simulation \
                        </p> \
                        <input type="hidden" value="<%= i %>"> \
                    </div> \
                </div> \
            </div> \
    ');

    // Underscore templating with strings.
    // This is a little ugly. If possible, we should look into a library like
    // require.js which will allow us to import text files to use as templates
    // This will allow us to re-use templates as well
};
