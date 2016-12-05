import React, { Component } from 'react';
import { Link } from 'react-router';
import { FormattedMessage, intlShape, injectIntl, defineMessages } from 'react-intl';
/**
 * Displays information about a list and lets you create a new one.
 */

const messages = defineMessages({
    create: {id: 'create'}
});
class ListTile extends Component {

	propTypes: {
		count: React.PropTypes.string,
		hideCreateButton: React.PropTypes.bool,
		href: React.PropTypes.string,
		label: React.PropTypes.string,
		path: React.PropTypes.string,
		spinner: React.PropTypes.object,
		intl: intlShape.isRequired,
	};

	constructor(props) {
        super(props);
        this.state={
        	formatMessage: this.props.intl['formatMessage'],
        };
    }

	render () {
		var opts = {
			'data-list-path': this.props.path,
		};
		return (
			<div className="dashboard-group__list" {...opts}>
				<span className="dashboard-group__list-inner">
					<Link to={this.props.href} className="dashboard-group__list-tile">
						<div className="dashboard-group__list-label"><FormattedMessage id={this.props.label} /></div>
						<div className="dashboard-group__list-count">{this.props.spinner || this.props.count}</div>
					</Link>
					{/* If we want to create a new list, we append ?create, which opens the
						create form on the new page! */}
					{(!this.props.hideCreateButton) && (
						<Link
							to={this.props.href + '?create'}
							className="dashboard-group__list-create octicon octicon-plus"
							title={this.state.formatMessage(messages.create)}
							tabIndex="-1"
						/>
					)}
				</span>
			</div>
		);
	}
}

module.exports = injectIntl(ListTile);