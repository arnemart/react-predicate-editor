var React = require('react');

var Group = require('./group.js');

var predicateWrapper = React.createClass({
    dataTypes: {
        num: require('./criteria-num.js'),
        string: require('./criteria-string.js')
        // bool: require('./criteria-bool.js'),
        // list: require('./criteria-list.js')
    },
    addDataType: function(name, component) {
        this.datatypes[name] = component;
    },
    getDefaultProps: function() {
        return {
            criteria: {
                'stringtest': {
                    type: 'string',
                    value: ''
                },
                'numtest': {
                    type: 'num',
                    value: 1
                }
            }
        };
    },
    getInitialState: function() {
        return {
            type: 'group',
            method: 'and',
            children: [
                {
                    type: 'stringtest',
                    value: 'aa'
                },
                {
                    type: 'group',
                    method: 'or',
                    children: [
                        { type: 'stringtest', value: 'asd' },
                        { type: 'stringtest', value: 'asd' },
                        {
                            type: 'group',
                            method: 'xor',
                            children: [ {type: 'stringtest', value: 'asd' }]
                        },
                        { type: 'numtest', value: 1 }
                    ]
                }
            ]
        };
    },
    updateChildAtPath: function(children, path, data) {
        if (path.length == 1) {
            children[path[0]] = data;
        } else if (path.length > 1) {
            children[path[0]].children = this.updateChildAtPath(children[path[0]].children, path.slice(1), data);
        }
        return children;
    },
    updateChild: function(path, data) {
        var children = this.updateChildAtPath(this.state.children, path, data);
        this.setState({ children: children });
    },
    updateGroupAtPath: function(state, path, method) {
        if (path.length === 0) {
            state.method = method;
        } else {
            state.children[path[0]] = this.updateGroupAtPath(state.children[path[0]], path.slice(1), method);
        }
        return state;
    },
    updateGroup: function(path, method) {
        var state = this.updateGroupAtPath(this.state, path, method);
        this.setState(state);
    },
    addChildAtPath: function(state, path, addGroup) {
        if (path.length === 0) {
            if (addGroup) {
                state.children.push({
                    type: 'group',
                    method: 'and',
                    children: []
                });
            } else {
                state.children.push({
                    type: this.criteriaList[0]
                });
            }
        } else {
            state.children[path[0]] = this.addChildAtPath(state.children[path[0]], path.slice(1), addGroup);
        }
        return state;
    },
    addChild: function(path, addGroup) {
        if (!path) {
            path = [];
        }
        var state = this.addChildAtPath(this.state, path, addGroup);
        this.setState({ children: state.children });
    },
    addGroup: function(path) {
        this.addChild(path, true);
    },
    deleteChildAtPath: function(state, path) {
        if (path.length == 1) {
            state.children.splice(path[0], 1);
        } else if (path.length > 1) {
            state.children[path[0]] = this.deleteChildAtPath(state.children[path[0]], path.slice(1));
        }
        return state;
    },
    deleteChild: function(path) {
        var state = this.deleteChildAtPath(this.state, path);
        this.setState({ children: state.children });
    },
    componentWillMount: function() {
        this.criteriaList = [];
        for (var name in this.props.criteria) {
            this.criteriaList.push(name);
        };
    },
    render: function() {
        var self = this;
        return React.DOM.div(
            { className: 'react-predicate-editor-wrapper' },
            Group({
                method: this.state.method,
                children: this.state.children,
                criteria: this.props.criteria,
                criteriaList: this.criteriaList,
                dataTypes: this.dataTypes,
                updateGroup: this.updateGroup,
                update: function(method) {
                    self.updateGroup([], method);
                },
                updateChild: function(path, data) {
                    self.updateChild([].concat(path), data);
                },
                addChild: this.addChild,
                addGroup: this.addGroup,
                deleteChild: function(path) {
                    self.deleteChild([].concat(path));
                }
            })
        );
    }
});

module.exports = predicateWrapper;
