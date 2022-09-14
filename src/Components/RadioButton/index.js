import React from 'react';
import Radio from '@mui/material/Radio';

import './styles.css'

function RadioButton() {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className='radioOptions'>
      <div>
        <Radio
          checked={selectedValue === 'a'}
          onChange={handleChange}
          value="a"
          name="radio-buttons"
          inputProps={{ 'aria-label': 'A' }}
        />
        <span>Todos</span>
      </div>
      <div>
        <Radio
          checked={selectedValue === 'b'}
          onChange={handleChange}
          value="b"
          name="radio-buttons"
          inputProps={{ 'aria-label': 'B' }}
        />
        <span>Prioridade</span>
      </div>
      <div>
        <Radio
          checked={selectedValue === 'c'}
          onChange={handleChange}
          value="c"
          name="radio-buttons"
          inputProps={{ 'aria-label': 'C' }}
        />
        <span>Normal</span>
      </div>
    </div>
  );
}

export default RadioButton;