import React from 'react';
import {NumericFormat} from 'react-number-format';

const MicrogramsPerCubicMeter = ({ value }) => {
    console.log(value);
  return (
    <NumericFormat
      value={value}
      unit="μg/m³"
      thousandSeparator=","
      decimalSeparator="."
    />
  );
};

export default MicrogramsPerCubicMeter;
