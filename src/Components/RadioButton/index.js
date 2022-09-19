import React from 'react';
import Radio from '@mui/material/Radio';

import './styles.css'

function RadioButton({ selectedValue, handleChange }) {

  return (
    <div className='radioOptions'>
      <div>
        <Radio
          checked={selectedValue === 'all'}
          onChange={e => handleChange(e.target)}
          value="all"
        />
        <span>Todos</span>
      </div>
      <div>
        <Radio
          checked={selectedValue === 'true'}
          onChange={e => handleChange(e.target)}
          value="true"
        />
        <span>Prioridade</span>
      </div>
      <div>
        <Radio
          checked={selectedValue === 'false'}
          onChange={e => handleChange(e.target)}
          value="false"
        />
        <span>Normal</span>
      </div>
    </div>
  );
}

export default RadioButton;