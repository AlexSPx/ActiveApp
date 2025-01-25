export interface Validated {
    updatedAt: Date
    isValid: boolean
}

export type ValidatedData<T> = Validated & {
    data: T
}