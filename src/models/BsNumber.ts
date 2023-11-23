export type BsNumber = {
    id: number,
    randomNumber: number,
    numberInsertionDate: string
}

export type BsNumbers = {
    results: BsNumber[],
    totalcount: number
}