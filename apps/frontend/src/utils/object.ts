export const objectHasKey = (obj: Object, key: string | number) => {
	return Object.prototype.hasOwnProperty.call(obj, key);
};

export const isEmptyObject = (obj: Object): boolean => {
	return Object.keys(obj).length === 0;
};
