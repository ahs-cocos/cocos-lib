export class CocosUser {
    id: number
    displayName: string
    email: string
    photoURL: string
    authSource: string
    roles: string
}

export class Roles {
    static readonly SUPER_ADMIN: string = 'super_admin'
}
