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
        apiKey={process.env.NEXT_PUBLIC_BKOI_API_KEY}
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