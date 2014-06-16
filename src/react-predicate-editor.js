var React = require('react');

var Group = require('./group.js');

var predicateWrapper = React.createClass({
    dataTypes: {
        // int: require('./criteria-int.js'),
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
                'test': {
                    type: 'string',
                    value: ''
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
                    type: 'test',
                    value: 'aa'
                },
                {
                    type: 'group',
                    children: [
                        { type: 'test', value: 'asd' },
                        { type: 'test', value: 'asd' },
                        {
                            type: 'group',
                            children: [ {type: 'test', value: 'asd' }]
                        },
                        { type: 'test', value: 'asd' }
                    ]
                }
            ]
        };
    },
    updateChildAtPath: function(children, path, data) {
        if (path.length == 1) {
            children[path[0]] = data;
        } else {
            children[path[0]].children = this.updateChildAtPath(children[path[0]].children, path.slice(1), data);
        }
        return children;
    },
    updateChild: function(path, data) {
        this.state.children = this.updateChildAtPath(this.state.children, path, data);
        this.setState({ children: this.state.children });
    },
    render: function() {
        var criteriaList = [];
        for (var name in this.props.criteria) {
            criteriaList.push(name);
        };
        return React.DOM.div(
            { className: 'react-predicate-editor-wrapper' },
            Group({
                method: this.state.method,
                children: this.state.children,
                criteria: this.props.criteria,
                criteriaList: criteriaList,
                dataTypes: this.dataTypes,
                updateChild: function(id, data) {
                    this.updateChild([].concat(id), data);
                }.bind(this)
            })
        );
    }
});

module.exports = predicateWrapper;
