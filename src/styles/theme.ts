import { DefaultTheme, RuleSet, css } from 'styled-components';

export type Colors = {
  LIGHT_GRAY: string;
  BLUE_1: string;
  BLUE_2: string;
  BLUE_3: string;
  TXT_GRAY: string;
};

export type TypoGraphies = {
  DEFAULT: RuleSet<object>;
  BIG_TXT: RuleSet<object>;
  MEDIUM_TXT: RuleSet<object>;
  SMALL_TXT: RuleSet<object>;
};

export const theme: DefaultTheme = {
  colors: {
    LIGHT_GRAY: '#CCCCCC',
    BLUE_1: '#A4B4CB',
    BLUE_2: '#597AAF',
    BLUE_3: '#0E1D54',
    TXT_GRAY: '#1E1E1E',
  },
  typographies: {
    DEFAULT: css`
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
    `,
    BIG_TXT: css`
      font-size: 18px;
      font-weight: 500;
      line-height: 20px;
    `,
    MEDIUM_TXT: css`
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
    `,
    SMALL_TXT: css`
      font-size: 12px;
      font-weight: 300;
      line-height: 20px;
    `,
  },
};
