/**
 * Freeform Mind Canvas - Professional Edition
 * @author Rudy Dekeerschieter
 */

// --- Constants ---
const STROKE_HIT_MARGIN = 15;
const HANDLE_SIZE_BASE = 15;
const HANDLE_HIT_TOLERANCE_BASE = 12;
const ELLIPSE_HIT_TOLERANCE = 1.2;
const DEFAULT_RECT_W = 120;
const DEFAULT_RECT_H = 60;
const DEFAULT_CLOUD_W = 150;
const DEFAULT_CLOUD_H = 90;
const DEFAULT_ELLIPSE_W = 100;
const DEFAULT_ELLIPSE_H = 100;

let nextId = 1;

// --- Base Classes ---
class Drawable {
    constructor() {
        this.id = nextId++;
        this.selected = false;
        this.type = 'base';
    }
    draw(ctx, zoom) {}
    isHit(px, py) { return false; }
}

class Stroke extends Drawable {
    constructor(points, color, size, isMarker = false) {
        super();
        this.type = 'stroke';
        this.points = points;
        this.color = color;
        this.size = size;
        this.isMarker = isMarker;
    }
    draw(ctx) {
        if (this.points.length < 2) return;
        ctx.save();
        ctx.beginPath();
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.globalAlpha = this.isMarker ? 0.4 : 1.0;
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let p of this.points) ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.restore();
    }
    isHit(px, py) {
        return this.points.some(p => Math.hypot(p.x - px, p.y - py) < STROKE_HIT_MARGIN);
    }
}

class Shape extends Drawable {
    constructor(x, y, w, h, sColor, fColor, lWidth, tColor, fSize) {
        super();
        this.x = x; this.y = y; this.w = w; this.h = h;
        this.strokeColor = sColor; this.fillColor = fColor; this.lineWidth = lWidth;
        this.text = ""; this.textColor = tColor; this.fontSize = fSize;
        this.isTextOnly = false;
    }
    drawText(ctx) {
        ctx.fillStyle = this.textColor;
        ctx.font = `${this.fontSize}px sans-serif`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        const lines = this.text.split('\n');
        const lh = this.fontSize * 1.2;
        lines.forEach((line, i) => {
            ctx.fillText(line, this.x + this.w/2, this.y + this.h/2 + (i - (lines.length-1)/2) * lh);
        });
    }
    drawHandles(ctx, zoom) {
        if (!this.selected) return;
        const s = HANDLE_SIZE_BASE / zoom;
        ctx.fillStyle = "#ff9800"; 
        const h = this.getHandleCoords();
        for (let k in h) ctx.fillRect(h[k].x - s/2, h[k].y - s/2, s, s);
    }
    getHandleCoords() {
        if (this.isTextOnly) {
            return {
                nw: {x:this.x, y:this.y},
                ne: {x:this.x+this.w, y:this.y},
                sw: {x:this.x, y:this.y+this.h},
                se: {x:this.x+this.w, y:this.y+this.h}
            };
        }
        return {
            nw: {x:this.x, y:this.y}, n: {x:this.x+this.w/2, y:this.y}, ne: {x:this.x+this.w, y:this.y},
            w: {x:this.x, y:this.y+this.h/2}, e: {x:this.x+this.w, y:this.y+this.h/2},
            sw: {x:this.x, y:this.y+this.h}, s: {x:this.x+this.w/2, y:this.y+this.h}, se: {x:this.x+this.w, y:this.y+this.h}
        };
    }
    getHandleAt(px, py, zoom) {
        const s = HANDLE_HIT_TOLERANCE_BASE / zoom; 
        const h = this.getHandleCoords();
        for (let k in h) if (px >= h[k].x-s && px <= h[k].x+s && py >= h[k].y-s && py <= h[k].y+s) return k;
        return null;
    }
    isHit(px, py) { return px >= this.x && px <= this.x + this.w && py >= this.y && py <= this.y + this.h; }
}

