// useHelper.ts
import _ from 'lodash-es';

export function useHelper() {
  // 숫자 포맷 필터 함수
  function formattedNumber(num: number): string {
    return _.replace(_.toString(num), /\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function colorByStatus(type: string = 'text', status: string): string {
    return status === 'failed'
      ? `${type}-negative`
      : status === 'pending'
        ? `${type}-warning`
        : `${type}-green-7`;
  }

  function truncatedText(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  function formatBytes(bytes: number = 0): string {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  return {
    formattedNumber,
    formatBytes,
    colorByStatus,
    truncatedText,
  };
}
