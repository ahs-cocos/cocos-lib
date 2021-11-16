import {ApplicationPath} from "../config/path";
import {ContentBlock} from "../class/contentBlock";
import axios from 'axios'
import _ from 'lodash'
import {Course, Publication, PublicationVersion, CourseSharing} from "../class/course";
import {CocosUser} from "../class/user";
import {LtiConsumerCourseLink} from "../class/lti";


export class CourseService {

    private readonly COURSE_TABLE: string = 'course'
    private readonly COURSE_SHARING_TABLE: string = 'courseSharing'
    private readonly PUBLICATION_TABLE: string = 'publication'
    private readonly PUBLICATION_VERSION_TABLE: string = 'publicationVersion'
    private readonly CONTENT_BLOCK_TABLE: string = 'contentBlock'
    private readonly LTI_CONSUMER_COURSE_LINK_TABLE: string = 'ltiConsumerCourseLink'

    initialized: boolean = false
    courses: Course[]
    ownedCourses: Course[]
    sharedCourses: Course[]
    courseLookup: object
    apiUrl: string
    apiUrlV2: string

    apiKey: string
    courseSearchStringLookup: object = {}

    constructor() {
        this.apiUrl = ApplicationPath.API_BASE_URL
        this.apiUrlV2 = ApplicationPath.API_BASE_URL_V2
        this.apiKey = ApplicationPath.API_KEY
        this.courses = []
        this.courseLookup = {}
    }


    //====================================================================================
    //====================================================================================
    //                           COURSE
    //====================================================================================
    //====================================================================================

    getCourses(user: CocosUser) {

        return new Promise(function (resolve, reject) {

            let url = `${ApplicationPath.COURSE_API}getCourses?ownerId=${user.id}`
            console.log('URL', url)
            axios.get(url)
                .then(response => {
                    resolve({
                        ownedCourses: _.orderBy(response.data.ownedCourses, 'title'),
                        sharedCourses: _.orderBy(response.data.sharedCourses, 'title'),
                    })
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })
        })
    }

    getAllCourses = (page: number = 1, itemsPerPage: number = 20, filter) => {
        return new Promise((resolve, reject) => {

            let url = `${this.apiUrlV2}${this.COURSE_TABLE}/?order=title,asc&page=${page},${itemsPerPage}&token=${this.apiKey}&transform=1`

            if (filter) url += filter
            axios.get(url)
                .then(response => {
                    let courses = response.data
                    resolve(courses)
                })
                .catch(error => {
                    console.error('GET ALL COURSES ERROR', error)
                    reject(error)
                })
        })
    }

