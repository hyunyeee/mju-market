export interface BoardValues {
  id: number;
  title: string;
  writerNickname: string;
  createdDate: string;
  likeCount: number;
  commentCount: number;
  isLikedAlreadyByMe: boolean;
}

export interface BoardDetailValues {
  id: number;
  writerNickname: string;
  title: string;
  content: string;
  likeCount: number;
  isMyPost: boolean;
  createdDate: string;
  isLikedAlreadyByMe: boolean;
}

export interface BoardFormValues {
  title: string;
  content: string;
}

export interface CommentValues {
  id: number;
  writerNickname: string;
  content: string;
  createDate: string;
  isMine: boolean;
}
