/// <reference types="styled-components/cssprop" />
import * as styled from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
    };
  }
} 