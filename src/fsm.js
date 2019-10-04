class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.initial = config.initial,
        this.state = config.initial,
        this.transitions = config.states[config.initial].transitions,
        this.prevArray = [],
        this.nextArray = [],
        this.states = config.states
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
        let keys = Object.keys(this.states);
        if (!keys.includes(state)){
            throw new Error('Ooops');
        } else 
        this.prevArray.push(this.state);
        this.state = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.prevArray.push(this.state);
        this.state = this.transitions[event];
        this.transitions = this.states[this.state].transitions;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.prevArray = [];
        this.state = this.initial;
        this.transitions = this.states[this.state].transitions;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let array = [];
        let keys = Object.keys(this.states);
        if (!event) {
            return keys;
        }

        keys.forEach(item => {
            if (Object.keys(this.states[item].transitions).includes(event)){
                array.push(item);
            };
        });
        return array;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.state === this.initial){
            return false;
        } else {
            if (this.nextArray[this.nextArray.length - 1] !== this.state){
                this.nextArray.push(this.state);
            }
            this.state = this.prevArray.pop();
            this.transitions = this.states[this.state].transitions;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.nextArray.length === 0){
            return false;
        } else {
            this.prevArray.push(this.state);
            this.state = this.nextArray.pop();
            this.transitions = this.states[this.state].transitions;
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.state = this.initial;
        this.transitions = this.states[this.state].transitions;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/