# filter-util

Filter Utility

```javascript
export interface IApiUser {
    readonly _id?: string;
    email: string;
    passwordHash?: string;
}

export const ApiUserFilter: FilterRequirementTypes<IApiUser> = {
    _id: FilterTypes.OPTIONAL,
    email: FilterTypes.REQUIRED,
    passwordHash: FilterTypes.HIDDEN, // filter to remove this from object
};

const params = filterObject<IApiUser>(req.body, ApiUserFilter);
```
