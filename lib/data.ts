import { Data } from './types';

const data: Data = {
  headerMenus: [
    { name: 'Webstoryboy', href: '/' },
    { name: 'Tutorial', href: '/tutorial' },
    { name: 'Lecture', href: '/lecture' },
    { name: 'Reference', href: '/reference' },
    { name: 'Inspiration', href: '/inspiration' },
  ],
  adminMenus: [
    { name: 'Overview', href: '/admin/overview' },
    { name: 'Posts', href: '/admin/posts' },
    { name: 'Users', href: '/admin/users' },
    { name: 'Pages', href: '/admin/web-pages' },
    { name: 'Settings', href: '/admin/settings' },
  ],
  pageTitle: [
    {
      title: '튜토리얼',
      category: 'tutorial',
      text: '실무에서 바로 적용할 수 있는 웹 디자인과 개발 기술을 배워보세요. 초보자부터 전문가까지 모두를 위한 단계별 학습 자료를 제공합니다.',
      desc: '이 섹션은 실전 웹 디자인과 개발을 위한 다양한 튜토리얼을 제공합니다. CSS 디자인과 GSAP 인터랙티브 애니메이션을 중심으로 구성되어 있으며, CSS를 활용한 UI/UX 디자인 기법부터 최신 애니메이션 기술까지 학습할 수 있습니다. 실무에 바로 활용할 수 있는 기초 및 심화 지식을 제공하여, 웹 개발 능력을 한 단계 끌어올릴 수 있습니다.',
      subjects: [
        { title: 'UI/UX CSS Design', href: 'uiux-design' },
        { title: 'GSAP Interative Animation', href: 'gsap-animation' },
      ],
    },
    {
      title: '강의',
      category: 'lecture',
      text: '전문가의 노하우가 담긴 유료 및 무료 강의를 통해 새로운 기술을 배우고 성장해보세요.',
      desc: '이 섹션은 웹스토리보이가 제공하는 다양한 강의를 소개합니다. 웹디자인개발기능사 2025 시험 대비 강의와 리액트를 위한 자바스크립트 기초 강의가 준비되어 있으며, 실무 중심의 지식과 문제 해결 능력을 키울 수 있습니다. 초보자를 위한 기초 강의부터 전문가를 위한 심화 강의까지 모두 포함되어 있습니다.',
      subjects: [
        { title: '웹디자인개발기능사 2025', href: 'webdesign-2025' },
        {
          title: '리액트를 위한 자바스크립트 기초 마스터',
          href: 'javascript-master',
        },
      ],
    },
    {
      title: '레퍼런스',
      category: 'reference',
      text: '전문가의 노하우가 담긴 유료 및 무료 강의를 통해 새로운 기술을 배우고 성장해보세요.',
      desc: '이 섹션은 웹스토리보이가 제공하는 다양한 강의를 소개합니다. 웹디자인개발기능사 2025 시험 대비 강의와 리액트를 위한 자바스크립트 기초 강의가 준비되어 있으며, 실무 중심의 지식과 문제 해결 능력을 키울 수 있습니다. 초보자를 위한 기초 강의부터 전문가를 위한 심화 강의까지 모두 포함되어 있습니다.',
      subjects: [
        { title: 'HTML 레퍼런스', href: 'html-reference' },
        { title: 'CSS 레퍼런스', href: 'css-reference' },
        { title: 'JAVASCRIPT 레퍼런스', href: 'javascript-reference' },
      ],
    },
    {
      title: '인스퍼레이션',
      category: 'inspiration',
      text: '전문가의 노하우가 담긴 유료 및 무료 강의를 통해 새로운 기술을 배우고 성장해보세요.',
      desc: '이 섹션은 웹스토리보이가 제공하는 다양한 강의를 소개합니다. 웹디자인개발기능사 2025 시험 대비 강의와 리액트를 위한 자바스크립트 기초 강의가 준비되어 있으며, 실무 중심의 지식과 문제 해결 능력을 키울 수 있습니다. 초보자를 위한 기초 강의부터 전문가를 위한 심화 강의까지 모두 포함되어 있습니다.',
      subjects: [
        { title: 'SITE 인스퍼레이션', href: 'site-inspiration' },
        { title: 'TUTORIAL 인스퍼레이션', href: 'tutorial-inspiration' },
      ],
    },
  ],
};

export default data;
