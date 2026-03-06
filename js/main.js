document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Glow Follow Effect
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Interactive Terminal
    const termInput = document.getElementById('term-input');
    const termOutput = document.getElementById('term-output');

    if (termInput && termOutput) {
        termInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const cmd = termInput.value.trim();
                if (cmd) {
                    processCommand(cmd);
                    termInput.value = '';
                }
            }
        });
    }

    function processCommand(cmd) {
        // Echo command
        const cmdLine = document.createElement('div');
        cmdLine.className = 'term-line';
        cmdLine.innerHTML = `<span class="term-prompt">engem@ai:~$</span> <span class="term-text">${cmd}</span>`;
        termOutput.appendChild(cmdLine);

        // Response
        const resLine = document.createElement('div');
        resLine.className = 'term-output';
        
        let response = '';
        const lowerCmd = cmd.toLowerCase();

        if (lowerCmd === 'help') {
            response = 'Available commands: help, about, features, clear, echo [text]';
        } else if (lowerCmd === 'about') {
            response = 'EnGem: Multi-modal agentic platform powered by Gemini.';
        } else if (lowerCmd === 'features') {
            response = 'Core: Browsing, Python, Notebooks, Visuals, Video, Drive, Search.';
        } else if (lowerCmd === 'clear') {
            termOutput.innerHTML = '';
            return;
        } else if (lowerCmd.startsWith('echo ')) {
            response = cmd.substring(5);
        } else {
            response = `Command not found: ${cmd}. Type 'help' for available commands.`;
        }

        resLine.innerText = response;
        termOutput.appendChild(resLine);
        
        // Auto scroll
        const body = document.querySelector('.terminal-body');
        body.scrollTop = body.scrollHeight;
    }
});
