import {CocosUser, Roles} from "./user";


export class PrivilegeManager {

    loginUser

    constructor() {
    }

    setLoginUser = (cocosUser) => {
        this.loginUser = cocosUser
    }


    isSuperAdmin = (cocosUser = null) => {
        if (cocosUser) return this.userHasRole(cocosUser, Roles.SUPER_ADMIN)
        if (this.loginUser) return this.userHasRole(this.loginUser, Roles.SUPER_ADMIN)
        return false
    }

    userHasRole = (cocosUser: CocosUser, role: string) => {
        const roles = cocosUser.roles ? cocosUser.roles.split(',') : []

        return roles.indexOf(role) > -1
    }

    /*isAdmin = (adaUser = null, evaluateAdminEnabled = true) => {
        if (evaluateAdminEnabled && !this.adminEnabled) return false
        if (this.isSuperAdmin(adaUser, evaluateAdminEnabled)) return true
        if (this.adaUser) return this.adaUser.roles.indexOf('admin') > -1
        return false
    }*/

    /*adminRole = () => {
        if (this.isSuperAdmin(null, false)) return 'Super admin'
        if (this.isAdmin(null, false)) return 'Admin'
        return null
    }*/

    //===================================================================================
    //===================================================================================
    //===================================================================================
    //===================================================================================

    loggedIn = () => {
        return !!this.loginUser
    }
}
