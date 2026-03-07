import { For, onMount } from 'solid-js';
import { gsap } from 'gsap';
import projects from '../data/projects.json';

const companyProjects  = projects.filter(p => p.group === 'company');
const personalProjects = projects.filter(p => p.group === 'personal');

function ProjectGroup({ items, onSelect }) {
    let listEl;

    onMount(() => {
        const rows = listEl.querySelectorAll('.project-row');
        // Set initial state via GSAP (avoids CSS/GSAP conflict)
        gsap.set(rows, { opacity: 0, y: 16 });
        rows.forEach((el, i) => {
            gsap.to(el, {
                scrollTrigger: { trigger: el, start: 'top 95%', once: true },
                opacity: 1, y: 0,
                duration: 0.6, delay: i * 0.06, ease: 'power3.out',
            });
        });
    });

    return (
        <div class="project-list" ref={listEl}>
            <For each={items}>{(prj, i) =>
                <div class="project-row" onClick={() => onSelect(prj)}>
                    <span class="proj-num">{String(i() + 1).padStart(2, '0')}</span>
                    <div class="proj-main">
                        <div class="proj-title">{prj.title}</div>
                        <div class="proj-summary">{prj.description}</div>
                    </div>
                    <span class="proj-category">{prj.category}</span>
                    <span class="proj-year">{prj.year}</span>
                    <i class="fas fa-arrow-right proj-arrow" />
                </div>
            }</For>
        </div>
    );
}

export default function Projects({ onSelect }) {
    let titleEl;

    onMount(() => {
        gsap.to(titleEl, {
            scrollTrigger: { trigger: titleEl, start: 'top 85%', toggleActions: 'play none none reverse' },
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        });
    });

    return (
        <section id="projects">
            <div class="section-header">
                <span class="section-num">03.</span>
                <h3 ref={titleEl}>Featured Projects</h3>
            </div>

            <div class="project-group">
                <div class="project-group-label">Work</div>
                <ProjectGroup items={companyProjects} onSelect={onSelect} />
            </div>

            <div class="project-group">
                <div class="project-group-label">Personal</div>
                <ProjectGroup items={personalProjects} onSelect={onSelect} />
            </div>
        </section>
    );
}
