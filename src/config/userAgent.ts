export const device = navigator.userAgent;

export const isIOS = /iPad|iPhone|iPod/.test(device);

export const isAndroid = /Android/.test(device);

export const isMobileDevice = /iPhone|Android/.test(device);
