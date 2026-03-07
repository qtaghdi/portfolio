import { createSignal, Show, onMount } from 'solid-js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
    const [selectedProject, setSelectedProject] = createSignal(null);

    onMount(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        window.lenis = lenis;

        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);

        ScrollTrigger.refresh();
    });

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects onSelect={setSelectedProject} />
                <Contact />
            </main>
            <Show when={selectedProject()} keyed>
                {project => (
                    <ProjectModal
                        project={project}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </Show>
            <footer>
                <p>Designed & Built by Park Sangmin</p>
            </footer>
        </>
    );
}
