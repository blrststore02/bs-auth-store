
export const useGlobalStorage = () => {
    const storage = (typeof window !== 'undefined') && sessionStorage;

    const clearAll = () => {
        storage && storage.clear();
    }

    const getByKey = (key: string) => {
        return storage && storage.getItem(key);
    }

    const setByKey = (key: string, value: string) => {
        storage && storage.setItem(key, value);
    }

    const removeByKey = (key: string) => {
        storage && storage.removeItem(key);
    }
    
    return { clearAll, getByKey, setByKey, removeByKey };
}