export const setItemsIntoLocalStorage = (
    key: string,
    value: string | unknown,
    isJson: boolean = false
) => {
    if (isJson) return localStorage.setItem(key, JSON.stringify(value));
    return localStorage.setItem(key, value as string);
};

export const getItemsFromLocalStorage = (
    key: string,
    isJson: boolean = false
) => {
    const item = localStorage.getItem(key);
    if (item) {
        if (isJson) return JSON.parse(item)
        return item;
    }
    return null;
};

export const removeItemsFromLocalStorage = (key: string) => {
    const item = localStorage.getItem(key);
    if (item) return localStorage.removeItem(key);
};
