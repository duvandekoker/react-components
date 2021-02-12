/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { IconButton } from '@zendeskgarden/react-buttons';
import { ColorDialog, IColor } from '@zendeskgarden/react-colorpickers';
import LeafIcon from '@zendeskgarden/svg-icons/src/16/leaf-fill.svg';

export default {
  title: 'Components/ColorDialog',
  component: ColorDialog
} as Meta;

export const WithIconButton: Story = ({ labels, placement }) => {
  const [color, setColor] = useState<string | IColor>('rgba(23, 73, 77, 100)');
  const [selectedColor, setSelectedColor] = useState<string | IColor>('rgba(23, 73, 77, 100)');
  const iconColor =
    typeof selectedColor === 'string'
      ? selectedColor
      : `rgba(${selectedColor.red}, ${selectedColor.green}, ${selectedColor.blue}, ${selectedColor.alpha})`;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ColorDialog
        color={color}
        labels={labels}
        onChange={setColor}
        placement={placement}
        onClose={setSelectedColor}
      >
        <IconButton style={{ color: iconColor }} aria-label="leaf">
          <LeafIcon />
        </IconButton>
      </ColorDialog>
    </div>
  );
};

WithIconButton.args = {
  placement: 'bottom',
  labels: {
    alphaSlider: 'Alpha slider',
    hueSlider: 'Hue slider',
    hex: 'Hex',
    red: 'R',
    green: 'G',
    blue: 'B',
    alpha: 'A'
  }
};

WithIconButton.parameters = {
  docs: {
    description: {
      story: `
  The color dialog can use a custom trigger element for the dialog button.
  This example demonstrates using a \`IconButton\` as the color dialog 
  trigger element.
`
    }
  }
};

WithIconButton.storyName = 'Custom trigger';
