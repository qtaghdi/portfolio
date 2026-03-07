import './style.scss';
import $ from 'jquery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import VanillaTilt from 'vanilla-tilt';

gsap.registerPlugin(ScrollTrigger);

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';

const projects = [
    {
        id: 1,
        title: "BigTablet 공식 홈페이지 리뉴얼",
        category: "Company (Web)",
        categoryClass: "cat-cyan",
        description: "Atomic 구조의 한계를 개선하기 위해 FSD 아키텍처를 도입하고, JS 기반 코드를 TypeScript로 전면 마이그레이션했습니다.",
        result: "빌드 시간 43% 단축 (4분 38초 → 2분 28초) 및 Next Intl 다국어 지원 구현",
        tech: ["Next.js", "TypeScript", "TanStack Query", "SCSS", "FSD Arch"],
        link: "https://bigtablet.com",
        github: "https://github.com/Bigtablet/bigtablet-homepage-web"
    },
    {
        id: 2,
        title: "CCTV 영상 관제 서비스 리뉴얼",
        category: "Company (Service)",
        categoryClass: "cat-purple",
        description: "기존 HTTP 폴링 방식의 성능 문제를 WebSocket 도입으로 해결하고, 실시간 영상 데이터를 시각화했습니다.",
        result: "LCP 93.1% 개선 (5.22초 → 0.36초) 및 실시간 데이터 시각화(Chart.js) 구현",
        tech: ["Next.js", "TypeScript", "WebSocket", "Chart.js", "Axios"],
        link: null,
        github: null
    },
    {
        id: 3,
        title: "사내 디자인 시스템 구축 및 배포",
        category: "Company (Infra)",
        categoryClass: "cat-pink",
        description: "반복되는 UI 구현 비효율을 해결하기 위해 공통 컴포넌트를 모듈화하고 NPM 패키지로 배포하여 생산성을 높였습니다.",
        result: "NPM 패키지 배포 자동화 (Semantic Release) 및 Storybook 문서화 완료",
        tech: ["React", "TypeScript", "Storybook", "NPM", "CI/CD"],
        link: "https://www.npmjs.com/package/@bigtablet/design-system",
        github: "https://github.com/Bigtablet/bigtablet-design-system"
    },
    {
        id: 4,
        title: "비속어 개선 서비스 'Echo'",
        category: "Team Project (App)",
        categoryClass: "cat-green",
        description: "10대 청소년의 언어 습관 개선을 위한 앱입니다. 서버 비용 절감을 위해 음성 인식 로직을 클라이언트로 이관했습니다.",
        result: "서버 STT → 클라이언트(Expo) STT 전환으로 비용 절감 및 속도 개선",
        tech: ["React Native", "Expo", "Axios", "OAuth"],
        link: null,
        github: "https://url.kr/wy4ams"
    },
    {
        id: 5,
        title: "포트폴리오 플랫폼 'PLAB'",
        category: "Side Project (Web)",
        categoryClass: "cat-purple",
        description: "취업 준비생을 위한 포트폴리오 관리 플랫폼입니다. PDF 변환 시 발생하는 깨짐 문제를 Canvas 변환 방식으로 해결했습니다.",
        result: "html2canvas 도입으로 PDF 변환 용량 최적화 및 Vue3 Composition API 활용",
        tech: ["Vue 3", "TypeScript", "Pinia", "SCSS", "html2canvas"],
        link: null,
        github: "https://url.kr/36wk4m"
    }
];

const skills = {
    Languages: [
        { name: "JavaScript", icon: "javascript/javascript-original.svg" },
        { name: "TypeScript", icon: "typescript/typescript-original.svg" },
        { name: "Python",     icon: "python/python-original.svg" },
    ],
    Frameworks: [
        { name: "React",        icon: "react/react-original.svg" },
        { name: "Next.js",      icon: "nextjs/nextjs-original.svg", invert: true },
        { name: "React Native", icon: "react/react-original.svg" },
        { name: "Vue",          icon: "vuejs/vuejs-original.svg" },
    ],
    Libraries: [
        { name: "TanStack Query", abbr: "TQ" },
        { name: "Zustand",        abbr: "ZS" },
        { name: "SCSS",           icon: "sass/sass-original.svg" },
        { name: "Tailwind",       icon: "tailwindcss/tailwindcss-original.svg" },
        { name: "jQuery",         icon: "jquery/jquery-original.svg" },
    ],
    Tools: [
        { name: "Git",       icon: "git/git-original.svg" },
        { name: "Figma",     icon: "figma/figma-original.svg" },
        { name: "WebStorm",  icon: "webstorm/webstorm-original.svg" },
        { name: "Storybook", icon: "storybook/storybook-original.svg" },
    ]
};

// ===== STARFIELD =====
function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 260 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.1 + 0.2,
        opacity: Math.random() * 0.6 + 0.1,
        dir: Math.random() > 0.5 ? 1 : -1,
        speed: Math.random() * 0.007 + 0.002,
    }));

    // a few slightly larger "bright" stars
    for (let i = 0; i < 20; i++) {
        stars.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 1.8 + 1.0,
            opacity: Math.random() * 0.5 + 0.3,
            dir: Math.random() > 0.5 ? 1 : -1,
            speed: Math.random() * 0.004 + 0.001,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.opacity += s.speed * s.dir;
            if (s.opacity >= 0.9) s.dir = -1;
            if (s.opacity <= 0.05) s.dir = 1;

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
}

