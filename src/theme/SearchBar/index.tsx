import React from 'react';
import SearchBar from '@theme-original/SearchBar';
import type SearchBarType from '@theme/SearchBar';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof SearchBarType>;

const searchBarStyles = `
  .DocSearch-Footer {
    display: none !important;
  }
`;

export default function SearchBarWrapper(props: Props): JSX.Element {
  return (
    <>
      <style>{searchBarStyles}</style>
      <SearchBar {...props} />
    </>
  );
}

