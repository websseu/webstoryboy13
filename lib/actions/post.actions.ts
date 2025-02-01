'use server';

import { connectToDatabase } from '../db';
import Post from '../db/models/post.model';

// 필터 객체의 타입을 정의합니다.
interface PostFilter {
  category: string;
  subCategory?: string;
  isPublished: boolean;
}

// 카테고리에 따른 글 목록 가져오기
export const getPostsForCategory = async ({
  category,
  subCategory,
  page = 1, // 기본 페이지는 1
  limit = 9, // 기본 한 페이지당 9개
}: {
  category: string;
  subCategory?: string;
  page: number;
  limit: number;
}) => {
  try {
    await connectToDatabase();

    const filter: PostFilter = {
      category: category,
      isPublished: true,
    };

    if (subCategory) {
      filter.subCategory = subCategory;
    }

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const totalPosts = await Post.countDocuments(filter);

    return {
      posts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      totalPosts,
    };
  } catch (error) {
    console.error('데이터 가져오기 오류:', error);
    throw new Error('데이터 가져오기 실패');
  }
};

// 모든 글 가져오기
export const getAllPosts = async () => {
  try {
    await connectToDatabase();
    const posts = await Post.find({}).sort({ createdAt: -1 });

    return posts;
  } catch (error) {
    console.error('게시물 가져오기 오류:', error);
    throw new Error('게시물을 불러오지 못했습니다.');
  }
};
