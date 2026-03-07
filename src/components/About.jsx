import { onMount } from 'solid-js';
import { gsap } from 'gsap';

export default function About() {
    let titleEl, p1El, p2El;

    onMount(() => {
        gsap.to(titleEl, {
            scrollTrigger: { trigger: titleEl, start: 'top 85%', toggleActions: 'play none none reverse' },
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        });
        [p1El, p2El].forEach((el, i) => {
            gsap.to(el, {
                scrollTrigger: { trigger: el, start: 'top 90%' },
                y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: i * 0.15,
            });
        });
    });

    return (
        <section id="about">
            <div class="section-header">
                <span class="section-num">01.</span>
                <h3 ref={titleEl}>About Me</h3>
            </div>
            <div class="about-body" style={{ display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '48px' }}>
                <p ref={p1El}>
                    <strong>결과뿐만 아니라 과정도 중요합니다.</strong><br /><br />
                    오늘의 코드가 내일은 레거시가 될 수 있음을 알기에, 끊임없이 리팩토링하고 더 나은 구조를 고민합니다.
                </p>
                <p ref={p2El}>
                    최근에는 사내 디자인 시스템을 구축하여 <strong>NPM 패키지로 배포</strong>하고,
                    CCTV 관제 서비스의 데이터 통신 방식을 개선해 <strong>초기 로딩 속도(LCP)를 5.22초에서 0.36초로 단축</strong>하는 등
                    실질적인 사용자 경험 향상에 기여했습니다.
                </p>
            </div>
        </section>
    );
}
