/**
 * Provides a namespace through which we can create static functions which
 * act as an abstraction layer between the API and the application Model
 */
var ModelAPIBridge = function() {};

/**
 * Sends a SimulationModel to API.
 *
 * Goes through the simulation model calls api functions to add to database
 *
 * @param  {SimulationModel}    simulation  [Model representing a simulation]
 */
ModelAPIBridge.sendSimulation = function(simulation) {
    //TODO:
    //  Logic to determine whether we are creating or editing a sim
    //  Logic to make the correct api calls based on model
    //  possible error handling
}
