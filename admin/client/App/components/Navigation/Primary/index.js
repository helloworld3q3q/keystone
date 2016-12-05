/**
 * The primary (i.e. uppermost) navigation on desktop. Renders all sections and
 * the home-, website- and signout buttons.
 */

import React, { Component } from 'react';
import { Container } from '../../../elemental';
import PrimaryNavItem from './NavItem';
import { FormattedMessage, intlShape, injectIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
    signout: {id: 'signout'},
    dashboard: {id: 'dashboard'},
    front: {id: 'front'}
});

class PrimaryNavigation extends Component {
	propTypes: {
		brand: React.PropTypes.string,
		currentSectionKey: React.PropTypes.string,
		sections: React.PropTypes.array.isRequired,
		signoutUrl: React.PropTypes.string,
		intl: intlShape.isRequired,
	};

	constructor(props) {
        super(props);
        this.state={
        	formatMessage: this.props.intl['formatMessage'],
        };
    }

	// Handle resizing, hide this navigation on mobile (i.e. < 768px) screens
	componentDidMount () {
		this.handleResize();
		window.addEventListener('resize', this.handleResize);
	}
	componentWillUnmount () {
		window.removeEventListener('resize', this.handleResize);
	}
	handleResize = () => {
		this.setState({
			navIsVisible: window.innerWidth >= 768,
		});
	}
	// Render the sign out button
	renderSignout () {
		if (!this.props.signoutUrl) return null;
		return (
			<PrimaryNavItem
				label="octicon-sign-out"
				href={this.props.signoutUrl}
				title={this.state.formatMessage(messages.signout)}
			>
				<span className="octicon octicon-sign-out" />
			</PrimaryNavItem>
		);
	}
	// Render the back button
	renderBackButton () {
		if (!Keystone.backUrl) return null;
		return (
			<PrimaryNavItem
				label="octicon-globe"
				href={Keystone.backUrl}
				title={this.state.formatMessage(messages.front)}
			>
				<span className="octicon octicon-globe" />
			</PrimaryNavItem>
		);
	}
	// Render the link to the webpage
	renderFrontLink () {
		return (
			<ul className="app-nav app-nav--primary app-nav--right">
				{this.renderBackButton()}
				{this.renderSignout()}
			</ul>
		);
	}
	renderBrand () {
		// TODO: support navbarLogo from keystone config

		const { brand, currentSectionKey } = this.props;
		const className = currentSectionKey === 'dashboard' ? 'primary-navbar__brand primary-navbar__item--active' : 'primary-navbar__brand';

		return (
			<PrimaryNavItem
				className={className}
				label="octicon-home"
				title={this.state.formatMessage(messages.dashboard)}
				to={Keystone.adminPath}
			>
				<span className="octicon octicon-home" />
			</PrimaryNavItem>
		);
	}
	// Render the navigation
	renderNavigation () {
		if (!this.props.sections || !this.props.sections.length) return null;

		return this.props.sections.map((section) => {
			// Get the link and the class name
			const href = section.lists[0].external ? section.lists[0].path : `${Keystone.adminPath}/${section.lists[0].path}`;
			const isActive = this.props.currentSectionKey && this.props.currentSectionKey === section.key;
			const className = isActive ? 'primary-navbar__item--active' : null;

			return (
				<PrimaryNavItem
					active={isActive}
					key={section.key}
					label={section.label}
					className={className}
					to={href}
				>
					<FormattedMessage id={section.label} /> 
				</PrimaryNavItem>
			);
		});
	}
	render () {
		if (!this.state.navIsVisible) return null;

		return (
			<nav className="primary-navbar">
				<Container clearFloatingChildren>
					<ul className="app-nav app-nav--primary app-nav--left">
						{this.renderBrand()}
						{this.renderNavigation()}
					</ul>
					{this.renderFrontLink()}
				</Container>
			</nav>
		);
	}
}
module.exports = injectIntl(PrimaryNavigation);
