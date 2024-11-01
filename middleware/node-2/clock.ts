export function isOwnClockAhead(ownClock: Record<string, number>, other: Record<string, number>): boolean {
    for (let key of Object.keys(other)) {
        if (other[key] > ownClock[key]) {
            return false;
        }
    }

    return true;
}

export function updateClock(ownClock: Record<string, number>, other: Record<string, number>): Record<string, number> {
    // Compare each pair in other
    for (let key of Object.keys(other)) {
        // If any has a greater value than own update own with 1 plus other
        if (other[key] > ownClock[key]) {
            ownClock[key] = other[key] + 1;
        }
    }

    return ownClock;
}