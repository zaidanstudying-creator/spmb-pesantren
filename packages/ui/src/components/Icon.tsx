import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: number | string;
  filled?: boolean;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', size, filled = false }) => {
  const style: React.CSSProperties = {};
  if (size) {
    style.fontSize = typeof size === 'number' ? `${size}px` : size;
  }
  if (filled) {
    style.fontVariationSettings = "'FILL' 1";
  }

  return (
    <span className={`material-symbols-outlined select-none align-middle ${className}`} style={style}>
      {name}
    </span>
  );
};
