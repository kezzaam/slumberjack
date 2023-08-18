import React from 'react';
import PropTypes from 'prop-types';

const Label = ({
	labelColor,
	labelBottom,
	labelFontSize,
	valueFontSize,
	appendToValue,
	prependToValue,
	verticalOffset,
	hideLabelValue,
	label,
	value,
}) => {
	const styles = {
		Label: {
			position: 'absolute',
			top: '0',
			left: '0',
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			color: `${labelColor}`,
			userSelect: 'none',
			zIndex: 1,
		},

		value: {
			fontSize: `${valueFontSize}`,
			position: 'relative',
		},

		bottomMargin: {
			marginBottom: `calc(${verticalOffset})`,
		},

		appended: {
			position: 'absolute',
			right: '0',
			top: '0',
			transform: 'translate(100%, 0)',
		},

		prepended: {
			position: 'absolute',
			left: '0',
			top: '0',
			transform: 'translate(-100%, 0)',
		},

		hide: {
			display: 'none',
		},
	};

	return (
		<div style={{ ...styles.Label, ...(hideLabelValue && styles.hide) }}>
			{labelBottom || <div style={{ fontSize: labelFontSize }}>{label}</div>}
			<div
				style={{ ...styles.value, ...(!labelBottom && styles.bottomMargin) }}>
				<code>
					<span style={styles.prepended}>{prependToValue}</span>
					{value}
					<span style={styles.appended}>{appendToValue}</span>
				</code>
			</div>
			{labelBottom && <div style={{ fontSize: labelFontSize }}>{label}</div>}
		</div>
	);
};

Label.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	labelColor: PropTypes.string,
	labelBottom: PropTypes.bool,
	labelFontSize: PropTypes.string,
	valueFontSize: PropTypes.string,
	appendToValue: PropTypes.string,
	prependToValue: PropTypes.string,
	verticalOffset: PropTypes.string,
	hideLabelValue: PropTypes.bool,
};

export default Label;