// ===== SKILL ICON CARD HTML =====
function skillCardHtml(item) {
    if (item.icon) {
        return `
            <div class="skill-icon-card${item.invert ? ' invert' : ''}">
                <img src="${DEVICON}${item.icon}" class="skill-icon" alt="${item.name}" loading="lazy" />
                <span class="skill-name">${item.name}</span>
            </div>`;
    }
    const abbr = item.abbr || item.name.slice(0, 2).toUpperCase();
    return `
        <div class="skill-icon-card">
            <div class="skill-letter">${abbr}</div>
            <span class="skill-name">${item.name}</span>
        </div>`;
}

// ===== PROJECT CARD HTML =====
function projectCardHtml(prj) {
    const techHtml = prj.tech.map(t => `<span>${t}</span>`).join('');
    let linksHtml = '';
    if (prj.github) linksHtml += `<a href="${prj.github}" target="_blank" title="View Code"><i class="fab fa-github"></i></a>`;
    if (prj.link)   linksHtml += `<a href="${prj.link}"   target="_blank" title="Visit Site"><i class="fas fa-external-link-alt"></i></a>`;

    return `
        <div class="project-card ${prj.categoryClass}" data-tilt data-tilt-max="2" data-tilt-speed="400" data-tilt-glare data-tilt-max-glare="0.04">
            <div class="card-header">
                <span class="category">${prj.category}</span>
                <div class="card-links">${linksHtml}</div>
            </div>
            <h4>${prj.title}</h4>
            <p class="desc">${prj.description}</p>
            <div class="result-box"><strong>Result:</strong> ${prj.result}</div>
            <div class="tech-stack">${techHtml}</div>
        </div>`;
}

$(function () {
    initStarfield();

    // ===== HAMBURGER =====
    $('.hamburger').on('click', () => $('.mobile-menu-overlay').addClass('active'));
    $('.close-btn, .mobile-menu-overlay a').on('click', () => $('.mobile-menu-overlay').removeClass('active'));

    // ===== SMOOTH SCROLL =====
    const lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // ===== SPOTLIGHT =====
    const spotlight = document.getElementById('spotlight');
    if (spotlight) {
        document.addEventListener('mousemove', e => {
            spotlight.style.setProperty('--x', `${e.clientX}px`);
            spotlight.style.setProperty('--y', `${e.clientY}px`);
        });
    }

    // ===== TYPING =====
    const typingText = "Visual Comfort for Users.";
    const $el = $('#typing-text');
    let idx = 0;
    function typeWriter() {
        if (idx < typingText.length) {
            $el.text($el.text() + typingText.charAt(idx++));
            setTimeout(typeWriter, 75);
        }
    }
    setTimeout(typeWriter, 600);

    // ===== NAVBAR SCROLL =====
    $(window).on('scroll', function () {
        $('#navbar').toggleClass('scrolled', $(this).scrollTop() > 50);
    });

    // ===== HERO ANIMATION =====
    gsap.timeline()
        .from(".intro",           { y: 20, opacity: 0, duration: 0.7, delay: 0.3 })
        .from(".name",            { y: 40, opacity: 0, duration: 0.9 }, "-=0.5")
        .from(".subtitle",        { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".desc",            { y: 20, opacity: 0, duration: 0.7 }, "-=0.6")
        .from("#cta-btn",         { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".scroll-indicator",{ opacity: 0, duration: 1 }, "-=0.3");

    $('#cta-btn').on('click', () => lenis.scrollTo('#projects', { offset: -100 }));
    $('nav a').on('click', function (e) {
        e.preventDefault();
        const id = $(this).attr('href');
        if (id) lenis.scrollTo(id, { offset: -80 });
    });

    // ===== RENDER SKILLS =====
    const skillsHtml = Object.entries(skills).map(([cat, items]) => `
        <div class="skill-category">
            <h5>${cat}</h5>
            <div class="skill-icons-row">${items.map(skillCardHtml).join('')}</div>
        </div>`).join('');
    $('#skill-list').append(skillsHtml);

    // ===== RENDER PROJECTS =====
    $('#project-list').append(projects.map(projectCardHtml).join(''));
    VanillaTilt.init(document.querySelectorAll('.project-card'));

    // ===== SCROLL ANIMATIONS =====
    const reveal = { y: 0, opacity: 1, duration: 1, ease: 'power3.out' };

    gsap.utils.toArray('.section-title').forEach(el => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
            ...reveal
        });
    });

    gsap.utils.toArray('.about-content p').forEach((el, i) => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: 'top 90%' },
            ...reveal, delay: i * 0.15
        });
    });

    gsap.utils.toArray('.skill-category').forEach((el, i) => {
        gsap.to(el, {
            scrollTrigger: { trigger: '#skill-list', start: 'top 80%' },
            y: 0, opacity: 1, duration: 0.7, delay: i * 0.1, ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.project-card').forEach(el => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: 'top 88%' },
            ...reveal
        });
    });

    gsap.to('.email-btn, .social-links, #contact .title, #contact p', {
        scrollTrigger: { trigger: '#contact', start: 'top 80%' },
        y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out'
    });
});
