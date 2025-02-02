import { Metadata } from 'next';
import { auth } from '@/auth';
import { deleteUser, getAllUsers } from '@/lib/actions/user.actions';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { IUser } from '@/lib/db/models/user.model';
import DeleteDialog from '@/components/delete-dialog';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/pagination';

export const metadata: Metadata = {
  title: 'Admin Users',
};

export default async function AdminUser(props: {
  searchParams: Promise<{ page: string }>;
}) {
  const searchParams = await props.searchParams;
  const session = await auth();
  if (session?.user.role !== 'Admin') {
    throw new Error('관리자 권한이 필요합니다.');
  }

  // 현재 페이지 파라미터 가져오기
  const page = Number(searchParams.page) || 1;
  const { users, totalUsers, totalPages, currentPage } = await getAllUsers({
    page,
    limit: 20,
  });

  return (
    <div className='post__list max-w-6xl mx-auto'>
      <div className='flex items-center justify-center mb-6'>
        <h2 className='text-xl font-nexon'>사용자 목록</h2>
        <span className='small'>{totalUsers}</span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>인증 여부</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>가입</TableHead>
            <TableHead>방문</TableHead>
            <TableHead>수정</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: IUser) => (
            <TableRow key={user._id}>
              <TableCell className='flex items-center gap-2'>
                <Image
                  src={user.image || '/images/default.jpg'}
                  alt={user.name}
                  width={20}
                  height={20}
                  className='rounded-full'
                />
                {user.name}
              </TableCell>
              <TableCell className='text-left'>{user.email}</TableCell>
              <TableCell className='text-center'>
                {user.emailVerified ? 'true' : 'false'}
              </TableCell>
              <TableCell className='text-center'>{user.role}</TableCell>
              <TableCell className='text-center'>
                {formatDate(user.createdAt)}
              </TableCell>
              <TableCell className='text-center'>{user.visitCount}</TableCell>
              <TableCell className='text-center'>
                <Button variant='destructive' size='sm' className='mr-1'>
                  수정
                </Button>

                <DeleteDialog id={user._id.toString()} action={deleteUser} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl='/admin/users'
      />
    </div>
  );
}
