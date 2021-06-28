export const updateObjectInArray = (item: Array<object>, itemId: number, objPropName: string, newObjProps: object) => {
    return item.map((u: any) => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}