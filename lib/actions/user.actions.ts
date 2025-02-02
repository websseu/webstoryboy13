'use server';

import { signIn, signOut } from '@/auth';
import { IUserSignIn, IUserSignUp } from '@/lib/types';
import { redirect } from 'next/navigation';
import { connectToDatabase } from '../db';
import { UserSignUpSchema } from '../validator';
import { formatError } from '../utils';
import User from '../db/models/user.model';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

// 로그인(이메일/비밀번호)
export async function signInWithCredentials(user: IUserSignIn) {
  return await signIn('credentials', { ...user, redirect: false });
}

// 로그아웃
export const SignOut = async () => {
  const redirectTo = await signOut({ redirect: false });
  redirect(redirectTo.redirect);
};

// 모든 회원 정보 가져오기
export const getAllUsersSample = async () => {
  try {
    await connectToDatabase();
    const posts = await User.find({}).sort({ createdAt: -1 });
    return posts;
  } catch (error) {
    console.error('게시물 가져오기 오류:', error);
    throw new Error('게시물을 불러오지 못했습니다.');
  }
};

// 모든 회원 정보 가져오기(페이지네이션)
export async function getAllUsers({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) {
  try {
    await connectToDatabase();

    const totalUsers = await User.countDocuments();
    const skipAmount = (Number(page) - 1) * limit;
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skipAmount)
      .limit(limit)
      .lean();

    return {
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error('데이터 가져오기 오류:', error);
    throw new Error('데이터 가져오기 실패');
  }
}

// 회원가입
export async function registerUser(userSignUp: IUserSignUp) {
  try {
    const user = await UserSignUpSchema.parseAsync({
      name: userSignUp.name,
      email: userSignUp.email,
      password: userSignUp.password,
      confirmPassword: userSignUp.confirmPassword,
    });

    await connectToDatabase();
    await User.create({
      ...user,
      password: await bcrypt.hash(user.password, 5),
    });
    return { success: true, message: '회원가입이 성공적으로 이루어졌습니다.' };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

// 회원 지우기
export async function deleteUser(id: string) {
  try {
    await connectToDatabase();
    const res = await User.findByIdAndDelete(id);
    if (!res) throw new Error('사용자를 찾을 수 없습니다.');

    revalidatePath('/admin/users');
    return {
      success: true,
      message: '사용자를 삭제하였습니다.',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
