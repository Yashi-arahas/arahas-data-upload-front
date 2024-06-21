import React, { useState } from 'react';
import { ToggleButton } from '@mui/material';

const CustomToggle = ({ label, checked, onChange }) => {
  return (
    <ToggleButton
      size="small"
      value="check"
      selected={checked}
      onChange={(event, checked) => onChange(checked)}
    >
      {label}
    </ToggleButton>
  );
};

export default CustomToggle;