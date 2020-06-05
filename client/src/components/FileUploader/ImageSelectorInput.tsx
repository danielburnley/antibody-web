// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React, { useRef } from 'react';
import { Button } from 'nhsuk-react-components';

interface ImageSelectorInputProps {
  onImageSelected: (image: File) => void;
  disabled: boolean;
  label: string;
  secondary?: boolean;
}

export default (props: ImageSelectorInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (target && target.files && target.files[0]) {
      props.onImageSelected(target.files[0]);
    }
  };

  return (
    <div>
      <input
        id="fileInput"
        ref={inputRef}
        style={{
          border: '0',
          clip: 'rect(0 0 0 0)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          width: '1px',
        }}
        type="file"
        onChange={handleChange}
        capture
        accept="image/*"
      />
      <Button
        disabled={props.disabled}
        secondary={props.secondary}
        onClick={() => {
          if (!inputRef || !inputRef.current) {
            return;
          } else {
            inputRef.current.click();
          }
        }}
      >
        <span>{props.label}</span>
      </Button>
    </div>
  );
};
