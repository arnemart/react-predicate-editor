var React = require('react');
var d = React.DOM;

module.exports = React.createClass({
    update: function(e) {
        this.props.update({
            value: e.target.value
        });
    },
    render: function() {
        return d.div(
            { className: 'react-predicate-editor-string' },
            d.input({
                value: this.props.data.value,
                onChange: this.update
            })
        );
    }
});
