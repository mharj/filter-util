export enum FilterTypes {
	REQUIRED = 'REQUIRED',
	OPTIONAL = 'OPTIONAL',
	HIDDEN = 'HIDDEN',
	SET_UNDEFINED = 'SET_UNDEFINED',
	SET_NULL = 'SET_NULL',
}
export type FilterRequirementTypes<C> = {[P in keyof C]-?: FilterTypes};

const doFilterRequirementKeys = <T>(object: object, keys: FilterRequirementTypes<any>) => {
	const out = {};
	Object.keys(keys).forEach((k) => {
		const p = keys[k];
		if (p === FilterTypes.REQUIRED && !(k in object)) {
			throw new Error(`missing required key ${k}`);
		} else {
			if (k in object && p !== FilterTypes.HIDDEN) {
				switch (p) {
					case FilterTypes.SET_NULL:
						out[k] = null;
						break;
					case FilterTypes.SET_UNDEFINED:
						out[k] = undefined;
						break;
					default:
						out[k] = object[k];
				}
			}
		}
	});
	return out as T;
};

export const filterObject = <T>(object: object, keys: FilterRequirementTypes<any>): T => {
	return doFilterRequirementKeys<T>(object, keys);
};

export const filterObjectArray = <T>(objects: object[], keys: FilterRequirementTypes<any>): T[] => {
	const outArray: T[] = [];
	objects.forEach((object) => {
		outArray.push(filterObject<T>(object, keys));
	});
	return outArray as T[];
};
