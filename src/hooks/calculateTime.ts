export function calculateTime(dateString?: string) {
  if (!dateString) {
    return '0분 전';
  }
  const date = new Date(dateString.replace(/\.\d+/, ''));
  if (isNaN(date.getTime())) {
    return '유효하지 않은 날짜';
  }
  const diff = Date.now() - date.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) {
    return '방금 전';
  } else if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else {
    return `${days}일 전`;
  }
}