class RectShape extends Shape {
    constructor(...args) { super(...args); this.type='rect'; }
    draw(ctx, zoom) {
        ctx.save();
        if (!this.isTextOnly || this.selected) {
            ctx.beginPath(); ctx.rect(this.x, this.y, this.w, this.h);
            if (!this.isTextOnly) {
                ctx.fillStyle = this.fillColor; ctx.fill();
                ctx.strokeStyle = this.selected ? "#ff9800" : this.strokeColor;
                ctx.lineWidth = this.lineWidth;
            } else {
                ctx.strokeStyle = "rgba(255, 152, 0, 0.3)"; ctx.setLineDash([5, 5]); ctx.lineWidth = 1;
            }
            ctx.stroke();
        }
        if (this.text) this.drawText(ctx);
        ctx.restore(); this.drawHandles(ctx, zoom);
    }
}

class EllipseShape extends Shape {
    constructor(...args) { super(...args); this.type='ellipse'; }
    draw(ctx, zoom) {
        ctx.save(); ctx.beginPath(); 
        ctx.ellipse(this.x+this.w/2, this.y+this.h/2, Math.abs(this.w/2), Math.abs(this.h/2), 0, 0, Math.PI*2);
        ctx.fillStyle = this.fillColor; ctx.fill();
        ctx.strokeStyle = this.selected ? "#ff9800" : this.strokeColor;
        ctx.lineWidth = this.lineWidth; ctx.stroke();
        if (this.text) this.drawText(ctx);
        ctx.restore(); this.drawHandles(ctx, zoom);
    }
    isHit(px, py) {
        const dx = px - (this.x + this.w/2), dy = py - (this.y + this.h/2);
        const rx = this.w / 2, ry = this.h / 2;
        return (dx*dx)/(rx*rx) + (dy*dy)/(ry*ry) <= ELLIPSE_HIT_TOLERANCE;
    }
}

class CloudShape extends Shape {
    constructor(...args) { super(...args); this.type='cloud'; }
    draw(ctx, zoom) {
        ctx.save(); ctx.beginPath();
        let x = this.x, y = this.y, w = this.w, h = this.h;
        ctx.moveTo(x + w * 0.1, y + h * 0.4);
        ctx.bezierCurveTo(x - w*0.1, y + h*0.1, x + w*0.2, y - h*0.1, x + w*0.4, y + h*0.1);
        ctx.bezierCurveTo(x + w*0.6, y - h*0.2, x + w*0.9, y + h*0.1, x + w*0.9, y + h*0.4);
        ctx.bezierCurveTo(x + w*1.1, y + h*0.7, x + w*0.8, y + h*1.1, x + w*0.5, y + h*0.9);
        ctx.bezierCurveTo(x + w*0.2, y + h*1.1, x - w*0.1, y + h*0.8, x + w*0.1, y + h*0.4);
        ctx.closePath(); ctx.fillStyle = this.fillColor; ctx.fill();
        ctx.strokeStyle = this.selected ? "#ff9800" : this.strokeColor;
        ctx.lineWidth = this.lineWidth; ctx.stroke();
        if (this.text) this.drawText(ctx);
        ctx.restore(); this.drawHandles(ctx, zoom);
    }
}

