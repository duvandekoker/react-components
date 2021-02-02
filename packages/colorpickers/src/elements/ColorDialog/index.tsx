/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, {
  useState,
  useRef,
  Children,
  cloneElement,
  forwardRef,
  ReactElement,
  HTMLAttributes
} from 'react';
import PropTypes from 'prop-types';
import mergeRefs from 'react-merge-refs';
import { GARDEN_PLACEMENT } from '@zendeskgarden/react-modals';
import Chevron from '@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg';
import { ColorPicker, IColorPickerProps } from '../ColorPicker';
import { IColorPickerState } from '../ColorPicker/reducer';
import { IRGBColor } from '../../utils/types';
import {
  StyledIcon,
  StyledButton,
  StyledFauxInput,
  StyledDialogPreview,
  StyledTooltipModal,
  StyledTooltipBody
} from '../../styled';

export interface IColorDialogProps extends IColorPickerProps {
  /**
   * Handles close actions. Can be triggered from the backdrop.
   *
   * @param {Object} state An color picker's state
   */
  onClose?: (state: IColorPickerState) => void;
  /** Adjusts the placement of the color dialog */
  placement?: GARDEN_PLACEMENT;
}

/**
 * @extends HTMLAttributes<HTMLButtonElement>
 */
export const ColorDialog = forwardRef<
  HTMLButtonElement,
  IColorDialogProps & Omit<HTMLAttributes<HTMLButtonElement>, 'color'>
>(({ color, placement, onClose, labels, children, ...props }, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState<IColorPickerState | IRGBColor | string>(color);
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();
  const mergedRef = mergeRefs([ref, buttonRef]);

  const onClick = () => {
    if (referenceElement) {
      setReferenceElement(null);
    } else {
      setReferenceElement(buttonRef.current);
    }
  };

  return (
    <>
      {children ? (
        cloneElement(Children.only(children as ReactElement), {
          onClick,
          ref: mergedRef
        })
      ) : (
        <StyledFauxInput tabIndex={-1}>
          <StyledButton {...props} ref={mergedRef} onClick={onClick}>
            <StyledDialogPreview backgroundColor={color} />
            <StyledIcon isRotated={referenceElement}>
              <Chevron />
            </StyledIcon>
          </StyledButton>
        </StyledFauxInput>
      )}
      <StyledTooltipModal
        hasArrow={false}
        placement={placement}
        referenceElement={referenceElement}
        onClose={() => {
          setReferenceElement(null);
          onClose && onClose(selectedColor as IColorPickerState);
        }}
      >
        <StyledTooltipBody>
          <ColorPicker
            color={color}
            labels={labels}
            ref={colorPickerRef}
            onChange={setSelectedColor}
          />
        </StyledTooltipBody>
      </StyledTooltipModal>
    </>
  );
});

ColorDialog.propTypes = {
  placement: PropTypes.oneOf([
    'auto',
    'top',
    'top-start',
    'top-end',
    'end',
    'end-top',
    'end-bottom',
    'bottom',
    'bottom-start',
    'bottom-end',
    'start',
    'start-top',
    'start-bottom'
  ]),
  onClose: PropTypes.func,
  labels: PropTypes.object,
  color: PropTypes.oneOfType<any>([PropTypes.object, PropTypes.string]).isRequired
};

ColorDialog.displayName = 'ColorDialog';