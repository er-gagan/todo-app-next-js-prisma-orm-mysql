export const showLoader = () => {
    const loader = document.getElementById('globalLoader');
    if (loader) {
        loader.style.display = "block"
    }
}

export const hideLoader = () => {
    const loader = document.getElementById('globalLoader');
    if (loader) {
        loader.style.display = "none"
    }
}

export const handleNavigation = ({ path, router }: { path: string, router: any }) => {
    if (location.pathname !== path) {
        showLoader()
    }
    router.push(path)
}

// Debounce function
export function debounce(fn: (...args: any[]) => void, delay: number): (...args: any[]) => void {
    let timeoutId: NodeJS.Timeout | null = null;
    return function (...args: any[]) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}