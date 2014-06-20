var React = require('react');
var d = React.DOM;

module.exports = React.createClass({
    update: function(e) {
        this.props.update(e.target.value);
    },
    render: function() {
        return d.div(
            { className: 'react-predicate-editor-group-header' },
            d.select(
                {
                    value: this.props.method,
                    className: 'react-predicate-editor-group-method',
                    onChange: this.update
                },
                ['and', 'or', 'xor', 'none'].map(function(method) {
                    return d.option(
                        {
                            value: method,
                            key: method
                        },
                        method
                    );
                }.bind(this))
            ),
            d.button(
                { onClick: this.props.addGroup },
                'Add group'
            ),
            d.button(
                { onClick: this.props.addChild },
                'Add criterion'
            ),
            (this.props.delete ? d.button(
                { onClick: this.props.delete },
                '×'
            ) : null)
        );
    }
});
