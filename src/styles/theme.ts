import { DefaultTheme, RuleSet, css } from 'styled-components';

export type Colors = {
  TXT_GRAY: string;
};
export type TypoGraphies = {
  default: RuleSet<object>;
};

export const theme: DefaultTheme = {
  colors: {
    TXT_GRAY: '#1E1E1E',
  },
  typographies: {
    default: css`
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
    `,
  },
};
