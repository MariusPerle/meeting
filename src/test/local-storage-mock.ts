export class LocalStorageMock {
    store: { [key: string]: string } = {};

    getItem(key: string) {
        return this.store[key] || null;
    }

    setItem(key: string, value: string) {
        this.store[key] = value.toString();
    }

    removeItem(key: string) {
        delete this.store[key];
    }

    clear() {
        this.store = {};
    }
}

export function mockLocalStorage() {
    Object.defineProperty(window, 'localStorage', {
        value: new LocalStorageMock(),
    });
}
