import { z } from 'zod';
import {
  PostInputSchema,
  UserInputSchema,
  UserSignInSchema,
  UserSignUpSchema,
} from './validator';

export type MenuItem = {
  name: string;
  href: string;
};

export type subject = {
  title: string;
  href: string;
};

export type TitleItem = {
  title: string;
  category: string;
  text: string;
  desc: string;
  subjects: subject[];
};

export type Data = {
  headerMenus: MenuItem[];
  adminMenus: MenuItem[];
  pageTitle: TitleItem[];
};

export type InputData = {
  posts: IPostInput[];
  users: IUserInput[];
};

// 글 목록
export type IPostInput = z.infer<typeof PostInputSchema>;

// 회원가입 및 로그인
export type IUserInput = z.infer<typeof UserInputSchema>;
export type IUserSignIn = z.infer<typeof UserSignInSchema>;
export type IUserSignUp = z.infer<typeof UserSignUpSchema>;
