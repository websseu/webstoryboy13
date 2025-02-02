import { Metadata } from 'next';
import { auth } from '@/auth';
import { deletePost, getAllPosts } from '@/lib/actions/post.actions';
import { IPost } from '@/lib/db/models/post.model';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import DeleteDialog from '@/components/delete-dialog';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import Pagination from '@/components/pagination';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Users',
};

export default async function AdminPost(props: {
  searchParams: Promise<{ page: string }>;
}) {
  const searchParams = await props.searchParams;
  const session = await auth();
  if (session?.user.role !== 'Admin') {
    throw new Error('관리자 권한이 필요합니다.');
  }

  // 현재 페이지 파라미터 가져오기
  const page = Number(searchParams.page) || 1;
  const { posts, totalPosts, totalPages, currentPage } = await getAllPosts({
    page,
    limit: 10,
  });

  return (
    <div className='post__list max-w-6xl mx-auto'>
      <div>
        <div className='flex items-center justify-center mb-4'>
          <h2 className='text-xl font-nexon'>글 목록</h2>
          <span className='small'>{totalPosts}</span>
        </div>
        <div className='flex justify-end mb-2'>
          <Link href={'/posts/create'}>
            <Button variant='default'>글 작성하기</Button>
          </Link>
        </div>
      </div>

      <Table className='border-t border-b border-t-zinc-300 border-b-zinc-200'>
        <TableHeader>
          <TableRow>
            <TableHead>타이틀</TableHead>
            <TableHead>카테고리</TableHead>
            <TableHead>서브</TableHead>
            <TableHead>공개</TableHead>
            <TableHead>날짜</TableHead>
            <TableHead>댓글</TableHead>
            <TableHead>하트</TableHead>
            <TableHead>뷰</TableHead>
            <TableHead>수정</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post: IPost) => (
            <TableRow key={post._id}>
              <TableCell>{post.title}</TableCell>
              <TableCell className='text-center'>{post.category}</TableCell>
              <TableCell className='text-center'>{post.subCategory}</TableCell>
              <TableCell className='text-center'>
                {post.isPublished ? 'True' : 'False'}
              </TableCell>
              <TableCell className='text-center'>
                {formatDate(post.createdAt)}
              </TableCell>
              <TableCell className='text-center'>{post.numReviews}</TableCell>
              <TableCell className='text-center'>{post.numLikes}</TableCell>
              <TableCell className='text-center'>{post.numViews}</TableCell>
              <TableCell className='text-center'>
                <Button variant='destructive' size='sm' className='mr-1'>
                  수정
                </Button>
                <DeleteDialog id={post._id.toString()} action={deletePost} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl='/admin/posts'
      />
    </div>
  );
}
