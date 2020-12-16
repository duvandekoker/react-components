/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { retrieveComponentStyles, DEFAULT_THEME } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'colorpicker';

interface IStyledColorPicker {
  width?: number;
}

export const StyledColorPicker = styled.div<IStyledColorPicker>`
  width: ${props => (props.width ? `${props.width}px` : '292px')};

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledColorPicker.defaultProps = {
  theme: DEFAULT_THEME
};