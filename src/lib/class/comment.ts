export class Comment {
    id: number
    author: number
    author_display_name: string
    author_photo_url: string
    date: string
    course: number
    context: string
    contextDetail: string
    consumerContextId: string
    outline: number
    comment: string
    thumbs: string
}

export class CommentContext {
    static EDITOR: string = 'editor'
    static VIEWER: string = 'viewer'
}