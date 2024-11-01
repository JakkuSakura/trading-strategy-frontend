export const convertNsToMs = (ns: number) => ns / 1000000
export const rewriteTimes = (
    objs: {
        receive_time?: number,
        transaction_time?: number,
        time?: number
    }[],
    offset: number = 0
) => {
    for (const obj of objs) {
        obj.transaction_time = obj.transaction_time ? convertNsToMs(obj.transaction_time) : undefined
        obj.receive_time = obj.receive_time ? convertNsToMs(obj.receive_time) : undefined
        if (offset) {
            obj.time = (obj.transaction_time ?? 0) + offset
        }
    }
    return objs
}
