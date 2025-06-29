class HeartAnimation {
    constructor() {
        this.caplets = [];
        this.animationStarted = false;
        this.heartPoints = [];
        this.numCaplets = 80;
        
        this.initializeElements();
        this.generateHeartPoints();
        this.createCaplets();
        this.createParticles();
        this.bindEvents();
        this.startBackgroundAnimations();
    }
    
    initializeElements() {
        this.container = document.getElementById('capletsContainer');
        this.textContainer = document.getElementById('textContainer');
        this.heartGlow = document.getElementById('heartGlow');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.progressContainer = document.getElementById('progressContainer');
        this.progressBar = document.getElementById('progressBar');
        this.audioBtn = document.getElementById('audioBtn');
        this.particlesContainer = document.getElementById('particles');
    }
    
    generateHeartPoints() {
        this.heartPoints = [];
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const scale = Math.min(window.innerWidth, window.innerHeight) * 0.12;
        
        for (let i = 0; i < this.numCaplets; i++) {
            const t = (i / this.numCaplets) * 2 * Math.PI;
            
            // Enhanced heart equation for more precise shape
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            
            this.heartPoints.push({
                x: centerX + x * scale,
                y: centerY + y * scale - 30
            });
        }
    }
    
    createCaplets() {
        this.caplets = [];
        
        for (let i = 0; i < this.numCaplets; i++) {
            const caplet = document.createElement('div');
            caplet.className = 'caplet';
            
            // Random starting positions at the bottom
            const startX = Math.random() * window.innerWidth;
            const startY = window.innerHeight + 50 + Math.random() * 100;
            
            caplet.style.left = `${startX}px`;
            caplet.style.top = `${startY}px`;
            caplet.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Add subtle random delay for more natural movement
            const delay = Math.random() * 1000 + 200;
            caplet.style.transitionDelay = `${delay}ms`;
            
            this.container.appendChild(caplet);
            
            this.caplets.push({
                element: caplet,
                startX: startX,
                startY: startY,
                targetX: this.heartPoints[i].x,
                targetY: this.heartPoints[i].y,
                delay: delay
            });
        }
    }
    
    createParticles() {
        const numParticles = 30;
        
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 6}s`;
            particle.style.animationDuration = `${4 + Math.random() * 4}s`;
            
            this.particlesContainer.appendChild(particle);
        }
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startAnimation());
        this.resetBtn.addEventListener('click', () => this.resetAnimation());
        this.audioBtn.addEventListener('click', () => this.toggleAudio());
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (!this.animationStarted) {
                this.handleResize();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (!this.animationStarted) {
                    this.startAnimation();
                } else {
                    this.resetAnimation();
                }
            }
        });
    }
    
    startAnimation() {
        if (this.animationStarted) return;
        
        this.animationStarted = true;
        this.startBtn.disabled = true;
        
        // Show progress indicator
        this.progressContainer.classList.add('visible');
        this.progressBar.classList.add('active');
        
        // Start caplet animation
        this.animateCaplets();
        
        // Show heart glow effect
        setTimeout(() => {
            this.heartGlow.classList.add('active');
        }, 1500);
        
        // Show text with delay
        setTimeout(() => {
            this.textContainer.classList.add('visible');
            this.addTextAnimations();
        }, 3000);
        
        // Hide progress indicator
        setTimeout(() => {
            this.progressContainer.classList.remove('visible');
        }, 4000);
        
        // Add completion effects
        setTimeout(() => {
            this.addCompletionEffects();
        }, 4500);
    }
    
    animateCaplets() {
        this.caplets.forEach((caplet, index) => {
            setTimeout(() => {
                caplet.element.classList.add('animated');
                caplet.element.style.left = `${caplet.targetX}px`;
                caplet.element.style.top = `${caplet.targetY}px`;
                caplet.element.style.transform = `rotate(${Math.random() * 360}deg) scale(1.1)`;
                
                // Add individual caplet glow effect
                setTimeout(() => {
                    caplet.element.style.filter = 'drop-shadow(0 0 12px rgba(236, 72, 153, 0.8))';
                }, 500);
                
            }, caplet.delay);
        });
    }
    
    addTextAnimations() {
        const mainText = this.textContainer.querySelector('.main-text');
        const subtitle = this.textContainer.querySelector('.subtitle');
        
        // Animate main text letters
        const letters = mainText.textContent.split('');
        mainText.innerHTML = '';
        
        letters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter === ' ' ? '\u00A0' : letter;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = 'all 0.5s ease';
            span.style.transitionDelay = `${index * 0.1}s`;
            
            mainText.appendChild(span);
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 100);
        });
        
        // Animate subtitle
        setTimeout(() => {
            subtitle.style.opacity = '0';
            subtitle.style.transform = 'translateY(10px)';
            subtitle.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateY(0)';
            }, 100);
        }, 800);
    }
    
    addCompletionEffects() {
        // Create burst effect
        this.createBurstEffect();
        
        // Add final glow to caplets
        this.caplets.forEach((caplet, index) => {
            setTimeout(() => {
                caplet.element.style.filter = 'drop-shadow(0 0 15px rgba(236, 72, 153, 1)) drop-shadow(0 0 25px rgba(168, 85, 247, 0.5))';
            }, index * 20);
        });
    }
    
    createBurstEffect() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < 12; i++) {
            const burst = document.createElement('div');
            burst.style.position = 'absolute';
            burst.style.left = `${centerX}px`;
            burst.style.top = `${centerY}px`;
            burst.style.width = '4px';
            burst.style.height = '4px';
            burst.style.background = 'rgba(236, 72, 153, 0.8)';
            burst.style.borderRadius = '50%';
            burst.style.pointerEvents = 'none';
            burst.style.zIndex = '20';
            
            const angle = (i / 12) * 2 * Math.PI;
            const distance = 100;
            const targetX = centerX + Math.cos(angle) * distance;
            const targetY = centerY + Math.sin(angle) * distance;
            
            burst.style.transition = 'all 1s ease-out';
            
            document.body.appendChild(burst);
            
            setTimeout(() => {
                burst.style.left = `${targetX}px`;
                burst.style.top = `${targetY}px`;
                burst.style.opacity = '0';
                burst.style.transform = 'scale(2)';
            }, 50);
            
            setTimeout(() => {
                document.body.removeChild(burst);
            }, 1100);
        }
    }
    
    resetAnimation() {
        this.animationStarted = false;
        this.startBtn.disabled = false;
        this.startBtn.innerHTML = '<span class="btn-icon">✨</span><span class="btn-text">Create Magic</span>';
        
        // Hide elements
        this.textContainer.classList.remove('visible');
        this.heartGlow.classList.remove('active');
        this.progressContainer.classList.remove('visible');
        this.progressBar.classList.remove('active');
        
        // Reset caplets
        this.caplets.forEach((caplet) => {
            caplet.element.classList.remove('animated');
            caplet.element.style.left = `${caplet.startX}px`;
            caplet.element.style.top = `${caplet.startY}px`;
            caplet.element.style.transform = `rotate(${Math.random() * 360}deg) scale(1)`;
            caplet.element.style.filter = 'none';
        });
        
        // Reset text
        const mainText = this.textContainer.querySelector('.main-text');
        const subtitle = this.textContainer.querySelector('.subtitle');
        mainText.innerHTML = 'I Love You';
        subtitle.style.opacity = '';
        subtitle.style.transform = '';
        subtitle.style.transition = '';
    }
    
    handleResize() {
        this.generateHeartPoints();
        
        // Update caplet positions
        this.caplets.forEach((caplet, index) => {
            caplet.targetX = this.heartPoints[index].x;
            caplet.targetY = this.heartPoints[index].y;
            
            if (!this.animationStarted) {
                caplet.startX = Math.random() * window.innerWidth;
                caplet.element.style.left = `${caplet.startX}px`;
            }
        });
    }
    
    toggleAudio() {
        
        const audioBtn = this.audioBtn;
        if (audioBtn.textContent === '🔊') {
            audioBtn.textContent = '🔇';
        } else {
            audioBtn.textContent = '🔊';
        }
    }
    
    startBackgroundAnimations() {
        
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            const aurora = document.querySelector('.aurora-effect');
            aurora.style.transform = `translate(-50%, -50%) rotate(${x * 0.1}deg)`;
            
            
            const rings = document.querySelectorAll('.floating-ring');
            rings.forEach((ring, index) => {
                const speed = (index + 1) * 0.02;
                ring.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HeartAnimation();
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.width = '6px';
    sparkle.style.height = '6px';
    sparkle.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(236, 72, 153, 0.8) 70%, transparent 100%)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '25';
    sparkle.style.animation = 'sparkle-fade 1.5s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (document.body.contains(sparkle)) {
            document.body.removeChild(sparkle);
        }
    }, 1500);
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle-fade {
        0% { opacity: 1; transform: scale(0) rotate(0deg); }
        50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        100% { opacity: 0; transform: scale(0) rotate(360deg); }
    }
`;
document.head.appendChild(sparkleStyle);

document.addEventListener('click', (e) => {
    createSparkle(e.clientX, e.clientY);
});