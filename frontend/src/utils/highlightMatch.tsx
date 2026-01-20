import { JSX } from 'react';

type HighlightMatch = (
  value: string,
  filter: string
) => string | (string | JSX.Element)[];

export const highlightMatch: HighlightMatch = (value, filter) => {
  if (!filter) return value;

  const regexp = new RegExp(`(${filter})`, 'gi');

  return value.split(regexp).map((subString, index) => {
    if (subString.toLowerCase() === filter.toLowerCase()) {
      return (
        <span key={index} style={{ backgroundColor: '#ff0' }}>
          {subString}
        </span>
      );
    } else {
      return subString;
    }
  });
};
