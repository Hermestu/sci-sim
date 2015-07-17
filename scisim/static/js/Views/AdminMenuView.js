/**
 * Define a view on AdminMenu. This will be used by AdminMenuRenderer to get
 * the html template based on choices of menu. Right now, this is a little bit
 * overkill because 1) menu should be relatively static and thus we don't really
 * need a reference to it here. However, in the future, we could keep track of
 * possibly disabled choices or other changing metadata about the menu.
 * 2) Assumedly, the AdminMenu will only have this one view, so the AdminMenuRenderer
 * could just do this work. However, other Renderers will probably have different
 * views that they will need to switch between, so just to keep it consistent
 * we should create a separate View for the AdminMenu as well.
 *
 * @param {AdminMenu} menu [Object representing our AdminMenu model]
 */
var AdminMenuView = function(menu) {
    this.menu = menu;

    /* ---
    * Scoping _.template here so that it will always use this scope
    --- */
    this.template = _.template(' \
        <% _.each(this.menu.choices, function(choice) { %> \
            <div class="list-group-item clickable"> \
                <div class="media"> \
                    <div class="media-body"> \
                        <h4 class="media-heading list-item-heading"> \
                            <%= choice.title %> \
                        </h4> \
                        <p> \
                            <%= choice.description %> \
                        </p> \
                        <input type="hidden" value="<%= choice.value %>"> \
                    </div> \
                </div> \
            </div> \
        <% }); %> \
    ');

    // Underscore templating with strings.
    // This is a little ugly. If possible, we should look into a library like
    // require.js which will allow us to import text files to use as templates
    // This will allow us to re-use templates as well.
};
