export class ContentBlock {
    id: number
    type: string
    date_created: string
    date_modified: string
    created_by: number
    modified_by: number
    course: number
    outline: number
    sort: number = 10000
}

export class ContentBlockType {
    static RICH_TEXT: string = 'richText'
    static H5P: string = 'h5p'
    static SLIDE: string = 'slide'
}