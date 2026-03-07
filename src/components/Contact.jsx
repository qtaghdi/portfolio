import { onMount } from 'solid-js';
import { gsap } from 'gsap';

export default function Contact() {
    let titleEl, sectionEl;

    onMount(() => {
        gsap.to(titleEl, {
            scrollTrigger: { trigger: titleEl, start: 'top 85%', toggleActions: 'play none none reverse' },
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        });
        gsap.to('.contact-title, .contact-desc, .contact-email, #contact .social-links', {
            scrollTrigger: { trigger: sectionEl, start: 'top 80%' },
            y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out',
        });
    });

    return (
        <section id="contact" ref={sectionEl}>
            <div class="section-header">
                <span class="section-num">04.</span>
                <h3 ref={titleEl}>Contact</h3>
            </div>
            <h2 class="contact-title">Get In Touch</h2>
            <p class="contact-desc">
                새로운 기술적 도전과 협업의 기회를 항상 열어두고 있습니다.<br />
                저와 함께 성장하고 싶다면 언제든 연락주세요.
            </p>
            <a href="mailto:qtaghdi@gmail.com" class="contact-email">qtaghdi@gmail.com</a>
            <div class="social-links">
                <a href="https://github.com/qtaghdi" target="_blank" aria-label="GitHub">
                    <i class="fab fa-github" />
                </a>
                <a href="https://www.linkedin.com/in/sangminpp/" target="_blank" aria-label="LinkedIn">
                    <i class="fab fa-linkedin-in" />
                </a>
            </div>
        </section>
    );
}
