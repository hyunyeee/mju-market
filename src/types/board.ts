export interface Board {
  id: number;
  title: string;
  writerNickname: string;
  createdDate: string;
}

export interface BoardDetailValues {
  id: number;
  writerNickname: string;
  title: string;
  content: string;
  likeCount: number;
  isMyPost: boolean;
  createdDate: string;
}

export interface BoardFormValues {
  title: string;
  content: string;
}

export interface CommentValues {
  writerNickname: string;
  content: string;
  createDate: string;
}
