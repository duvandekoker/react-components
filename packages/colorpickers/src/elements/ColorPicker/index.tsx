/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, {
  useEffect,
  useCallback,
  useReducer,
  forwardRef,
  HTMLAttributes,
  useMemo,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import { Label } from '@zendeskgarden/react-forms';
import { ColorWell } from './ColorWell';
import {
  StyledHue,
  StyledSliderGroup,
  StyledLabel,
  StyledInput,
  StyledAlpha,
  StyledSliders,
  StyledHexField,
  StyledRGBAField,
  StyledInputGroup,
  StyledPreview,
  StyledColorPicker,
  StyledCheckered,
  StyledAlphaGradient,
  StyledAlphaField,
  StyledHueField
} from '../../styled';
import { areColorsEqual, convertStringToColor, getInitialState, reducer } from './reducer';
import { IColor, IHSVColor } from '../../utils/types';

export interface IColorPickerLabels {
  hueSlider?: string;
  alphaSlider?: string;
  hex?: string;
  red?: string;
  green?: string;
  blue?: string;
  alpha?: string;
}

export interface IColorPickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'onChange'> {
  /** A default color for a uncontrolled color picker. Can be a valid color string or IColor state */
  defaultColor?: string | IColor;
  /** A color value for a controlled color picker. Can be a valid color string or IColor state */
  color?: string | IColor;
  /**
   * Handles color picker changes
   *
   * @param {Object} color a color picker state
   */
  onChange?: (color: IColor) => void;
  /** Replaces the default labels within the color picker */
  labels?: IColorPickerLabels;
  /** Autofocuses the hex input element */
  autofocus?: boolean;
}

/**
 * @extends HTMLAttributes<HTMLDivElement>
 */
export const ColorPicker = forwardRef<HTMLDivElement, IColorPickerProps>(
  ({ color, defaultColor, labels = {}, autofocus, onChange, ...props }, ref) => {
    const [state, dispatch] = useReducer(reducer, getInitialState(color || defaultColor));
    const previousComputedColorRef = useRef<IColor>(state.color);
    const previousStateColorRef = useRef<IColor>(state.color);

    const computedColor = useMemo(() => {
      if (color) {
        if (typeof color === 'string') {
          const convertedColor = convertStringToColor(color);

          if (convertedColor) {
            return convertedColor;
          }
        } else {
          return color;
        }
      }

      return state.color;
    }, [color, state.color]);

    useEffect(() => {
      if (
        !areColorsEqual(previousStateColorRef.current, state.color) &&
        !areColorsEqual(color, state.color)
      ) {
        onChange && onChange(state.color);
      }

      previousStateColorRef.current = state.color;
    }, [color, onChange, state.color]);

    useEffect(() => {
      if (!areColorsEqual(computedColor, previousComputedColorRef.current)) {
        dispatch({ type: 'RESET_COLOR', payload: computedColor });
      }

      previousComputedColorRef.current = computedColor;
    }, [computedColor]);

    const handleColorWellChange = useCallback((hsv: IHSVColor) => {
      dispatch({
        type: 'SATURATION_CHANGE',
        payload: hsv
      });
    }, []);

    const handleHueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'HUE_CHANGE', payload: e.target.value });
    }, []);

    const handleAlphaSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'ALPHA_SLIDER_CHANGE', payload: e.target.value });
    }, []);

    const handleHexChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'HEX_CHANGE', payload: e.target.value });
    }, []);

    const handleRedChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'RED_CHANGE', payload: e.target.value });
    }, []);

    const handleGreenChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'GREEN_CHANGE', payload: e.target.value });
    }, []);

    const handleBlueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'BLUE_CHANGE', payload: e.target.value });
    }, []);

    const handleAlphaChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'ALPHA_CHANGE', payload: e.target.value });
    }, []);

    const handleBlur = useCallback(() => {
      dispatch({ type: 'RESET_COLOR', payload: computedColor });
    }, [computedColor]);

    return (
      <StyledColorPicker ref={ref} {...props}>
        <ColorWell
          hue={computedColor.hue}
          saturation={computedColor.saturation}
          lightness={computedColor.lightness}
          onChange={handleColorWellChange}
        />
        <StyledSliderGroup>
          <StyledPreview
            red={computedColor.red}
            green={computedColor.green}
            blue={computedColor.blue}
            alpha={computedColor.alpha}
          />
          <StyledSliders>
            <StyledHueField>
              <Label hidden>{labels.hueSlider || 'Hue slider'}</Label>
              <StyledHue step={1} max={359} value={computedColor.hue} onChange={handleHueChange} />
            </StyledHueField>
            <StyledAlphaField>
              <Label hidden>{labels.alphaSlider || 'Alpha slider'}</Label>
              <StyledAlpha
                max={1}
                step={0.01}
                value={computedColor.alpha / 100}
                onChange={handleAlphaSliderChange}
              />
              <StyledCheckered />
              <StyledAlphaGradient
                red={computedColor.red}
                green={computedColor.green}
                blue={computedColor.blue}
              />
            </StyledAlphaField>
          </StyledSliders>
        </StyledSliderGroup>
        <StyledInputGroup>
          <StyledHexField>
            <StyledLabel isRegular>{labels.hex || 'Hex'}</StyledLabel>
            <StyledInput
              isCompact
              maxLength={7}
              value={state.hexInput}
              /* eslint-disable jsx-a11y/no-autofocus */
              autoFocus={autofocus}
              onBlur={handleBlur}
              onChange={handleHexChange}
            />
          </StyledHexField>
          <StyledRGBAField>
            <StyledLabel isRegular>{labels.red || 'R'}</StyledLabel>
            <StyledInput
              isCompact
              type="number"
              min="0"
              max="255"
              maxLength={3}
              value={state.redInput}
              onBlur={handleBlur}
              onChange={handleRedChange}
            />
          </StyledRGBAField>
          <StyledRGBAField>
            <StyledLabel isRegular>{labels.green || 'G'}</StyledLabel>
            <StyledInput
              isCompact
              type="number"
              min="0"
              max="255"
              maxLength={3}
              value={state.greenInput}
              onBlur={handleBlur}
              onChange={handleGreenChange}
            />
          </StyledRGBAField>
          <StyledRGBAField>
            <StyledLabel isRegular>{labels.blue || 'B'}</StyledLabel>
            <StyledInput
              isCompact
              type="number"
              min="0"
              max="255"
              maxLength={3}
              value={state.blueInput}
              onBlur={handleBlur}
              onChange={handleBlueChange}
            />
          </StyledRGBAField>
          <StyledRGBAField>
            <StyledLabel isRegular>{labels.alpha || 'A'}</StyledLabel>
            <StyledInput
              isCompact
              type="number"
              min="0"
              max="100"
              value={state.alphaInput}
              onBlur={handleBlur}
              onChange={handleAlphaChange}
            />
          </StyledRGBAField>
        </StyledInputGroup>
      </StyledColorPicker>
    );
  }
);

ColorPicker.defaultProps = {
  defaultColor: '#ffffff'
};

ColorPicker.displayName = 'ColorPicker';

ColorPicker.propTypes = {
  color: PropTypes.oneOfType<any>([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func,
  labels: PropTypes.object,
  defaultColor: PropTypes.oneOfType<any>([PropTypes.object, PropTypes.string])
};
