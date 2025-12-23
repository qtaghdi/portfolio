import './style.scss';
import $ from 'jquery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import VanillaTilt from 'vanilla-tilt';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "BigTablet 공식 홈페이지 리뉴얼",
        category: "Company (Web)",
        description: "Atomic 구조의 한계를 개선하기 위해 FSD 아키텍처를 도입하고, JS 기반 코드를 TypeScript로 전면 마이그레이션했습니다.",
        result: "🚀 빌드 시간 43% 단축 (4분 38초 → 2분 28초) 및 Next Intl 다국어 지원 구현",
        tech: ["Next.js", "TypeScript", "TanStack Query", "SCSS", "FSD Arch"],
        link: "https://bigtablet.com",
        github: "https://github.com/Bigtablet/bigtablet-homepage-web"
    },
    {
        id: 2,
        title: "CCTV 영상 관제 서비스 리뉴얼",
        category: "Company (Service)",
        description: "기존 HTTP 폴링 방식의 성능 문제를 WebSocket 도입으로 해결하고, 실시간 영상 데이터를 시각화했습니다.",
        result: "⚡ LCP 93.1% 개선 (5.22초 → 0.36초) 및 실시간 데이터 시각화(Chart.js) 구현",
        tech: ["Next.js", "TypeScript", "WebSocket", "Chart.js", "Axios"],
        link: null,
        github: null
    },
    {
        id: 3,
        title: "사내 디자인 시스템 구축 및 배포",
        category: "Company (Infra)",
        description: "반복되는 UI 구현 비효율을 해결하기 위해 공통 컴포넌트를 모듈화하고 NPM 패키지로 배포하여 생산성을 높였습니다.",
        result: "📦 NPM 패키지 배포 자동화 (Semantic Release) 및 Storybook 문서화 완료",
        tech: ["React", "TypeScript", "Storybook", "NPM", "CI/CD"],
        link: "https://www.npmjs.com/package/@bigtablet/design-system",
        github: "https://github.com/Bigtablet/bigtablet-design-system"
    },
    {
        id: 4,
        title: "비속어 개선 서비스 'Echo'",
        category: "Team Project (App)",
        description: "10대 청소년의 언어 습관 개선을 위한 앱입니다. 서버 비용 절감을 위해 음성 인식 로직을 클라이언트로 이관했습니다.",
        result: "🔧 서버 STT → 클라이언트(Expo) STT 전환으로 비용 절감 및 속도 개선",
        tech: ["React Native", "Expo", "Axios", "Oauth"],
        link: null,
        github: "https://url.kr/wy4ams"
    },
    {
        id: 5,
        title: "포트폴리오 플랫폼 'PLAB'",
        category: "Side Project (Web)",
        description: "취업 준비생을 위한 포트폴리오 관리 플랫폼입니다. PDF 변환 시 발생하는 깨짐 문제를 Canvas 변환 방식으로 해결했습니다.",
        result: "📄 html2canvas 도입으로 PDF 변환 용량 최적화 및 Vue3 Composition API 활용",
        tech: ["Vue 3", "TypeScript", "Pinia", "SCSS", "html2canvas"],
        link: null,
        github: "https://url.kr/36wk4m"
    }
];

const skills = {
    Languages: ["JavaScript", "TypeScript", "Python"],
    Frameworks: ["React", "Next.js", "React Native", "Vue"],
    Libraries: ["TanStack Query", "Zustand", "SCSS", "Tailwind", "jQuery"],
    Tools: ["Git", "Figma", "WebStorm", "Storybook"]
};

$(function () {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const $spotlight = document.getElementById('spotlight');
    document.addEventListener('mousemove', (e) => {
        $spotlight.style.setProperty('--x', `${e.clientX}px`);
        $spotlight.style.setProperty('--y', `${e.clientY}px`);
    });

    const typingText = "Visual Comfort for Users.";
    const $typingElement = $('#typing-text');
    let typingIndex = 0;

    function typeWriter() {
        if (typingIndex < typingText.length) {
            $typingElement.append(typingText.charAt(typingIndex));
            typingIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    setTimeout(typeWriter, 500);

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 50) {
            $('#navbar').addClass('scrolled');
        } else {
            $('#navbar').removeClass('scrolled');
        }
    });

    const tl = gsap.timeline();
    tl.from(".intro", { y: 20, opacity: 0, duration: 0.8, delay: 0.5 })
        .from(".name", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".subtitle", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".desc", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        .from("#cta-btn", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

    $('#cta-btn').on('click', function() {
        lenis.scrollTo('#projects', { offset: -100 });
    });

    $('nav a').on('click', function(e) {
        e.preventDefault();
        const targetId = $(this).attr('href');
        if(targetId) {
            lenis.scrollTo(targetId, { offset: -80 });
        }
    });

    const $skillList = $('#skill-list');
    Object.entries(skills).forEach(([category, items]) => {
        const itemsHtml = items.map(item => `<li class="skill-tag">${item}</li>`).join('');
        const html = `
      <div class="skill-category">
        <h5>${category}</h5>
        <ul>${itemsHtml}</ul>
      </div>
    `;
        $skillList.append(html);
    });

    const $projectList = $('#project-list');
    projects.forEach((prj) => {
        const techHtml = prj.tech.map(t => `<span>${t}</span>`).join('');

        let linksHtml = '';
        if (prj.github) {
            linksHtml += `<a href="${prj.github}" target="_blank" title="View Code"><i class="fab fa-github"></i></a>`;
        }
        if (prj.link) {
            linksHtml += `<a href="${prj.link}" target="_blank" title="Visit Site"><i class="fas fa-external-link-alt"></i></a>`;
        }

        const html = `
      <div class="project-card" data-tilt data-tilt-max="3" data-tilt-speed="400" data-tilt-glare data-tilt-max-glare="0.1">
        <div class="card-header">
          <span class="category">${prj.category}</span>
          <div class="card-links">
            ${linksHtml}
          </div>
        </div>
        <div class="card-header-title" style="display:flex; justify-content:space-between; align-items:center; transform: translateZ(30px);">
           <h4 style="margin:0;">${prj.title}</h4>
        </div>
        <p class="desc" style="margin-top:15px;">${prj.description}</p>
        <div class="result-box">
          <strong>Result:</strong> ${prj.result}
        </div>
        <div class="tech-stack">${techHtml}</div>
      </div>
    `;
        $projectList.append(html);
    });

    VanillaTilt.init(document.querySelectorAll(".project-card"));

    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.to(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });
    });

    gsap.utils.toArray('.about-content p').forEach((text, i) => {
        gsap.to(text, {
            scrollTrigger: {
                trigger: text,
                start: "top 90%",
            },
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.2,
            ease: "power3.out"
        });
    });

    gsap.utils.toArray('.skill-category').forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: '#skill-list',
                start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });
    });

    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    gsap.to(".email-btn, .social-links, #contact .title, #contact p", {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
    });
});