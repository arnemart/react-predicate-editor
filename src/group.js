var React = require('react');

var Child = require('./child.js');

var Group = React.createClass({
    render: function() {
        var key = 0;
        return React.DOM.div(
            { className: 'react-predicate-editor-group' },
            // Header({
            //     method: this.props.method,
            //     addChild: this.props.addChild
            // }),
            this.props.children.map(function(child, id) {
                if (child.type == 'group') {
                    return Group({
                        key: key++,
                        method: child.method,
                        children: child.children,
                        criteria: this.props.criteria,
                        criteriaList: this.props.criteriaList,
                        dataTypes: this.props.dataTypes,
                        updateChild: function(childId, data) {
                            this.props.updateChild([id].concat(childId), data);
                        }.bind(this)
                    });
                } else {
                    return Child({
                        key: key++,
                        data: child,
                        criteria: this.props.criteria,
                        criteriaList: this.props.criteriaList,
                        dataTypes: this.props.dataTypes,
                        update: function(data) {
                            this.props.updateChild(id, data);
                        }.bind(this)
                    });
                }
            }.bind(this))
        );
    }
});

module.exports = Group;