// --- Main App ---
class MindCanvasApp {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.camera = { x: 0, y: 0, zoom: 1.0 };
        this.drawables = [];
        this.mode = 'select';
        this.activeObj = null;
        this.activeHandle = null;
        this.isPanning = false; this.isDragging = false; this.isDrawing = false;
        this.initialPinchDist = null;
        this.STORAGE_KEY = 'mindcanvas_drawing';
        this.editingShape = null;
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.attachEvents();
        this.loadLocal(true);
        this.render();
    }

    resize() { this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight; }

    showStatus(msg) {
        const el = document.getElementById('statusMsg');
        if (el) { el.innerText = msg; setTimeout(() => { if (el.innerText === msg) el.innerText = "Ready"; }, 2500); }
    }

    undo() {
        if (this.drawables.length > 0) {
            this.drawables.pop();
            this.showStatus("Last action undone");
        } else {
            this.showStatus("Nothing to undo");
        }
    }

    deleteSelected() {
        if (this.activeObj) {
            this.drawables = this.drawables.filter(d => d !== this.activeObj);
            this.activeObj = null;
            this.showStatus("Deleted selected object");
        } else {
            this.showStatus("No object selected");
        }
    }

    getBgColor() {
        return document.getElementById('bgColor').value;
    }

    setBgColor(color) {
        const picker = document.getElementById('bgColor');
        if (picker) picker.value = color;
    }

    attachEvents() {
        // Mouse
        this.canvas.addEventListener('mousedown', e => this.handleStart(e.clientX, e.clientY, e.button));
        window.addEventListener('mousemove', e => this.handleMove(e.clientX, e.clientY));
        window.addEventListener('mouseup', () => this.handleEnd());
        
        // Touch
        this.canvas.addEventListener('touchstart', e => {
            e.preventDefault();
            if (e.touches.length === 2) {
                this.handleStart(0, 0, 0, e.touches);
            } else if (e.touches.length === 1) {
                const t = e.touches[0];
                this.handleStart(t.clientX, t.clientY, 0);
            }
        }, { passive: false });

        this.canvas.addEventListener('touchmove', e => {
            e.preventDefault();
            if (e.touches.length === 2) {
                this.handleMove(0, 0, e.touches);
            } else if (e.touches.length === 1) {
                const t = e.touches[0];
                this.handleMove(t.clientX, t.clientY);
            }
        }, { passive: false });

        this.canvas.addEventListener('touchend', () => {
            this.initialPinchDist = null;
            this.handleEnd();
        });

        this.canvas.addEventListener('wheel', e => this.onWheel(e), { passive: false });
        this.canvas.addEventListener('dblclick', e => this.onDblClick(e.clientX, e.clientY));

        // Keyboard Delete / Undo
        window.addEventListener('keydown', e => {
            const dialogOpen = document.getElementById('textDialog')?.open;
            const activeEl = document.activeElement;
            const isTyping = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');
            if ((e.key === 'Delete' || e.key === 'Backspace') && !dialogOpen && !isTyping) {
                e.preventDefault();
                this.deleteSelected();
            }
            if (e.ctrlKey && e.key === 'z' && !dialogOpen && !isTyping) {
                e.preventDefault();
                this.undo();
            }
        });

        // UI buttons
        const fab = document.getElementById('fab');
        const toolbarCont = document.querySelector('.toolbar-container');
        if (fab && toolbarCont) fab.onclick = () => toolbarCont.classList.toggle('visible');

        const modes = ['Select', 'Pen', 'Marker', 'Eraser', 'Text', 'Rect', 'Ellipse', 'Circle', 'Cloud'];
        modes.forEach(m => {
            const btn = document.getElementById('mode' + m);
            if (btn) btn.onclick = () => this.setMode(m.toLowerCase());
        });

        const clearBtn = document.getElementById('clearAll');
        if (clearBtn) clearBtn.onclick = () => { if (confirm("Clear everything?")) { this.drawables = []; this.showStatus("Canvas cleared"); } };
        
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) saveBtn.onclick = () => this.saveLocal();
        
        const loadBtn = document.getElementById('loadBtn');
        if (loadBtn) loadBtn.onclick = () => this.loadLocal();
        
        const revertBtn = document.getElementById('revertBtn');
        if (revertBtn) revertBtn.onclick = () => this.undo();
        
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) exportBtn.onclick = () => this.exportJSON();
        
        const importBtn = document.getElementById('importBtn');
        const importFileInput = document.getElementById('importFileInput');
        if (importBtn && importFileInput) {
            importBtn.onclick = () => importFileInput.click();
            importFileInput.onchange = (e) => {
                if (e.target.files && e.target.files[0]) this.importJSON(e.target.files[0]);
                importFileInput.value = '';
            };
        }
        
        const screenshotBtn = document.getElementById('screenshotBtn');
        if (screenshotBtn) screenshotBtn.onclick = () => this.takeScreenshot();

        // Text dialog
        const dialog = document.getElementById('textDialog');
        const dialogCancel = document.getElementById('dialogCancel');
        const dialogConfirm = document.getElementById('dialogConfirm');
        
        dialogCancel.onclick = () => {
            if (this.editingShape && this.editingShape.text === "") {
                this.drawables = this.drawables.filter(d => d !== this.editingShape);
                if (this.activeObj === this.editingShape) this.activeObj = null;
                this.showStatus("Text cancelled, empty node removed");
            }
            this.editingShape = null;
            dialog.close();
        };
        
        dialogConfirm.onclick = (e) => {
            e.preventDefault();
            const input = document.getElementById('dialogInput');
            if (this.editingShape) {
                this.editingShape.text = input.value;
                this.editingShape.textColor = document.getElementById('textColor').value;
                this.editingShape.fontSize = parseInt(document.getElementById('fontSizeSelect').value);
                this.showStatus("Text updated");
            }
            this.editingShape = null;
            dialog.close();
        };
        
        const form = dialog.querySelector('form');
        if (form) form.onsubmit = (e) => e.preventDefault();
    }

    handleStart(mx, my, btn, touches) {
        this.lastMouse = { x: mx, y: my };
        if (touches && touches.length === 2) {
            const t1 = touches[0], t2 = touches[1];
            const midX = (t1.clientX + t2.clientX) / 2;
            const midY = (t1.clientY + t2.clientY) / 2;
            this.lastMouse = { x: midX, y: midY };
            this.initialPinchDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
            this.isPanning = true;
            this.isDrawing = false;
            this.isDragging = false;
            return;
        }
        const wp = this.sToW(mx, my);
        if (this.mode === 'select' || btn === 2) {
            if (this.activeObj && this.activeObj.selected) {
                this.activeHandle = this.activeObj.getHandleAt(wp.x, wp.y, this.camera.zoom);
                if (this.activeHandle) return;
            }
            const hit = [...this.drawables].reverse().find(d => d.isHit(wp.x, wp.y));
            this.drawables.forEach(d => d.selected = false);
            if (hit) {
                this.activeObj = hit; hit.selected = true; this.isDragging = true;
                this.dragOffset = { x: wp.x - (hit.x || 0), y: wp.y - (hit.y || 0) };
                const idx = this.drawables.indexOf(hit);
                this.drawables.push(this.drawables.splice(idx, 1)[0]);
            } else { this.activeObj = null; this.isPanning = true; }
        } else if (['pen', 'marker'].includes(this.mode)) {
            this.isDrawing = true; this.tempPoints = [wp];
        } else if (['rect', 'ellipse', 'circle', 'cloud', 'text'].includes(this.mode)) {
            const s = this.createShape(this.mode, wp.x, wp.y);
            this.drawables.push(s); this.activeObj = s;
            this.drawables.forEach(d => d.selected = false); s.selected = true;
            if (this.mode === 'text') {
                this.editingShape = s;
                const dialog = document.getElementById('textDialog');
                const input = document.getElementById('dialogInput');
                input.value = "";
                dialog.showModal();
                setTimeout(() => input.focus(), 10);
            } else {
                this.activeHandle = 'se';
            }
        } else if (this.mode === 'eraser') {
            const hit = [...this.drawables].reverse().find(d => d.isHit(wp.x, wp.y));
            if (hit) this.drawables = this.drawables.filter(d => d !== hit);
        }
    }

    handleMove(mx, my, touches) {
        if (touches && touches.length === 2 && this.initialPinchDist) {
            const t1 = touches[0], t2 = touches[1];
            const newDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
            const zoomFactor = newDist / this.initialPinchDist;
            const midX = (t1.clientX + t2.clientX) / 2;
            const midY = (t1.clientY + t2.clientY) / 2;
            const wp = this.sToW(midX, midY);
            this.camera.zoom *= zoomFactor;
            this.camera.x = midX - wp.x * this.camera.zoom;
            this.camera.y = midY - wp.y * this.camera.zoom;
            this.initialPinchDist = newDist;
            this.lastMouse = { x: midX, y: midY };
            return;
        }
        const wp = this.sToW(mx, my);
        if (this.isPanning) {
            this.camera.x += (mx - this.lastMouse.x); this.camera.y += (my - this.lastMouse.y);
        } else if (this.activeHandle && this.activeObj) {
            const h = this.activeHandle;
            if (this.activeObj.type === 'circle') {
                let size = Math.max(wp.x - this.activeObj.x, wp.y - this.activeObj.y);
                this.activeObj.w = size; this.activeObj.h = size;
            } else {
                if (h.includes('e')) this.activeObj.w = wp.x - this.activeObj.x;
                if (h.includes('s')) this.activeObj.h = wp.y - this.activeObj.y;
                if (h.includes('w')) { this.activeObj.w += (this.activeObj.x - wp.x); this.activeObj.x = wp.x; }
                if (h.includes('n')) { this.activeObj.h += (this.activeObj.y - wp.y); this.activeObj.y = wp.y; }
            }
            if (this.activeObj.w < 0) { this.activeObj.x += this.activeObj.w; this.activeObj.w = -this.activeObj.w; }
            if (this.activeObj.h < 0) { this.activeObj.y += this.activeObj.h; this.activeObj.h = -this.activeObj.h; }
        } else if (this.isDragging && this.activeObj) {
            this.activeObj.x = wp.x - this.dragOffset.x; this.activeObj.y = wp.y - this.dragOffset.y;
        } else if (this.isDrawing && this.tempPoints) {
            this.tempPoints.push(wp);
        }
        this.lastMouse = { x: mx, y: my };
    }

    handleEnd() {
        if (this.isDrawing && this.tempPoints && this.tempPoints.length > 1) {
            const m = this.mode === 'marker';
            const color = document.getElementById(m ? 'markerColor' : 'penColor').value;
            const size = parseInt(document.getElementById('brushSize').value);
            this.drawables.push(new Stroke(this.tempPoints, color, size, m));
        }
        this.isDrawing = false; this.isPanning = false; this.isDragging = false; this.activeHandle = null;
        this.tempPoints = null;
    }

    onWheel(e) {
        e.preventDefault();
        const factor = e.deltaY > 0 ? 0.9 : 1.1;
        const wp = this.sToW(e.clientX, e.clientY);
        this.camera.zoom *= factor;
        this.camera.x = e.clientX - wp.x * this.camera.zoom;
        this.camera.y = e.clientY - wp.y * this.camera.zoom;
    }

    onDblClick(mx, my) {
        const wp = this.sToW(mx, my);
        const hit = [...this.drawables].reverse().find(d => d instanceof Shape && d.isHit(wp.x, wp.y));
        if (hit) {
            this.editingShape = hit;
            const dialog = document.getElementById('textDialog');
            const input = document.getElementById('dialogInput');
            input.value = hit.text;
            dialog.showModal();
            setTimeout(() => input.focus(), 10);
        }
    }

    createShape(t, x, y) {
        const sc = document.getElementById('strokeColor').value;
        const fc = document.getElementById('fillColor').value;
        const lw = parseInt(document.getElementById('brushSize').value);
        const tc = document.getElementById('textColor').value;
        const fs = parseInt(document.getElementById('fontSizeSelect').value);
        let s;
        if (t === 'rect' || t === 'text') {
            s = new RectShape(x, y, DEFAULT_RECT_W, DEFAULT_RECT_H, sc, fc, lw, tc, fs);
            if (t === 'text') s.isTextOnly = true;
        } else if (t === 'cloud') {
            s = new CloudShape(x, y, DEFAULT_CLOUD_W, DEFAULT_CLOUD_H, sc, fc, lw, tc, fs);
        } else if (t === 'ellipse' || t === 'circle') {
            s = new EllipseShape(x, y, DEFAULT_ELLIPSE_W, DEFAULT_ELLIPSE_H, sc, fc, lw, tc, fs);
            if (t === 'circle') s.type = 'circle';
        }
        return s;
    }

    sToW(x, y) { return { x: (x - this.camera.x) / this.camera.zoom, y: (y - this.camera.y) / this.camera.zoom }; }

    saveLocal() {
        const state = { drawables: this.drawables, bgColor: this.getBgColor() };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
        this.showStatus("Saved to browser");
    }

    loadLocal(silent = false) {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        if (!raw) { if (!silent) this.showStatus("No saved data"); return; }
        try {
            const data = JSON.parse(raw);
            let drawArr, bg;
            if (Array.isArray(data)) { drawArr = data; bg = '#ffffff'; }
            else if (data.drawables && Array.isArray(data.drawables)) { drawArr = data.drawables; bg = data.bgColor || '#ffffff'; }
            else throw new Error("Invalid");
            this.drawables = this.parse(drawArr);
            this.setBgColor(bg);
            this.camera = { x: 0, y: 0, zoom: 1.0 };
            if (!silent) this.showStatus("Loaded from browser");
        } catch(e) { if (!silent) this.showStatus("Load failed"); }
    }

    exportJSON() {
        let baseName = prompt("Enter filename (without .json):", "mindmap");
        if (baseName === null || baseName.trim() === "") { this.showStatus("Export cancelled"); return; }
        baseName = baseName.trim();
        const fileName = baseName.endsWith('.json') ? baseName : baseName + '.json';
        const state = { drawables: this.drawables, bgColor: this.getBgColor() };
        const jsonStr = JSON.stringify(state, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);
        this.showStatus(`Exported as ${fileName}`);
    }

    importJSON(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                let drawArr, bg;
                if (Array.isArray(data)) { drawArr = data; bg = '#ffffff'; }
                else if (data.drawables && Array.isArray(data.drawables)) { drawArr = data.drawables; bg = data.bgColor || '#ffffff'; }
                else throw new Error("Invalid");
                this.drawables = this.parse(drawArr);
                this.setBgColor(bg);
                this.camera = { x: 0, y: 0, zoom: 1.0 };
                this.showStatus("Imported JSON");
            } catch(err) { this.showStatus("Invalid JSON file"); }
        };
        reader.readAsText(file);
    }

    parse(rawArray) {
        return rawArray.map(o => {
            let n;
            if (o.type === 'stroke') n = new Stroke();
            else if (o.type === 'rect') n = new RectShape();
            else if (o.type === 'ellipse' || o.type === 'circle') n = new EllipseShape();
            else if (o.type === 'cloud') n = new CloudShape();
            else return null;
            return Object.assign(n, o);
        }).filter(v => v !== null);
    }

    takeScreenshot() {
        let name = prompt("Save as (.png):", "screenshot");
        if (name === null || name.trim() === "") return;
        name = name.trim();
        const fileName = name.endsWith('.png') ? name : name + '.png';
        const prev = this.activeObj;
        if (prev) prev.selected = false;
        const link = document.createElement('a');
        link.download = fileName;
        link.href = this.canvas.toDataURL();
        link.click();
        if (prev) prev.selected = true;
        this.showStatus("Screenshot saved");
    }

    setMode(m) {
        this.mode = m;
        document.querySelectorAll('.tool-group button').forEach(b => b.classList.remove('active'));
        const activeBtn = document.getElementById('mode' + m.charAt(0).toUpperCase() + m.slice(1));
        if (activeBtn) activeBtn.classList.add('active');
        this.showStatus(`Mode: ${m}`);
        if (window.innerWidth <= 700) {
            const toolbar = document.querySelector('.toolbar-container');
            if (toolbar) toolbar.classList.remove('visible');
        }
        if (this.mode === 'select') this.canvas.style.cursor = 'grab';
        else if (this.mode === 'pen' || this.mode === 'marker') this.canvas.style.cursor = 'crosshair';
        else if (this.mode === 'eraser') this.canvas.style.cursor = 'cell';
        else if (this.mode === 'text') this.canvas.style.cursor = 'text';
        else this.canvas.style.cursor = 'default';
    }

    render() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillStyle = document.getElementById('bgColor').value;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera.x, this.camera.y);
        this.ctx.scale(this.camera.zoom, this.camera.zoom);
        this.drawables.forEach(d => d.draw(this.ctx, this.camera.zoom));
        if (this.isDrawing && this.tempPoints && this.tempPoints.length) {
            this.ctx.save();
            const m = this.mode === 'marker';
            this.ctx.beginPath();
            this.ctx.strokeStyle = document.getElementById(m ? 'markerColor' : 'penColor').value;
            this.ctx.lineWidth = document.getElementById('brushSize').value;
            this.ctx.globalAlpha = m ? 0.4 : 1.0;
            this.ctx.moveTo(this.tempPoints[0].x, this.tempPoints[0].y);
            this.tempPoints.forEach(p => this.ctx.lineTo(p.x, p.y));
            this.ctx.stroke();
            this.ctx.restore();
        }
        const coordEl = document.getElementById('coords');
        if (coordEl) coordEl.innerText = `zoom: ${this.camera.zoom.toFixed(2)} | objects: ${this.drawables.length}`;
        requestAnimationFrame(() => this.render());
    }
}

const app = new MindCanvasApp();
