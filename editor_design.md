Setup
----------

The access point for the admin portal of the website right now is /admin
However, at the moment, nginx is not configured to allow /admin routes.

To set up /admin route for local development, ssh into your vagrant box and run

1. sudo vim /etc/nginx/sites-enabled/localhos
    Add in the following block:

        location /admin \{
        proxy_pass http://127.0.0.1:5000;
        \}

2. sudo service nginx restart

After this, you can python start_local_dev.py to start the local server. Navigating to the /admin route will serve the admin.html file within the templates folder. I don't know why, but when I tried to just serve admin.html from the base / route, I kept getting an error which is why I opted for this.


Design
----------

The design for the editor will use a modified MVC pattern. An AdminEngine object will control navigation between separate pages

The design was created in such a way as to hopefully allow for code separation and modularity between separate controllers/views using the same base model. Right now, we are mainly working on the simulation editor controller, but in the future there may be uses for more such as table editing, user management, etc...

AdminEngine controls navigation through the admin portal. Right now it just handles how to switch between different Controllers, but in the future this is where we would do things like what should happen on "back" and storing persistence information.

Controllers will have a backreference to the engine they are assigned to so that they can ask for page changes, etc... Controllers should have a reference to the model that it will affect and the renderer. When a Controller receives an event from its renderer, it will change the model based on the current state of the model and the event received. It will then tell the renderer to render again to update the display.

Renderers are in charge of how things are displayed. It will have a backreference to its Controller so that it can pass through events. It makes some sense for Renderer to be in charge of attaching listeners, because it is the part of the application that knows about what is displayed and what event listeners need to be attached to. They should not do any application logic. Usually, they will receive an event and then pass it on immediately to their controller which will use that event to change the model and call render again. However, there logic can be done in the renderer's event handler if need be if it doesn't make sense for controller to do such logic. Renderers won't usually build the raw html that is displayed on the page. This is left to views. A renderer may use different views depending on the state of the model.

Views are where we actually define the HTML that is displayed on the page. While Renderers determine how things should be displayed. Views determine what should be displayed. Views should also have a reference to the model for use in creating the display. I've been playing around with some different templating techniques. It seems like the underscore templating language <http://www.bennadel.com/blog/2411-using-underscore-js-templates-to-render-html-partials.htm> would be useful for us since it might be easier to have more expressive templates instead of having to build compound content in javascript and appending to simple substitution templates like we have been previously with template filler. That said, it looks like it's more difficult to make these underscore templates into external files. It might be worth looking into [require.js](http://www.requirejs.org/). Not only would this allow us to define external text file dependencies (for templates), but it might also make our code more readable (we import what we need in each file instead of having globals).

The Views are where the front end developer should be able to work.

In particular, right now we need a better View for the simulation editor. AdminMenuView and SimulationEditorMenuView are simple views that just show a menu and can be used as examples.

The simulation editor view should include at the base, forms for simulation title, description, etc...

![schema.png](schema.png)

You may also look at SimulationModel under Entities in the js source code for insight into what a Simulation looks like. We can think about selectively displaying the most important fields later. Assume that we will be editing an existing simulation. That is, if a field has a value, that should be already inserted into the corresponding form. Or else, the form should be blank or have a suggestion text. The more interesting part is what to do with Pages of a simulation. Disregarding metadata, the model roughly has the structure:

    Simulation
        Array<Page>  // This should be ordered

    Page
        Array<PageSection>  // Also ordered

    Section
        // Tricky because there can be several types

Page also has PageModifiers and PageActions but I am considering that metadata at this moment. You can see corresponding enums for both PageModifier and PageAction in their corresponding Model definitions in the source code. It might be possible to use these enums to create a sort of checkbox or similar structure for each Page. There is only one type of Section in the database, however for Dr. Peffer's purposes there are different kinds (e.g. 'big_heading', 'text', etc...).
