"use client" 

import { BarikoiAutocomplete } from 'barikoi-map-widget';

const BarikoiAutocompleteComponent = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        top: '20px',
        width: '100%',
        zIndex: '100',
      }}
    >
      <BarikoiAutocomplete
        apiKey="bkoi_83d9e819b6e1532612d485a65af861c5a9696798352f9bc0be8d9a2430a9f9f6"
        className={{
          container: 'custom-container',
          input: 'custom-input',
          dropdown: 'custom-dropdown',
          dropdownItem: 'custom-dropdown-item',
          noResult: 'custom-noresult',
        }}
      />
    </div>
  );
};
export default BarikoiAutocompleteComponent;