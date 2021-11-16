import {Course} from "../class/course";

export class CourseUtil {

    static getFlatCourseOutline = (course: Course) => {

        const flatList = []

        const walkChildren = (parent, walkChildren) => {
            for (const child of parent) {
                flatList.push(child.id)
                if (child.children) {
                    walkChildren(child.children, walkChildren)
                }
            }
        }

        walkChildren(course.outline, walkChildren)

        return flatList
    }
}