import { createSignal, For, onMount, onCleanup } from 'solid-js';

const NAV_LINKS = [
    { href: '#about',    label: 'About Me' },
    { href: '#skills',   label: 'Tech Stack' },
    { href: '#projects', label: 'Featured Projects' },
    { href: '#contact',  label: 'Contact' },
];

export default function Navbar() {
    const [scrolled,  setScrolled]  = createSignal(false);
    const [menuOpen,  setMenuOpen]  = createSignal(false);

    const onScroll = () => setScrolled(window.scrollY > 50);

    onMount(() => {
        window.addEventListener('scroll', onScroll);
        onCleanup(() => window.removeEventListener('scroll', onScroll));
    });

    function handleLink(e, href) {
        e.preventDefault();
        setMenuOpen(false);
        window.lenis?.scrollTo(href, { offset: -80 });
    }

    return (
        <>
            <nav id="navbar" classList={{ scrolled: scrolled() }}>
                <div class="logo">Engy. Park</div>
                <ul class="nav-links">
                    <For each={NAV_LINKS}>{link =>
                        <li><a href={link.href} onClick={e => handleLink(e, link.href)}>{link.label}</a></li>
                    }</For>
                </ul>
                <div class="hamburger" onClick={() => setMenuOpen(true)}>
                    <i class="fas fa-bars" />
                </div>
            </nav>

            <div class="mobile-menu-overlay" classList={{ active: menuOpen() }}>
                <div class="close-btn" onClick={() => setMenuOpen(false)}>
                    <i class="fas fa-times" />
                </div>
                <ul>
                    <For each={NAV_LINKS}>{link =>
                        <li><a href={link.href} onClick={e => handleLink(e, link.href)}>{link.label}</a></li>
                    }</For>
                </ul>
            </div>
        </>
    );
}
