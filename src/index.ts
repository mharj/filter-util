export enum FilterTypes {
	REQUIRED = 'REQUIRED',
	OPTIONAL = 'OPTIONAL',
	HIDDEN = 'HIDDEN',
	SET_UNDEFINED = 'SET_UNDEFINED',
	SET_NULL = 'SET_NULL',
}
export type FilterRequirementTypes<C> = {[P in keyof C]-?: FilterTypes};
/**
 * Conversion function
 * @param object to filter
 * @param filter object which describes what to do with values in object
 * @return typed object based on interface
 * @throws Error if FilterTypes.REQUIRED key is missing
 */
const doFilterRequirementKeys = <T>(object: object, filter: FilterRequirementTypes<any>) => {
	const out = {};
	Object.keys(filter).forEach((k) => {
		const p = filter[k];
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

/**
 * Filter object or objects
 * @param object to filter
 * @param filter object which describes what to do with values in object
 * @return typed object or object array based on interface
 */
export const filterObject = <T extends object | object[]>(object: object | object[], filter: FilterRequirementTypes<any>): T => {
	if (Array.isArray(object)) {
		const outArray: any[] = [];
		object.forEach((o) => {
			outArray.push(filterObject(o, filter));
		});
		return outArray as T;
	} else {
		return doFilterRequirementKeys<T>(object, filter);
	}
};

/**
 * Filter objects
 * @param object to filter
 * @param filter object which describes what to do with values in object
 * @return typed object array based on interface
 */
export const filterObjectArray = <T extends object>(objects: object[], keys: FilterRequirementTypes<any>): T[] => {
	const outArray: T[] = [];
	objects.forEach((object) => {
		outArray.push(filterObject<T>(object, keys));
	});
	return outArray as T[];
};
