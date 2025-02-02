'use server';

import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../db';
import Post from '../db/models/post.model';
import { formatError } from '../utils';

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

    const totalPosts = await Post.countDocuments(filter);
    const skipAmount = (Number(page) - 1) * limit;
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skipAmount)
      .limit(limit)
      .lean();

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
export const getAllPostsSample = async () => {
  try {
    await connectToDatabase();
    const posts = await Post.find({}).sort({ createdAt: -1 });

    return posts;
  } catch (error) {
    console.error('게시물 가져오기 오류:', error);
    throw new Error('게시물을 불러오지 못했습니다.');
  }
};

// 모든 글 가져오기(페이지네이션)
export async function getAllPosts({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) {
  try {
    await connectToDatabase();

    const totalPosts = await Post.countDocuments();
    const skipAmount = (Number(page) - 1) * limit;
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skipAmount)
      .limit(limit)
      .lean();

    return {
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error('데이터 가져오기 오류:', error);
    throw new Error('데이터 가져오기 실패');
  }
}

export async function deletePost(id: string) {
  try {
    await connectToDatabase();
    const res = await Post.findByIdAndDelete(id);
    if (!res) throw new Error('글을 찾을 수 없습니다.');
    revalidatePath('/admin/posts');
    return {
      success: true,
      message: '글을 삭제했습니다.',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
