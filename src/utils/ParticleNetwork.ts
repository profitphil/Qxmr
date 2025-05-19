class ParticleNetwork {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[];
  private connections: Connection[];
  private animationFrameId: number | null = null;
  private isDestroyed: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.particles = [];
    this.connections = [];
    
    this.resize();
    this.init();
    
    window.addEventListener('resize', this.resize.bind(this));
    this.animate();
  }
  
  private resize() {
    const pixelRatio = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * pixelRatio;
    this.canvas.height = this.canvas.clientHeight * pixelRatio;
    this.ctx.scale(pixelRatio, pixelRatio);
  }
  
  private init() {
    const particleCount = Math.floor(this.canvas.width / 10);
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(
        Math.random() * this.canvas.width,
        Math.random() * this.canvas.height,
        Math.random() * 2 + 1,
        Math.random() * Math.PI * 2
      ));
    }
    
    // Create connections
    for (let i = 0; i < this.particles.length; i++) {
      const connectionsCount = Math.floor(Math.random() * 2) + 1;
      for (let j = 0; j < connectionsCount; j++) {
        const target = Math.floor(Math.random() * this.particles.length);
        if (i !== target) {
          this.connections.push(new Connection(this.particles[i], this.particles[target]));
        }
      }
    }
  }
  
  private animate() {
    if (this.isDestroyed) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    for (const particle of this.particles) {
      particle.update(this.canvas.width, this.canvas.height);
      particle.draw(this.ctx);
    }
    
    // Draw connections
    for (const connection of this.connections) {
      connection.draw(this.ctx);
    }
    
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
  }
  
  public destroy() {
    this.isDestroyed = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.resize.bind(this));
  }
}

class Particle {
  public x: number;
  public y: number;
  private radius: number;
  private speed: number;
  private direction: number;
  private color: string;
  private opacityMultiplier: number;
  
  constructor(x: number, y: number, radius: number, direction: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = Math.random() * 0.5 + 0.2;
    this.direction = direction;
    this.color = '#38bdf8';
    this.opacityMultiplier = Math.random() * 0.5 + 0.3;
  }
  
  public update(canvasWidth: number, canvasHeight: number) {
    // Update position
    this.x += Math.cos(this.direction) * this.speed;
    this.y += Math.sin(this.direction) * this.speed;
    
    // Bounce off edges
    if (this.x <= 0 || this.x >= canvasWidth) {
      this.direction = Math.PI - this.direction;
    }
    
    if (this.y <= 0 || this.y >= canvasHeight) {
      this.direction = -this.direction;
    }
    
    // Keep particles within canvas
    this.x = Math.max(0, Math.min(this.x, canvasWidth));
    this.y = Math.max(0, Math.min(this.y, canvasHeight));
  }
  
  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color + Math.floor(this.opacityMultiplier * 100).toString(16).padStart(2, '0');
    ctx.fill();
  }
}

class Connection {
  private particleA: Particle;
  private particleB: Particle;
  private maxDistance: number;
  
  constructor(particleA: Particle, particleB: Particle) {
    this.particleA = particleA;
    this.particleB = particleB;
    this.maxDistance = 150;
  }
  
  public draw(ctx: CanvasRenderingContext2D) {
    const dx = this.particleA.x - this.particleB.x;
    const dy = this.particleA.y - this.particleB.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < this.maxDistance) {
      const opacity = 1 - distance / this.maxDistance;
      ctx.beginPath();
      ctx.moveTo(this.particleA.x, this.particleA.y);
      ctx.lineTo(this.particleB.x, this.particleB.y);
      ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.2})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
}

export default ParticleNetwork;