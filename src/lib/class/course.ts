//COURSE

export class Course {
    id: number
    uuid: string
    title: string
    description: string
    tags: string
    owner: number
    date_created: string
    date_modified: string
    last_modified_by: number
    outline: any[] = [{id: 1, title: 'First chapter'}]
}

//COURSE SHARING

export class CourseSharing {
    id: number
    course: number
    sharer: string
    roles: string
    status: string
    uuid: string
}

export class SharingStatus {
    static NEW: string = 'new'
    static PENDING: string = 'pending'
    static SHARED: string = 'shared'
}

export class SharingRoles {
    static EDITOR: string = "editor"
    static REVIEWER: string = "reviewer"
}

//COURSE PUBLISHING

export class Publication {
    id: number
    type: string = ''
    status: string = PublicationStatus.NEW
    course: number
    title: string = ''
    outline_ids: string = ''
    settings: string

    get outlineItems(){
        return this.outline_ids.split(',')
    }
}

export class PublicationType {
    static HTML: string = 'html'
    static PDF: string = 'pdf'
    static TYPES: string[] = [PublicationType.HTML, PublicationType.PDF]
}

export class PublicationStatus {
    static NEW: string = 'new'
    static CREATED: string = 'created'
    static PUBLISHED: string = 'published'
}

export class PublicationVersion {
    id: number
    uuid: string
    publication: number
    version: number
    published_by: string
    date: string
}