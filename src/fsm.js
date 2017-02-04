class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
    	//this.config.states=config.states;
    	this.config=config;
    	this.activeState;
    	this.state=config.initial;//start
    	this.event="";
    	this.prevState;
    	this.history=[];
    	this.future=[];
    	this.nextState;
    }


    /**
     * Returns active state.
     * @returns {String}  
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
    	if (!(state in this.config.states)) throw new Error;
    	this.history.push(this.state);
    	this.state = state;
    	this.future = [];
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
    	var state = this.config.states[this.state].transitions[event];
    	this.changeState(state);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
    	this.state=this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var states = [];

    	for (var state in this.config.states) {
    		if (event in this.config.states[state].transitions || event === undefined){
    			states.push(state);
    		}
    	}

    	return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
    	var previousState = this.history.pop();
    	if (previousState === undefined) return false;
        
        this.future.push(this.state);
        this.state = previousState;
    	return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
    	var futureState = this.future.pop();
    	if (futureState === undefined) return false;

    	this.history.push(this.state);
    	this.state = futureState;
    	return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
    	this.history = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
