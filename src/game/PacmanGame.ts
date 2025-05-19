interface Entity {
  x: number;
  y: number;
  size: number;
  color: string;
}

interface Qubic extends Entity {
  direction: { x: number; y: number };
  speed: number;
}

interface XMRBlock extends Entity {
  value: number;
}

class PacmanGame {
  private container: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private qubic: Qubic;
  private blocks: XMRBlock[];
  private score: number = 0;
  private isRunning: boolean = false;
  private animationFrameId: number | null = null;
  private lastTimestamp: number = 0;
  private keyState: { [key: string]: boolean } = {};
  private xmrImage: HTMLImageElement;
  private qubicImage: HTMLImageElement;
  private xmrImageLoaded: boolean = false;
  private qubicImageLoaded: boolean = false;

  constructor(container: HTMLDivElement) {
    this.container = container;
    
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'w-full h-full';
    this.container.appendChild(this.canvas);
    
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    
    // Initialize dimensions
    this.resize();
    
    // Load images
    this.xmrImage = new Image();
    this.xmrImage.onload = () => {
      this.xmrImageLoaded = true;
    };
    this.xmrImage.src = 'https://raw.githubusercontent.com/monero-ecosystem/monero-gui/master/images/monero.png';
    
    this.qubicImage = new Image();
    this.qubicImage.onload = () => {
      this.qubicImageLoaded = true;
    };
    this.qubicImage.src = 'https://raw.githubusercontent.com/qubic-li/client/master/src/main/resources/images/qubic_logo.png';
    
    // Initialize game objects
    this.qubic = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      size: 30,
      color: '#00F0FF',
      direction: { x: 0, y: 0 },
      speed: 200
    };
    
    this.blocks = [];
    this.generateBlocks(10);
    
    // Set up event listeners
    window.addEventListener('resize', this.resize.bind(this));
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
    
    // Initial render
    this.render();
  }
  
  private resize() {
    this.canvas.width = this.container.clientWidth;
    this.canvas.height = this.container.clientHeight;
  }
  
  private generateBlocks(count: number) {
    for (let i = 0; i < count; i++) {
      this.blocks.push({
        x: Math.random() * (this.canvas.width - 40) + 20,
        y: Math.random() * (this.canvas.height - 40) + 20,
        size: 30,
        color: '#FF4B4B',
        value: Math.floor(Math.random() * 100) + 50
      });
    }
  }
  
  private handleKeyDown(e: KeyboardEvent) {
    this.keyState[e.key] = true;
    
    switch (e.key) {
      case 'ArrowLeft':
        this.qubic.direction.x = -1;
        this.qubic.direction.y = 0;
        break;
      case 'ArrowRight':
        this.qubic.direction.x = 1;
        this.qubic.direction.y = 0;
        break;
      case 'ArrowUp':
        this.qubic.direction.x = 0;
        this.qubic.direction.y = -1;
        break;
      case 'ArrowDown':
        this.qubic.direction.x = 0;
        this.qubic.direction.y = 1;
        break;
    }
  }
  
  private handleKeyUp(e: KeyboardEvent) {
    this.keyState[e.key] = false;
  }
  
  private update(deltaTime: number) {
    // Update Qubic position
    this.qubic.x += this.qubic.direction.x * this.qubic.speed * deltaTime;
    this.qubic.y += this.qubic.direction.y * this.qubic.speed * deltaTime;
    
    // Keep Qubic within bounds
    this.qubic.x = Math.max(this.qubic.size, Math.min(this.qubic.x, this.canvas.width - this.qubic.size));
    this.qubic.y = Math.max(this.qubic.size, Math.min(this.qubic.y, this.canvas.height - this.qubic.size));
    
    // Check collisions with XMR blocks
    for (let i = this.blocks.length - 1; i >= 0; i--) {
      const block = this.blocks[i];
      const dx = this.qubic.x - block.x;
      const dy = this.qubic.y - block.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.qubic.size + block.size / 2) {
        this.score += block.value;
        this.blocks.splice(i, 1);
        this.generateBlocks(1);
      }
    }
  }
  
  private render() {
    // Clear canvas with dark background
    this.ctx.fillStyle = '#0A1B2A';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw grid lines
    this.ctx.strokeStyle = '#1B3247';
    this.ctx.lineWidth = 1;
    
    const gridSize = 30;
    for (let x = 0; x < this.canvas.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    
    for (let y = 0; y < this.canvas.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
    
    // Draw XMR blocks if image is loaded
    if (this.xmrImageLoaded) {
      for (const block of this.blocks) {
        this.ctx.save();
        this.ctx.translate(block.x, block.y);
        this.ctx.drawImage(
          this.xmrImage,
          -block.size,
          -block.size,
          block.size * 2,
          block.size * 2
        );
        this.ctx.restore();
      }
    }
    
    // Draw Qubic if image is loaded
    if (this.qubicImageLoaded) {
      this.ctx.save();
      this.ctx.translate(this.qubic.x, this.qubic.y);
      
      // Rotate based on direction
      if (this.qubic.direction.x !== 0 || this.qubic.direction.y !== 0) {
        const angle = Math.atan2(this.qubic.direction.y, this.qubic.direction.x);
        this.ctx.rotate(angle);
      }
      
      this.ctx.drawImage(
        this.qubicImage,
        -this.qubic.size,
        -this.qubic.size,
        this.qubic.size * 2,
        this.qubic.size * 2
      );
      this.ctx.restore();
    }
    
    // Draw score
    this.ctx.fillStyle = '#D0D8E1';
    this.ctx.font = '16px Inter';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(`Score: ${this.score}`, 10, 10);
    
    // Draw Epoch indicator
    this.ctx.fillStyle = '#00F0FF';
    this.ctx.font = '14px Inter';
    this.ctx.textAlign = 'right';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(`Epoch: 161`, this.canvas.width - 10, 10);
  }
  
  private gameLoop(timestamp: number) {
    if (!this.isRunning) return;
    
    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
    }
    
    const deltaTime = (timestamp - this.lastTimestamp) / 1000;
    this.lastTimestamp = timestamp;
    
    this.update(deltaTime);
    this.render();
    
    this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
  }
  
  public start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastTimestamp = 0;
      this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
    }
  }
  
  public pause() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
  
  public restart() {
    this.score = 0;
    this.qubic.x = this.canvas.width / 2;
    this.qubic.y = this.canvas.height / 2;
    this.qubic.direction = { x: 0, y: 0 };
    
    this.blocks = [];
    this.generateBlocks(10);
    
    this.render();
    
    if (this.isRunning) {
      this.pause();
      this.start();
    }
  }
  
  public destroy() {
    this.pause();
    window.removeEventListener('resize', this.resize.bind(this));
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    window.removeEventListener('keyup', this.handleKeyUp.bind(this));
    this.container.removeChild(this.canvas);
  }
}

export default PacmanGame;