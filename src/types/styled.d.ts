import 'styled-components';
import { CSSProp } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
    };
  }
}

declare module 'react' {
  interface Attributes {
    css?: CSSProp;
  }
} 