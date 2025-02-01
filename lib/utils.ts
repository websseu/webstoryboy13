import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatError = (error: any): string => {
  if (error.name === 'ZodError') {
    // Zod 스키마 검증 에러 처리
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const errorMessage = error.errors[field].message;
      return `${error.errors[field].path}: ${errorMessage}`; // field: errorMessage
    });
    return fieldErrors.join('. ');
  } else if (error.name === 'ValidationError') {
    // Mongoose의 ValidationError 처리
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const errorMessage = error.errors[field].message;
      return errorMessage;
    });
    return fieldErrors.join('. ');
  } else if (error.code === 11000) {
    // MongoDB의 중복 키 에러 처리
    const duplicateField = Object.keys(error.keyValue)[0]; // 중복된 필드명 가져오기
    return `${duplicateField} already exists`;
  } else {
    // 기타 예외 처리
    return typeof error.message === 'string'
      ? error.message
      : JSON.stringify(error.message);
  }
};

// 카드 시간 표시 방법
export const formatTimeAgo = (date: string | Date): string => {
  const inputDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - inputDate.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays}일 전`;
  }
  if (diffHours > 0) {
    return `${diffHours}시간 전`;
  }
  return '방금 전';
};
