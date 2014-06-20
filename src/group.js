var React = require('react');

var Child = require('./child.js');
var Header = require('./header.js');

var Group = React.createClass({
    render: function() {
        var self = this;
        var key = 0;
        return React.DOM.div(
            { className: 'react-predicate-editor-group' },
            Header({
                method: this.props.method,
                addChild: function() {
                    this.props.addChild();
                }.bind(this),
                addGroup: function() {
                    this.props.addGroup();
                }.bind(this),
                update: this.props.update,
                delete: this.props.delete
            }),
            this.props.children.map(function(child, id) {
                if (child.type == 'group') {
                    return Group({
                        key: key++,
                        method: child.method,
                        children: child.children,
                        criteria: self.props.criteria,
                        criteriaList: self.props.criteriaList,
                        dataTypes: self.props.dataTypes,
                        updateGroup: function(groupId, method) {
                            self.props.updateGroup([id].concat(groupId), method);
                        }.bind(this),
                        update: function(method) {
                            self.props.updateGroup(id, method);
                        },
                        updateChild: function(childId, data) {
                            self.props.updateChild([id].concat(childId), data);
                        },
                        addChild: function(groupId) {
                            if (groupId != null) {
                                self.props.addChild([id].concat(groupId));
                            } else {
                                self.props.addChild([id]);
                            }
                        },
                        addGroup: function(groupId) {
                            if (groupId != null) {
                                self.props.addGroup([id].concat(groupId));
                            } else {
                                self.props.addGroup([id]);
                            }
                        },
                        deleteChild: function(childId) {
                            self.props.deleteChild([id].concat(childId));
                        },
                        delete: function() {
                            self.props.deleteChild(id);
                        }
                    });
                } else {
                    return Child({
                        key: key++,
                        data: child,
                        criteria: self.props.criteria,
                        criteriaList: self.props.criteriaList,
                        dataTypes: self.props.dataTypes,
                        update: function(data) {
                            self.props.updateChild(id, data);
                        },
                        delete: function() {
                            self.props.deleteChild(id);
                        }
                    });
                }
            })
        );
    }
});

module.exports = Group;
