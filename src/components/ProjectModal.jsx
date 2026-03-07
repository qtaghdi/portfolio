import { For, Show, onMount, onCleanup } from 'solid-js';

export default function ProjectModal({ project, onClose }) {
    onMount(() => {
        document.body.classList.add('modal-open');
        const onKey = e => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        onCleanup(() => {
            document.body.classList.remove('modal-open');
            window.removeEventListener('keydown', onKey);
        });
    });

    return (
        <div class="modal-overlay" onClick={onClose}>
            <div class="modal-panel" onClick={e => e.stopPropagation()}>
                <button class="modal-close" onClick={onClose}>
                    <i class="fas fa-times" />
                </button>

                <div class="modal-category-badge">{project.category}</div>
                <h2 class="modal-title">{project.title}</h2>

                <div class="modal-meta">
                    <span><i class="fas fa-calendar-alt" /> {project.year}</span>
                    <span><i class="fas fa-user-tag" /> {project.role}</span>
                </div>

                <div class="modal-divider" />

                <div class="modal-section">
                    <h5>Problem</h5>
                    <p>{project.problem}</p>
                </div>
                <div class="modal-section">
                    <h5>Solution</h5>
                    <p>{project.solution}</p>
                </div>
                <div class="modal-section">
                    <h5>Result</h5>
                    <p>{project.result}</p>
                </div>

                <div class="modal-divider" />

                <div class="modal-section">
                    <h5>Highlights</h5>
                    <ul class="modal-highlights">
                        <For each={project.highlights}>{item => <li>{item}</li>}</For>
                    </ul>
                </div>

                <div class="modal-section">
                    <h5>Tech Stack</h5>
                    <div class="modal-tech-stack">
                        <For each={project.tech}>{t => <span>{t}</span>}</For>
                    </div>
                </div>

                <Show when={project.github || project.link}>
                    <div class="modal-links">
                        <Show when={project.github}>
                            <a href={project.github} target="_blank" class="modal-link-github">
                                <i class="fab fa-github" /> GitHub
                            </a>
                        </Show>
                        <Show when={project.link}>
                            <a href={project.link} target="_blank" class="modal-link-external">
                                <i class="fas fa-external-link-alt" /> Visit Site
                            </a>
                        </Show>
                    </div>
                </Show>
            </div>
        </div>
    );
}
