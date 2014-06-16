var React = require('react');
var d = React.DOM;

module.exports = React.createClass({
    render: function() {
        return d.div(
            { className: 'react-predicate-editor-criterion' },
            d.select(
                {},
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
            this.props.dataTypes[this.props.criteria[this.props.data.type].type]({
                data: this.props.data,
                update: function(data) {
                    data.type = this.props.data.type;
                    this.props.update(data);
                }.bind(this)
            })
        );
    }
});
