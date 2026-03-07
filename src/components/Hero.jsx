import { createSignal, onMount, onCleanup } from 'solid-js';
import { gsap } from 'gsap';

const TYPING_TEXT = 'Visual Comfort for Users.';

export default function Hero() {
    const [typed, setTyped] = createSignal('');

    onMount(() => {
        gsap.timeline()
            .from('.hero-tag', { y: 20, opacity: 0, duration: 0.7, delay: 0.2 })
            .from('.name',     { y: 40, opacity: 0, duration: 0.9 }, '-=0.5')
            .from('.subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
            .from('.desc',     { y: 20, opacity: 0, duration: 0.7 }, '-=0.6')
            .from('#cta-btn',  { y: 20, opacity: 0, duration: 0.7 }, '-=0.5');

        let idx = 0;
        const delay = setTimeout(() => {
            const timer = setInterval(() => {
                if (idx < TYPING_TEXT.length) {
                    setTyped(TYPING_TEXT.slice(0, ++idx));
                } else {
                    clearInterval(timer);
                }
            }, 75);
            onCleanup(() => clearInterval(timer));
        }, 600);
        onCleanup(() => clearTimeout(delay));
    });

    return (
        <section id="hero">
            <p class="hero-tag">Hello, I am</p>
            <h1 class="name">박상민</h1>
            <h2 class="subtitle">
                <span>{typed()}</span>
                <span class="cursor">|</span>
            </h2>
            <p class="desc">
                안되는 건 없다는 마인드로 끝까지 파고드는 개발자입니다.<br />
                단순 구현을 넘어 <strong>빌드 시간 43% 단축</strong>, <strong>LCP 93% 개선</strong> 등<br />
                수치로 증명되는 성능 최적화 경험을 보유하고 있습니다.
            </p>
            <button id="cta-btn" onClick={() => window.lenis?.scrollTo('#projects', { offset: -80 })}>
                View My Work <i class="fas fa-arrow-right" />
            </button>
        </section>
    );
}
