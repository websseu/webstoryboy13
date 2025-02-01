import { z } from 'zod';
import { PostInputSchema } from './validator';

export type MenuItem = {
  name: string;
  href: string;
};

export type Data = {
  headerMenus: MenuItem[];
  adminMenus: MenuItem[];
};

export type InputData = {
  posts: IPostInput[];
};

export type IPostInput = z.infer<typeof PostInputSchema>;
