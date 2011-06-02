/**
 * A container for collections of connected AudioletNodes.  Groups make it
 * possible to create multiple copies of predefined networks of nodes,
 * without having to manually create and connect up each individual node.
 *
 * From the outside groups look and behave exactly the same as nodes.
 * Internally you can connect nodes directly to the group's inputs and
 * outputs, allowing connection to nodes outside of the group.
 */
var AudioletGroup = new Class({
    /**
     * Constructor
     *
     * @param {Audiolet} audiolet The audiolet object
     * @param {Number} numberOfInputs
     * @param {Number} numberOfOutputs
     */
    initialize: function(audiolet, numberOfInputs, numberOfOutputs) {
        this.audiolet = audiolet;
        this.numberOfInputs = numberOfInputs;
        this.numberOfOutputs = numberOfOutputs;

        this.inputs = [];
        for (var i = 0; i < numberOfInputs; i++) {
            this.inputs.push(new PassThroughNode(this.audiolet, 1, 1));
        }

        this.outputs = [];
        for (var i = 0; i < numberOfOutputs; i++) {
            this.outputs.push(new PassThroughNode(this.audiolet, 1, 1));
        }
    },

    /**
     * Connect the group to another node or group
     *
     * @param {AudioletNode|AudioletGroup} node The node to connect to
     * @param {Number} output The index of the output to connect from
     * @param {Number} input The index of the input to connect to
     */
    connect: function(node, output, input) {
        this.outputs[output || 0].connect(node, 0, input);
    },

    /**
     * Disconnect the group from another node or group
     *
     * @param {AudioletNode|AudioletGroup} node The node to disconnect from
     * @param {Number} output The index of the output to disconnect
     * @param {Number} input The index of the input to disconnect
     */

    disconnect: function(node, output, input) {
        this.outputs[output || 0].disconnect(node, 0, input);
    },

    /**
     * Remove the group completely from the processing graph, disconnecting all
     * of its inputs and outputs
     */
    remove: function() {
        var numberOfInputs = this.inputs.length;
        for (var i = 0; i < numberOfInputs; i++) {
            this.inputs[i].remove();
        }

        var numberOfOutputs = this.outputs.length;
        for (var i = 0; i < numberOfOutputs; i++) {
            this.outputs[i].remove();
        }
    }
});
