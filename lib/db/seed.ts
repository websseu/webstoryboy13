import inputData from '@/lib/input';
import { connectToDatabase } from '.';
import { cwd } from 'process';
import { loadEnvConfig } from '@next/env';
import Post from './models/post.model';
import User from './models/user.model';

loadEnvConfig(cwd());

const main = async () => {
  try {
    const { posts, users } = inputData;
    await connectToDatabase(process.env.MONGODB_URI);

    await Post.deleteMany();
    const createdPosts = await Post.insertMany(posts);

    await User.deleteMany();
    const createdUsers = await User.insertMany(users);

    console.log({
      createdPosts,
      createdUsers,
      message: '데이터 입력이 완료되었습니다.',
    });
    process.exit(0);
  } catch (error) {
    console.error(error);
    throw new Error('데이터 입력이 실패하였습니다.');
  }
};

main();
