import React, { useState } from 'react';

const UseInput = (type, initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    let value = event.target.value;
    if (type === 'rut') value = formatRut(value);
    setValue(value);
  }

  const formatRut = (text) => {
    let filtered = text.split('').filter(val => !isNaN(val)).join('');
    if (filtered.length === 0) return '';
    let suffix = filtered[filtered.length - 1];
    let preffix = filtered.substr(0, filtered.length - 1).split('').reverse()
      .map((val, i) => {
        return ((i + 1) % 3 === 0 || i === text.length) ? '.' + val : val;
      }).reverse().join('');
    return preffix + '-' + suffix;
  }

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange
    }
  };
};

export default UseInput;
