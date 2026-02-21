const REQUEST_LIMIT = 5;
const WINDOW_MS = 60_000;

const rateLimitStore = new Map<string, number[]>();

export function getClientKey(req: Request): string {
    const forwardedFor = req.headers.get('x-forwarded-for');
    if (forwardedFor) return forwardedFor.split(',')[0]?.trim() ?? 'unknown';

    return req.headers.get('x-real-ip') ?? 'unknown';
}

export function isRateLimited(clientKey: string): boolean {
    const now = Date.now();
    const existing = rateLimitStore.get(clientKey) ?? [];
    const inWindow = existing.filter((time) => now - time < WINDOW_MS);

    if (inWindow.length >= REQUEST_LIMIT) {
        rateLimitStore.set(clientKey, inWindow);
        return true;
    }

    inWindow.push(now);
    rateLimitStore.set(clientKey, inWindow);
    return false;
}
