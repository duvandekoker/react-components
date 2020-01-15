/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import classNames from 'classnames';
import styled from 'styled-components';
import PaginationStyles from '@zendeskgarden/css-pagination';
import { retrieveComponentStyles, DEFAULT_THEME } from '@zendeskgarden/react-theming';

import { StyledPage } from './StyledPage';
const COMPONENT_ID = 'pagination.previous_page';

export const StyledPreviousPage = styled(StyledPage).attrs(props => ({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION,
  className: classNames(props.className, PaginationStyles['c-pagination__page--previous'])
}))`
  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledPreviousPage.defaultProps = {
  theme: DEFAULT_THEME
};