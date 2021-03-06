/* eslint quote-props: ["error", "as-needed"] */

import React, { PropTypes } from 'react';
import { StyleSheet } from 'aphrodite/no-important';
import Button from '../Button';
import Glyph from '../Glyph';
import { FormattedMessage, intlShape } from 'react-intl';

function GlyphButton ({
	children,
	glyph,
	glyphColor,
	glyphSize,
	position,
	...props,
}) {
	const isDefault = position === 'default';
	const isLeft = position === 'left';
	const isRight = position === 'right';

	const glyphStyles = {};
	if (isLeft) glyphStyles.marginRight = '0.5em';
	if (isRight) glyphStyles.marginLeft = '0.5em';

	const icon = (
		<Glyph
			className={classes.glyph}
			color={glyphColor}
			name={glyph}
			size={glyphSize}
			style={glyphStyles}
		/>
	);
	return (
		<Button {...props}>
			{(isDefault || isLeft) && icon}
			{ typeof children === 'string' ? <FormattedMessage id={children}/> : children}
			{isRight && icon}
		</Button>
	);
};

// For props "glyph", "glyphColor", and "glyphSize":
// prop type validation will occur within the Glyph component, no need to
// duplicate, just pass it through.
GlyphButton.propTypes = {
	glyph: PropTypes.string,
	glyphColor: PropTypes.string,
	glyphSize: PropTypes.string,
	intl: intlShape.isRequired,
	position: PropTypes.oneOf(['default', 'left', 'right']),
};
GlyphButton.defaultProps = {
	position: 'default', // no margin, assumes no children
};

const classes = StyleSheet.create({
	glyph: {
		display: 'inline-block',
		marginTop: '-0.125em', // fix icon alignment
		verticalAlign: 'middle',
	},
});

module.exports = GlyphButton;
