var React = require('react');
var d = React.DOM;

module.exports = React.createClass({
    changeType: function(e) {
        this.props.update({
            type: e.target.value
        });
    },
    render: function() {
        var childProps = this.props.data;
        childProps.update = function(data) {
            data.type = this.props.data.type;
            this.props.update(data);
        }.bind(this);
        return d.div(
            { className: 'react-predicate-editor-criterion' },
            d.select(
                {
                    value: this.props.data.type,
                    onChange: this.changeType
                },
                this.props.criteriaList.map(function(criterion) {
                    return d.option(
                        {
                            value: criterion,
                            key: criterion
                        },
                        criterion
                    );
                })
            ),
            this.props.dataTypes[this.props.criteria[this.props.data.type].type](childProps)
        );
    }
});
