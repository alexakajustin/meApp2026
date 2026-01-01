/**
 * Generative Art Module - Enhanced
 * Creates flowing lines, particles, and confetti
 */

class GenerativeArt {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.lines = [];
        this.particles = [];
        this.maxLines = 20;
        this.animationId = null;
        
        // Cyan/Teal Glow color palettes
        this.palettes = [
            ['#00d4ff', '#00ffea', '#0099cc'],
            ['#00b4ff', '#00ffcc', '#4de8ff'],
            ['#00e5ff', '#00ffc8', '#00b8d4'],
            ['#40c4ff', '#00e5ff', '#00bcd4'],
            ['#00d4ff', '#18ffff', '#84ffff'],
            ['#0097a7', '#00bcd4', '#00e5ff']
        ];
        
        this.currentPalette = this.palettes[0];
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Don't initialize art on load - only draw when user logs
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    initializeArt() {
        // Art is only drawn when logging tasks - no initial lines
    }
    
    burst() {
        this.currentPalette = this.palettes[Math.floor(Math.random() * this.palettes.length)];
        
        const numNewLines = Math.floor(Math.random() * 4) + 3;
        for (let i = 0; i < numNewLines; i++) {
            setTimeout(() => this.addLine(), i * 80);
        }
        
        this.addParticleBurst();
        this.addParticleBurst();
    }
    
    // Bigger burst for achievements/level ups
    celebrationBurst() {
        this.currentPalette = ['#00ffea', '#00d4ff', '#40c4ff', '#84ffff'];
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => this.addLine(), i * 50);
        }
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => this.addParticleBurst(), i * 100);
        }
    }
    
    addLine() {
        const startX = Math.random() * this.canvas.width;
        const startY = Math.random() * this.canvas.height;
        
        const line = {
            points: [{ x: startX, y: startY }],
            color: this.currentPalette[Math.floor(Math.random() * this.currentPalette.length)],
            maxPoints: Math.floor(Math.random() * 100) + 50,
            speed: Math.random() * 2.5 + 1,
            angle: Math.random() * Math.PI * 2,
            angleSpeed: (Math.random() - 0.5) * 0.1,
            lineWidth: Math.random() * 2.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            fadeSpeed: 0.002,
            growing: true
        };
        
        this.lines.push(line);
        
        if (this.lines.length > this.maxLines) {
            this.lines.shift();
        }
    }
    
    addParticleBurst() {
        const centerX = Math.random() * this.canvas.width;
        const centerY = Math.random() * this.canvas.height;
        const numParticles = Math.floor(Math.random() * 30) + 15;
        
        for (let i = 0; i < numParticles; i++) {
            const angle = (Math.PI * 2 / numParticles) * i + Math.random() * 0.5;
            const speed = Math.random() * 4 + 2;
            
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: Math.random() * 4 + 1,
                color: this.currentPalette[Math.floor(Math.random() * this.currentPalette.length)],
                opacity: 1,
                fadeSpeed: 0.015
            });
        }
    }
    
    updateLines() {
        this.lines.forEach(line => {
            if (line.growing && line.points.length < line.maxPoints) {
                const lastPoint = line.points[line.points.length - 1];
                
                line.angle += line.angleSpeed;
                line.angleSpeed += (Math.random() - 0.5) * 0.02;
                line.angleSpeed = Math.max(-0.15, Math.min(0.15, line.angleSpeed));
                
                const newX = lastPoint.x + Math.cos(line.angle) * line.speed;
                const newY = lastPoint.y + Math.sin(line.angle) * line.speed;
                
                if (newX < 0 || newX > this.canvas.width) line.angle = Math.PI - line.angle;
                if (newY < 0 || newY > this.canvas.height) line.angle = -line.angle;
                
                line.points.push({
                    x: Math.max(0, Math.min(this.canvas.width, newX)),
                    y: Math.max(0, Math.min(this.canvas.height, newY))
                });
            } else {
                line.growing = false;
                line.opacity -= line.fadeSpeed;
            }
        });
        
        this.lines = this.lines.filter(line => line.opacity > 0);
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            particle.opacity -= particle.fadeSpeed;
        });
        
        this.particles = this.particles.filter(p => p.opacity > 0);
    }
    
    drawLines() {
        this.lines.forEach(line => {
            if (line.points.length < 2) return;
            
            this.ctx.beginPath();
            this.ctx.moveTo(line.points[0].x, line.points[0].y);
            
            for (let i = 1; i < line.points.length - 1; i++) {
                const xc = (line.points[i].x + line.points[i + 1].x) / 2;
                const yc = (line.points[i].y + line.points[i + 1].y) / 2;
                this.ctx.quadraticCurveTo(line.points[i].x, line.points[i].y, xc, yc);
            }
            
            this.ctx.strokeStyle = line.color;
            this.ctx.lineWidth = line.lineWidth;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.globalAlpha = line.opacity;
            this.ctx.stroke();
        });
        
        this.ctx.globalAlpha = 1;
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
        });
        
        this.ctx.globalAlpha = 1;
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(2, 8, 16, 0.03)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateLines();
        this.updateParticles();
        this.drawLines();
        this.drawParticles();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

// ===== Confetti System =====
class ConfettiSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.confetti = [];
        this.animating = false;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    burst(x = null, y = null) {
        const centerX = x ?? this.canvas.width / 2;
        const centerY = y ?? this.canvas.height * 0.3;
        const colors = ['#00d4ff', '#00ffea', '#00b4ff', '#4de8ff', '#00e5ff', '#40c4ff', '#00ffcc', '#84ffff'];
        
        for (let i = 0; i < 150; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 15 + 5;
            
            this.confetti.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * velocity * (Math.random() * 0.5 + 0.5),
                vy: Math.sin(angle) * velocity - Math.random() * 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 4,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.3,
                opacity: 1,
                shape: Math.random() > 0.5 ? 'rect' : 'circle'
            });
        }
        
        if (!this.animating) {
            this.animating = true;
            this.animate();
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.confetti.forEach(c => {
            c.x += c.vx;
            c.y += c.vy;
            c.vy += 0.3; // gravity
            c.vx *= 0.99;
            c.rotation += c.rotationSpeed;
            c.opacity -= 0.005;
            
            if (c.opacity > 0) {
                this.ctx.save();
                this.ctx.translate(c.x, c.y);
                this.ctx.rotate(c.rotation);
                this.ctx.globalAlpha = c.opacity;
                this.ctx.fillStyle = c.color;
                
                if (c.shape === 'rect') {
                    this.ctx.fillRect(-c.size / 2, -c.size / 4, c.size, c.size / 2);
                } else {
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, c.size / 2, 0, Math.PI * 2);
                    this.ctx.fill();
                }
                
                this.ctx.restore();
            }
        });
        
        this.confetti = this.confetti.filter(c => c.opacity > 0 && c.y < this.canvas.height + 50);
        
        if (this.confetti.length > 0) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.animating = false;
        }
    }
}

// Initialize
let generativeArt;
let confettiSystem;

document.addEventListener('DOMContentLoaded', () => {
    generativeArt = new GenerativeArt('artCanvas');
    confettiSystem = new ConfettiSystem('confettiCanvas');
});
