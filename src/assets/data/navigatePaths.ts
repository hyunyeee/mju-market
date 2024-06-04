import heartFilled from '../img/heart_fill.svg';
import heartEmpty from '../img/heart_empty.svg';
import boardFilled from '../img/board_fill.svg';
import boardEmpty from '../img/board_empty.svg';
import marketFilled from '../img/market_fill.svg';
import marketEmpty from '../img/market_empty.svg';
import chatFilled from '../img/chat_fill.svg';
import chatEmpty from '../img/chat_empty.svg';
import personFilled from '../img/person_fill.svg';
import personEmpty from '../img/person_empty.svg';

type NavItem = {
  path: string;
  filledImg: string;
  emptyImg: string;
  label: string;
};

export const navList: NavItem[] = [
  // {
  //   path: '/likes',
  //   filledImg: heartFilled,
  //   emptyImg: heartEmpty,
  //   label: '저장',
  // },
  {
    path: '/boards',
    filledImg: boardFilled,
    emptyImg: boardEmpty,
    label: '보드',
  },
  { path: '/', filledImg: marketFilled, emptyImg: marketEmpty, label: '마켓' },
  { path: '/chat', filledImg: chatFilled, emptyImg: chatEmpty, label: '채팅' },
  {
    path: '/mypage',
    filledImg: personFilled,
    emptyImg: personEmpty,
    label: '마이페이지',
  },
];
