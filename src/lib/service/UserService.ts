import {ApplicationPath} from "../config/path";
import {ContentBlock} from "../class/contentBlock";
import axios from 'axios'
import _ from 'lodash'
import {Course} from "../class/course";


export class CourseService {

    private readonly COURSE_TABLE: string = 'course'

    initialized: boolean = false
    courses: Course[]
    courseLookup: object
    apiUrl: string
    apiKey: string
    courseSearchStringLookup: object = {}

    constructor() {
        this.apiUrl = ApplicationPath.API_BASE_URL
        this.apiKey = ApplicationPath.API_KEY
        this.courses = []
        this.courseLookup = {}
    }

    private getCourses() {

        let me = this

        return new Promise(function (resolve, reject) {
            let url = `${me.apiUrl}${me.COURSE_TABLE}?transform=1&token=${me.apiKey}`

            axios.get(url)
                .then(response => {
                    let courses = response.data[me.COURSE_TABLE]
                    courses = _.orderBy(courses, ['title'])
                    let courseLookup = _.keyBy(courses, course => course.id)
                    resolve({courses, courseLookup})
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })

        })
    }

    updateCourse(course: Course) {

        let me = this

        return new Promise((resolve, reject) => {
                let url = `${me.apiUrl}${me.COURSE_TABLE}/${course.id}?&token=${me.apiKey}`;
                axios.put(url, course)
                    .then(() => {
                        //remap the course
                        me.courses = me.courses.map(c => {
                            if (c.id === course.id)
                                return course;
                            return c;
                        })
                        me.courseLookup = _.keyBy(me.courses, course => course.id)
                        resolve({courses: me.courses, courseLookup: me.courseLookup, course})
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    createCourse(course: Course) {

        let me = this
        return new Promise((resolve, reject) => {
                let url = `${me.apiUrl}${me.COURSE_TABLE}/?token=${me.apiKey}`
                axios.post(url, course)
                    .then(response => {
                        course.id = response.data;
                        me.courses = _.concat(me.courses, course)
                        me.courses = _.orderBy(me.courses, ['course'])
                        me.courseLookup = _.keyBy(me.courses, course => course.quoteId)
                        resolve({courseLookup: me.courseLookup, courses: me.courses, course})
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    deleteCourse(course: Course) {

        let me = this

        return new Promise((resolve, reject) => {
                const url = `${me.apiUrl}${me.COURSE_TABLE}/${course.id}?token=${me.apiKey}`

                axios.delete(url)
                    .then(() => {

                        //remove from courses and lookup
                        me.courses = _.filter(me.courses, c => c.id !== course.id)
                        me.courseLookup = _.keyBy(me.courses, course => course.id)

                        resolve({courses: me.courses, courseLookup: me.courseLookup})
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }



    generateQuoteSearchStringLookup = () => {

        _.each(this.courses, course => {
            this.courseSearchStringLookup[course.id] = (
                course.title).toLowerCase()
        })
    }



    private getContentBlockData(contentBlock: ContentBlock) {

        let me = this

        return new Promise(function (resolve, reject) {
            let url = `${ApplicationPath.FILE_API}getContentBlockData?id=${contentBlock.id}`
            console.log('URL', url)
            axios.get(url)
                .then(response => {
                    resolve(response.data)
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })

        })
    }
}
