import { For, onMount } from 'solid-js';
import { gsap } from 'gsap';
import skillsData from '../data/skills.json';

export default function Skills() {
    let titleEl, listEl;

    onMount(() => {
        gsap.to(titleEl, {
            scrollTrigger: { trigger: titleEl, start: 'top 85%', toggleActions: 'play none none reverse' },
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        });
        listEl.querySelectorAll('.skills-row').forEach((el, i) => {
            gsap.to(el, {
                scrollTrigger: { trigger: listEl, start: 'top 80%' },
                y: 0, opacity: 1, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
            });
        });
    });

    return (
        <section id="skills">
            <div class="section-header">
                <span class="section-num">02.</span>
                <h3 ref={titleEl}>Tech Stack</h3>
            </div>
            <div class="skills-grid" ref={listEl}>
                <For each={Object.entries(skillsData)}>{([category, items]) =>
                    <div class="skills-row">
                        <span class="skills-row-label">{category}</span>
                        <div class="skills-row-tags">
                            <For each={items}>{item =>
                                <span class="skill-tag">{item.name}</span>
                            }</For>
                        </div>
                    </div>
                }</For>
            </div>
        </section>
    );
}
