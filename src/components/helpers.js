 export function toEnUsLocaleString(num) {
    return new Date(num).toLocaleString('en-US');
}

export function toBytesString(bytes) {
    if (bytes < 1024) {
        return `${Math.round(bytes)} B`;
    } else {
        bytes/=1024;
        if (bytes < 1024) {
            return `${Math.round(bytes)} KB`;
        } else {
            bytes/=1024;
            if (bytes < 1024) {
                return `${Math.round(bytes)} MB`;
            } else {

            }
        }
    }
}