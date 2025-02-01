import { auth } from '@/auth';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SignOut } from '@/lib/actions/user.actions';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Gi3dGlasses } from 'react-icons/gi';

export default async function UserButton() {
  const session = await auth();
  return (
    <div className='flex gap-2 items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger className='header-button' asChild>
          {session ? (
            // 로그인 상태일 때
            <div className='w-full px-2 py-1 pr-3 bg-background rounded-full flex items-center justify-center ring ring-gray-300/20 hover:ring-gray-300/60 bg-mainBg cursor-pointer'>
              <div>
                <Image
                  src={session.user.image || '/images/default.jpg'} // 소셜 로그인 프로필 이미지 사용
                  alt={session.user.name || 'Profile'}
                  width={30}
                  height={30}
                  className='rounded-full mr-2'
                />
              </div>
              <div className='flex flex-col text-xs text-left'>
                <span>Hello, {session.user.name}</span>
                <span className='font-bold'>Welcome</span>
              </div>
            </div>
          ) : (
            // 비로그인 상태일 때
            <div className='w-9 h-9 bg-background rounded-full flex items-center justify-center ring ring-gray-300/20 hover:ring-gray-300/60 bg-mainBg cursor-pointer'>
              <Gi3dGlasses size='20' />
            </div>
          )}
        </DropdownMenuTrigger>
        {session ? (
          <DropdownMenuContent
            className='w-56 bg-gray-50 mr-0'
            align='end'
            forceMount
          >
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1 border-b pb-4'>
                <p className='text-sm my-1 font-medium leading-none'>
                  {session.user.name}
                </p>
                <p className='text-xs leading-none text-muted-foreground'>
                  {session.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <Link className='w-full font-nanum' href='/account'>
                <DropdownMenuItem>👤 내 정보 관리하기</DropdownMenuItem>
              </Link>
              <Link className='w-full font-nanum' href='/account/orders'>
                <DropdownMenuItem>📜 내 활동 기록 보기</DropdownMenuItem>
              </Link>

              {session.user.role === 'Admin' && (
                <Link className='w-full font-nanum' href='/admin/overview'>
                  <DropdownMenuItem>🔧 관리자 페이지로 이동</DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuGroup>
            <DropdownMenuItem className='p-0 mb-1'>
              <form action={SignOut} className='w-full font-nanum'>
                <Button
                  className='w-full py-4 px-2 h-4 justify-start'
                  variant='ghost'
                >
                  👋 로그아웃하고 다음에 만나요!
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent
            className='w-56 mr-1 bg-gray-50'
            align='end'
            forceMount
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  className={cn(buttonVariants(), 'w-full font-nanum')}
                  href='/sign-in'
                >
                  로그인
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuLabel>
              <div className='font-normal font-nanum text-center text-black300 mb-1'>
                반가워요! 오늘도 멋진 하루 😊 <br />
                아직 계정이 없으신가요? <br />
                <Link href='/sign-up' className='underline underline-offset-4'>
                  회원가입
                </Link>
                하고 시작하세요! 🚀
              </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}
