/**
 * Render a footer for a popout
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Translate from '../../../utils/translate';

const BUTTON_BASE_CLASSNAME = 'Popout__footer__button Popout__footer__button--';

const PopoutFooter = React.createClass({
	displayName: 'PopoutFooter',
	propTypes: {
		children: React.PropTypes.node,
		primaryButtonAction: React.PropTypes.func,
		primaryButtonIsSubmit: React.PropTypes.bool,
		primaryButtonLabel: React.PropTypes.string,
		secondaryButtonAction: React.PropTypes.func,
		secondaryButtonLabel: React.PropTypes.string,
	},
	// Render a primary button
	renderPrimaryButton () {
		if (!this.props.primaryButtonLabel) return null;

		return (
			<button
				type={this.props.primaryButtonIsSubmit ? 'submit' : 'button'}
				className={BUTTON_BASE_CLASSNAME + 'primary'}
				onClick={this.props.primaryButtonAction}
			>
				<FormattedMessage id={this.props.primaryButtonLabel}/>
			</button>
		);
	},
	// Render a secondary button
	renderSecondaryButton () {
		if (!this.props.secondaryButtonAction || !this.props.secondaryButtonLabel) return null;

		return (
			<button
				type="button"
				className={BUTTON_BASE_CLASSNAME + 'secondary'}
				onClick={this.props.secondaryButtonAction}
			>
				<FormattedMessage id={this.props.secondaryButtonLabel}/>
			</button>
		);
	},
	render () {
		return (
			<Translate Template={
				<div className="Popout__footer">
					{this.renderPrimaryButton()}
					{this.renderSecondaryButton()}
					{ this.props.children ? <FormattedMessage id={this.props.children.toLowerCase()}/> : null }
				</div>
			}/>
		);
	},
});

module.exports = PopoutFooter;