    getCourseByUuid = (uuid: string) => {
        let me = this

        return new Promise(function (resolve, reject) {

            const url = `${me.apiUrl}${me.COURSE_TABLE}?filter[]=uuid,eq,${uuid}&token=${me.apiKey}&transform=1`
            axios.get(url)
                .then(response => {
                    resolve(response.data[me.COURSE_TABLE])
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
                let url = `${me.apiUrl}${me.COURSE_TABLE}/${course.id}?&token=${me.apiKey}&transform=1`;
                axios.put(url, course)
                    .then(() => {
                        //remap the course
                        console.log('Course updated')
                        resolve('ok')
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
                let url = `${me.apiUrl}${me.COURSE_TABLE}/?token=${me.apiKey}&transform=1`
                axios.post(url, course)
                    .then(response => {
                        course.id = response.data;
                        console.log('RESP', response.data)
                        resolve(course)
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

        //TODO: url wijzigen naar courseapi

        return new Promise((resolve, reject) => {
                const url = `${me.apiUrl}${me.COURSE_TABLE}/${course.id}?token=${me.apiKey}&transform=1`

                axios.delete(url)
                    .then(() => {

                        resolve('ok')
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


    //====================================================================================
    //====================================================================================
    //                           SHARING
    //====================================================================================
    //====================================================================================

    getCourseSharing = (course: Course) => {

        let me = this

        return new Promise(function (resolve, reject) {

            const url = `${me.apiUrl}${me.COURSE_SHARING_TABLE}?filter[]=course,eq,${course.id}&token=${me.apiKey}&transform=1`
            axios.get(url)
                .then(response => {
                    resolve(response.data[me.COURSE_SHARING_TABLE])
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })

        })
    }


    updateSharing = (sharing: CourseSharing) => {

        let me = this

        return new Promise((resolve, reject) => {
                let url = `${me.apiUrl}${me.COURSE_SHARING_TABLE}/${sharing.id}?&token=${me.apiKey}&transform=1`;
                axios.put(url, sharing)
                    .then(() => {
                        //remap the course
                        console.log('Sharing updated')
                        resolve('ok')
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    createSharing = (sharing: CourseSharing) => {

        let me = this
        return new Promise((resolve, reject) => {
                let url = `${me.apiUrl}${me.COURSE_SHARING_TABLE}/?token=${me.apiKey}&transform=1`
                axios.post(url, sharing)
                    .then(response => {
                        sharing.id = response.data
                        resolve(sharing)
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    deleteSharing = (sharing: CourseSharing) => {

        let me = this

        return new Promise((resolve, reject) => {
                const url = `${me.apiUrl}${me.COURSE_SHARING_TABLE}/${sharing.id}?token=${me.apiKey}&transform=1`

                axios.delete(url)
                    .then(() => {

                        resolve('ok')
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    //====================================================================================
    //====================================================================================
    //                           PUBLICATIONS
    //====================================================================================
    //====================================================================================

    getPublications = (course: Course) => {

        let me = this

        return new Promise(function (resolve, reject) {

            const url = `${me.apiUrl}${me.PUBLICATION_TABLE}?filter[]=course,eq,${course.id}&token=${me.apiKey}&transform=1`
            axios.get(url)
                .then(response => {
                    resolve(response.data[me.PUBLICATION_TABLE])
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })

        })
    }

    getPublicationById = (id: number) => {
        let me = this

        return new Promise(function (resolve, reject) {

            const url = `${me.apiUrl}${me.PUBLICATION_TABLE}/${id}?token=${me.apiKey}&transform=1`


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


    updatePublication = (publication: Publication) => {

        let me = this

        return new Promise((resolve, reject) => {
                let url = `${me.apiUrl}${me.PUBLICATION_TABLE}/${publication.id}?&token=${me.apiKey}&transform=1`;
                axios.put(url, publication)
                    .then(() => {
                        console.log('Publication updated')
                        resolve('ok')
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    createPublication = (publication: Publication) => {

        let me = this
        return new Promise((resolve, reject) => {
                let url = `${me.apiUrl}${me.PUBLICATION_TABLE}/?token=${me.apiKey}&transform=1`
                axios.post(url, publication)
                    .then(response => {
                        publication.id = response.data
                        resolve(publication)
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    deletePublication = (publication: Publication) => {

        let me = this

        return new Promise((resolve, reject) => {
                const url = `${me.apiUrl}${me.PUBLICATION_TABLE}/${publication.id}?token=${me.apiKey}&transform=1`

                axios.delete(url)
                    .then(() => {

                        resolve('ok')
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    //====================================================================================
    //====================================================================================
    //                           VERSIONS
    //====================================================================================
    //====================================================================================

    getPublicationVersions = (publication: Publication) => {

        let me = this

        return new Promise(function (resolve, reject) {

            const url = `${me.apiUrl}${me.PUBLICATION_VERSION_TABLE}?filter[]=publication,eq,${publication.id}&token=${me.apiKey}&transform=1`
            axios.get(url)
                .then(response => {

                    resolve(response.data[me.PUBLICATION_VERSION_TABLE])
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })

        })
    }

    getPublicationVersionByUuid = (uuid: string) => {
        let me = this

        return new Promise(function (resolve, reject) {

            const url = `${me.apiUrl}${me.PUBLICATION_VERSION_TABLE}?filter[]=uuid,eq,${uuid}&token=${me.apiKey}&transform=1`
            axios.get(url)
                .then(response => {
                    resolve(response.data[me.PUBLICATION_VERSION_TABLE])
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })

        })
    }


    updatePublicationVersion = (publicationVersion: PublicationVersion) => {

        let me = this

        return new Promise((resolve, reject) => {
                let url = `${me.apiUrl}${me.PUBLICATION_VERSION_TABLE}/${publicationVersion.id}?&token=${me.apiKey}&transform=1`;
                axios.put(url, publicationVersion)
                    .then(() => {
                        console.log('PublicationVersion updated')
                        resolve('ok')
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    createPublicationVersion = (publicationVersion: PublicationVersion) => {

        let me = this
        return new Promise((resolve, reject) => {
                let url = `${me.apiUrl}${me.PUBLICATION_VERSION_TABLE}/?token=${me.apiKey}&transform=1`
                axios.post(url, publicationVersion)
                    .then(response => {
                        publicationVersion.id = response.data

                        //now create the html
                        me.publishVersion(publicationVersion).then(res => {
                            resolve(publicationVersion)
                        }).catch(error => {
                            console.log('ERROR ON FILE API, Resolving version')
                            resolve(publicationVersion)
                        })

                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    deletePublicationVersion = (publicationVersion: PublicationVersion) => {

        let me = this

        return new Promise((resolve, reject) => {
                const url = `${me.apiUrl}${me.PUBLICATION_VERSION_TABLE}/${publicationVersion.id}?token=${me.apiKey}&transform=1`

                axios.delete(url)
                    .then(() => {

                        resolve('ok')
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    publishVersion = (version) => {

        //don't call this directly. This function is triggered by createPublicationVersion

        return new Promise(function (resolve, reject) {
            let url = `${ApplicationPath.FILE_API}publishVersion/`
            axios.post(url, version)
                .then(response => {
                    resolve(response.data)
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })

        })
    }

    getPreviewData = (version) => {

        return new Promise(function (resolve, reject) {
            let url = `${ApplicationPath.versionDataRoot}${version.uuid}.cocos`
            axios.post(url, version)
                .then(response => {
                    resolve(response.data)
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })

        })
    }


    //====================================================================================
    //====================================================================================
    //                           CONTENT BLOCKS
    //====================================================================================
    //====================================================================================

    getContentBlocks = (course: Course, outlineId: number) => {

        let me = this

        return new Promise(function (resolve, reject) {

            let url = `${me.apiUrl}${me.CONTENT_BLOCK_TABLE}?filter[]=course,eq,${course.id}&filter[]=outline,eq,${outlineId}&token=${me.apiKey}&transform=1`;
            axios.get(url)
                .then(response => {
                    resolve(response.data[me.CONTENT_BLOCK_TABLE])
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })

        })
    }

    updateContentBlock = (contentBlock: ContentBlock) => {

        let me = this

        return new Promise((resolve, reject) => {
                let url = `${me.apiUrl}${me.CONTENT_BLOCK_TABLE}/${contentBlock.id}?&token=${me.apiKey}&transform=1`;
                axios.put(url, contentBlock)
                    .then(() => {
                        resolve('ok')
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    swapContentBlockSorts = (cb1: ContentBlock, cb2: ContentBlock) => {
        let me = this

        const cb1Sort = cb1.sort
        cb1.sort = cb2.sort
        cb2.sort = cb1Sort

        return new Promise((resolve, reject) => {
                Promise.all([me.updateContentBlock(cb1), me.updateContentBlock(cb2)]).then((res) => resolve(res))
            }
        )
    }

    createContentBlock = (contentBlock: ContentBlock) => {

        let me = this

        return new Promise((resolve, reject) => {
                let url = `${me.apiUrl}${me.CONTENT_BLOCK_TABLE}/?token=${me.apiKey}&transform=1`
                axios.post(url, contentBlock)
                    .then(response => {
                        contentBlock.id = response.data;
                        resolve(contentBlock)
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    deleteContentBlock = (contentBlock: ContentBlock) => {

        let me = this

        //TODO: delete contentBlockData

        return new Promise((resolve, reject) => {
                const url = `${me.apiUrl}${me.CONTENT_BLOCK_TABLE}/${contentBlock.id}?token=${me.apiKey}&transform=1`

                axios.delete(url)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    //====================================================================================
    //====================================================================================
    //                           CONTENT BLOCK DATA
    //====================================================================================
    //====================================================================================

    private getContentBlockData(contentBlock: ContentBlock) {

        return new Promise(function (resolve, reject) {
            let url = `${ApplicationPath.FILE_API}getContentBlockData?id=${contentBlock.id}`
            axios.get(url)
                .then(response => {
                    if (!response.data) {
                        resolve('')
                    } else {
                        resolve(response.data)
                    }
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })

        })
    }

    private saveContentBlockData(contentBlock: ContentBlock, data: any) {

        const formData = {
            id: contentBlock.id,
            contentBlockData: data
        }

        return new Promise(function (resolve, reject) {
            let url = `${ApplicationPath.FILE_API}saveContentBlockData/`
            console.log('SAVE CONTENT BLOCK DATA', url, formData)
            axios.post(url, formData)
                .then(response => {
                    console.log('SAVE CONTENT BLOCK DATA RESULT', response.data)
                    resolve(response.data)
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })

        })
    }

    //====================================================================================
    //====================================================================================
    //                           LTI CONSUMER COURSE LINK
    //====================================================================================
    //====================================================================================

    getLtiConsumerCourseLink = (consumer: string, consumerContextId: string) => {

        let me = this

        return new Promise(function (resolve, reject) {

            const url = `${me.apiUrl}${me.LTI_CONSUMER_COURSE_LINK_TABLE}?filter[]=consumer,eq,${consumer}&filter[]=consumerContextId,eq,${consumerContextId}&token=${me.apiKey}&transform=1`

            console.log('URL', url, consumer, consumerContextId)

            axios.get(url)
                .then(response => {
                    console.log('RESPONSE', response)
                    const links = response.data[me.LTI_CONSUMER_COURSE_LINK_TABLE]
                    if (!links || links.length === 0) resolve(null)
                    resolve(links[0])
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })

        })
    }


    updateLtiConsumerCourseLink = (ltiConsumerCourseLink: LtiConsumerCourseLink) => {

        let me = this

        return new Promise((resolve, reject) => {
                let url = `${me.apiUrl}${me.LTI_CONSUMER_COURSE_LINK_TABLE}/${ltiConsumerCourseLink.id}?&token=${me.apiKey}&transform=1`;
                axios.put(url, ltiConsumerCourseLink)
                    .then(() => {
                        //remap the course
                        console.log('Link updated')
                        resolve('ok')
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    createLtiConsumerCourseLink = (ltiConsumerCourseLink: LtiConsumerCourseLink) => {

        let me = this
        return new Promise((resolve, reject) => {
                let url = `${me.apiUrl}${me.LTI_CONSUMER_COURSE_LINK_TABLE}/?token=${me.apiKey}&transform=1`
                axios.post(url, ltiConsumerCourseLink)
                    .then(response => {
                        ltiConsumerCourseLink.id = response.data
                        resolve(ltiConsumerCourseLink)
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    deleteLtiConsumerCourseLink = (ltiConsumerCourseLink: LtiConsumerCourseLink) => {

        let me = this

        return new Promise((resolve, reject) => {
                const url = `${me.apiUrl}${me.LTI_CONSUMER_COURSE_LINK_TABLE}/${ltiConsumerCourseLink.id}?token=${me.apiKey}&transform=1`

                axios.delete(url)
                    .then(() => {

                        resolve('ok')
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }
}
