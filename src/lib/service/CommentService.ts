import {ApplicationPath} from "../config/path";
import axios from 'axios'
import _ from 'lodash'
import {Comment} from "../class/comment";
import {Course} from "../class/course";


export class CommentService {

    private readonly COMMENT_TABLE: string = 'comment'

    initialized: boolean = false
    comments: Comment[]
    latestCommentId: number = 0
    latestCommentDate: string = ''
    apiUrl: string
    apiKey: string

    constructor() {
        this.apiUrl = ApplicationPath.API_BASE_URL
        this.apiKey = ApplicationPath.API_KEY
        this.comments = []
    }


    //====================================================================================
    //====================================================================================
    //                           COMMENT
    //====================================================================================
    //====================================================================================

    getComments(course: Course) {

        let me = this

        return new Promise(function (resolve, reject) {

            //let url = `${me.apiUrl}${me.COMMENT_TABLE}?filter[]=course,eq,${course.id}&filter[]=id,gt,${me.latestCommentId}&token=${me.apiKey}&transform=1`
            let url = `${me.apiUrl}${me.COMMENT_TABLE}?filter[]=course,eq,${course.id}&filter[]=date,gt,${me.latestCommentDate}&token=${me.apiKey}&transform=1`
            axios.get(url)
                .then(response => {
                    const rawComments = response.data[me.COMMENT_TABLE]
                    if (rawComments.length === 0) {
                        resolve(null)
                        return
                    }

                    console.log('URL', url)
                    console.log('RC', response)

                    const maxComment = _.maxBy(rawComments, 'date')
                    if (maxComment) me.latestCommentDate = maxComment.date

                    me.comments = _.orderBy([...me.comments, ...rawComments], ['date'], ['desc'])

                    resolve(me.comments)
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })

        })
    }

    updateComment(comment: Comment) {

        let me = this

        return new Promise((resolve, reject) => {
                let url = `${me.apiUrl}${me.COMMENT_TABLE}/${comment.id}?&token=${me.apiKey}&transform=1`;
                axios.put(url, comment)
                    .then(() => {
                        //remap the course
                        console.log('Comment updated')
                        resolve('ok')
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    createComment(comment: Comment) {

        let me = this
        return new Promise((resolve, reject) => {
                let url = `${me.apiUrl}${me.COMMENT_TABLE}/?token=${me.apiKey}&transform=1`
                axios.post(url, comment)
                    .then(response => {
                        comment.id = response.data;
                        resolve(comment)
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }

    deleteComment(comment: Comment) {

        let me = this

        //TODO: url wijzigen naar courseapi

        return new Promise((resolve, reject) => {
                const url = `${me.apiUrl}${me.COMMENT_TABLE}/${comment.id}?token=${me.apiKey}&transform=1`

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
