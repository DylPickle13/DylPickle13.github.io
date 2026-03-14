
document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Documentation Search Logic
    const searchInput = document.getElementById('doc-search');
    const docNav = document.getElementById('docs-nav');
    if (searchInput && docNav) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const items = docNav.querySelectorAll('li');
            const sections = document.querySelectorAll('.doc-section');
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(term) ? 'block' : 'none';
            });
            
            sections.forEach(section => {
                const text = section.innerText.toLowerCase();
                section.style.display = text.includes(term) ? 'block' : 'none';
            });
        });
    }

    // 3. Initialize Engine Button Feedback
    const initBtn = document.querySelector('a[href="#features"]');
    if (initBtn && initBtn.innerText.includes('Initialize Engine')) {
        initBtn.addEventListener('click', function(e) {
            e.preventDefault();
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Initializing...';
            this.classList.add('opacity-80');
            
            // Trigger terminal line
            const termContent = document.getElementById('terminal-content');
            const newLine = document.createElement('div');
            newLine.className = 'text-accent-cyan mt-3 font-bold';
            newLine.textContent = '> Manual override: re-initializing engine core...';
            termContent.appendChild(newLine);
            
            setTimeout(() => {
                window.scrollTo({
                    top: document.getElementById('features').offsetTop - 80,
                    behavior: 'smooth'
                });
                setTimeout(() => {
                    this.innerHTML = 'Initialize Engine';
                    this.classList.remove('opacity-80');
                }, 1000);
            }, 800);
        });
    }

    // 4. Existing animations and terminal logic (restoring relevant parts)
    const terminalLines = [
        "EnGem OS v1.2.0 initialized.",
        "> loading core_modules ...",
        "[SYS] Core modules loaded: 100%",
        "> connect llm --provider gemini --mode stream",
        "[LLM] Connection secured. Vector DB sync active.",
        "> start agent_manager",
        "[MANAGER] Awaiting execution directives.",
        "> analyze environment --visual",
        "[VISION] High-fidelity analysis complete.",
        "[ENGEM] System ready. Intelligence Accelerated."
    ];
    
    const terminalContent = document.getElementById('terminal-content');
    if (terminalContent) {
        let lineIndex = 0;
        function typeLine(line, callback) {
            const lineElem = document.createElement('div');
            lineElem.className = line.startsWith('>') ? 'text-accent-cyan mt-3 font-bold' : 'text-gray-300 mt-2';
            terminalContent.appendChild(lineElem);
            let charIndex = 0;
            const interval = setInterval(() => {
                lineElem.textContent = line.substring(0, charIndex + 1);
                charIndex++;
                terminalContent.scrollTop = terminalContent.scrollHeight;
                if (charIndex >= line.length) {
                    clearInterval(interval);
                    setTimeout(callback, 200);
                }
            }, 20);
        }
        function startTerminal() {
            if (lineIndex < terminalLines.length) {
                typeLine(terminalLines[lineIndex], () => {
                    lineIndex++;
                    startTerminal();
                });
            }
        }
        setTimeout(startTerminal, 1000);
    }
    
    // Canvas Particle Network (simplified)
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        let p = Array(100).fill().map(() => ({
            x: Math.random() * w, y: Math.random() * h,
            vx: Math.random() - 0.5, vy: Math.random() - 0.5
        }));
        function draw() {
            ctx.clearRect(0,0,w,h);
            ctx.fillStyle = 'rgba(0, 229, 255, 0.2)';
            p.forEach(particle => {
                particle.x += particle.vx; particle.y += particle.vy;
                if(particle.x<0||particle.x>w) particle.vx*=-1;
                if(particle.y<0||particle.y>h) particle.vy*=-1;
                ctx.beginPath(); ctx.arc(particle.x, particle.y, 1, 0, Math.PI*2); ctx.fill();
            });
            requestAnimationFrame(draw);
        }
        draw();
    }
});
