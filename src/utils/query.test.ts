import {getMaxMinQuery} from "./query"


describe("getMaxMinQuery", () => {
    it("when max and min is not defined", () => {
        const query = getMaxMinQuery("filed1")
        expect(query).toEqual({})
    })

    it("when only min defined", () => {
        const query = getMaxMinQuery("filed1", "1")
        expect(query).toEqual({
            filed1: {
                "$gt": 1
            }
        })
    })

    it("when only max defined", () => {
        const query = getMaxMinQuery("filed1", undefined, "1")
        expect(query).toEqual({
            filed1: {
                "$lt": 1
            }
        })
    })

    it("when both max and min defined", () => {
        const query = getMaxMinQuery("filed1", "10", "1")
        expect(query).toEqual({
            filed1: {
                "$gt": 10,
                "$lt": 1
            }
        })
    })
})