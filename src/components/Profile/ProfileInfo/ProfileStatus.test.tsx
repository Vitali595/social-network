import {create} from "react-test-renderer";
import {ProfileStatus} from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status={"it-incubator.com"} updateStatus={() => {}}/>)
        const instance = component.getInstance()
        // expect(instance.state.status).toBe("it-incubator.com")
    })
    test("after creation <input> should be displayed", () => {
        const component = create(<ProfileStatus status={"it-incubator.com"} updateStatus={() => {}}/>)
        const root = component.root
        expect(() => {
            const input = root.findByType("input")
        }).toThrow()
    })
    test("after creation <span> shouldn't be displayed", () => {
        const component = create(<ProfileStatus status={"it-incubator.com"} updateStatus={() => {}}/>)
        const root = component.root
        const span = root.findByType("span")
        expect(span.children.length).toBe(1)
        expect(span).not.toBeNull()
    })
    test("after creation <span> should contains correct status", () => {
        const component = create(<ProfileStatus status={"it-incubator.com"} updateStatus={() => {}}/>)
        const root = component.root
        const span = root.findByType("span")
        expect(span.children[0]).toBe("it-incubator.com")
    })
})