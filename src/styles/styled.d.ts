import { Colors, TypoGraphies } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    typographies: TypoGraphies;
  }
}
