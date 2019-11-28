export class FPSCounter {
    private calls: number[];

    constructor() {
        this.calls = [];
    }

    public call(): void {
        let now = Date.now();

        while (this.calls.length > 0 && this.calls[0] <= now - 1000) {
            this.calls.shift();
        }

        this.calls.push(now);
    }

    get FPS(): number {
        return this.calls.length;
    }
}