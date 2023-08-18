import React  from 'react';
import PropTypes from 'prop-types';

const Knob = ({
	isDragging,
	knobPosition,
	knobColor,
	knobSize,
	hideKnob,
	knobDraggable,
	onMouseDown,
	trackSize,
	children,
	valueFontSize,
	value,
}) => {
	const styles = {
		knob: {
			position: 'absolute',
			left: `-${knobSize / 2 - trackSize / 2}px`,
			top: `-${knobSize / 2 - trackSize / 2}px`,
			cursor: 'grab',
			zIndex: 3,
		},

		value: {
			fontSize: `1.8rem`,
			letterSpacing: '0.15rem',
			position: 'absolute',
			fontWeight: 'bold'
		},

		dragging: {
			cursor: 'grabbing',
		},

		pause: {
			animationPlayState: 'paused'
		},

		// animation: {
		// 	transformOrigin: '50% 50%',
		// 	animationTimingFunction: 'ease-out',
		// 	animationDuration: '1500ms',
		// 	animationIterationCount: 'infinite',
		// 	animationName: 'pulse',
		// },

		hide: {
			opacity: 0
		},

		normalCursor: {
			cursor: "auto"
		},
	};

	return (
		<div
			style={{
				transform: `translate(${knobPosition.x}px, ${knobPosition.y}px)`,
				...styles.knob,
				...(isDragging && styles.dragging),
				...(hideKnob && styles.hide),
				...(!knobDraggable && styles.normalCursor),
			}}
			onMouseDown={onMouseDown}
			onTouchStart={onMouseDown}>
    <svg
      width={`${knobSize}px`}
      height={`${knobSize}px`}
      viewBox={`-${1.5} -${1.5} ${knobSize + 3} ${knobSize + 3}`}
    >
      <circle
        style={{ ...styles.animation, ...(isDragging && styles.pause) }}
        fill={knobColor}
        stroke="var(--alabaster)"
        strokeWidth="3"
        cx={knobSize / 2}
        cy={knobSize / 2}
        r={knobSize / 2}
      />
      <circle
        fill={knobColor}
        stroke="none"
        cx={knobSize / 2}
        cy={knobSize / 2}
        r={(knobSize * 2) / 3 / 2}
      />
      {children ?? (
        <text x="50%" y="62%" style={styles.value} textAnchor="middle" fill="var(--alabaster)">
          <tspan x="50%">
            {value}
          </tspan>
        </text>
      )}
    </svg>
  </div>
);

};

Knob.propTypes = {
	isDragging: PropTypes.bool,
	knobPosition: PropTypes.object,
	knobColor: PropTypes.string,
	knobRadius: PropTypes.number,
	knobSize: PropTypes.number,
	hideKnob: PropTypes.bool,
	knobDraggable: PropTypes.bool,
	trackSize: PropTypes.number,
	children: PropTypes.element,
	onMouseDown: PropTypes.func,
	value: PropTypes.string,
	valueFontSize: PropTypes.string,
};

export default Knob;
