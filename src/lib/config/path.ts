

export class ApplicationPath {


    static host: string = "https://www.arteveldehogeschool.be/cocos/"
    //static host: string = "https://ahs-prod-web-cocos.azurewebsites.net/"

    //ROOTS
    static editorRoot: string = ApplicationPath.host + "editor/"
    static viewerRoot: string = ApplicationPath.host + "viewer/"
    static serverRoot: string = ApplicationPath.host + "server/"

    //DATA ROOTS
    static contentBlockDataRoot: string = ApplicationPath.serverRoot + "contentBlockData/"
    static versionDataRoot: string = ApplicationPath.serverRoot + "versionData/"

    //CRUD
    static API_KEY: string = "qwertyuiopasdfghjklzxcvbnm"
    static API_BASE_URL: string = ApplicationPath.serverRoot + "api/v1/"
    static API_BASE_URL_V2: string = ApplicationPath.serverRoot + "api/v2/records/"

    //API
    static FILE_API: string = ApplicationPath.serverRoot + "fileapi/"
    static COURSE_API: string = ApplicationPath.serverRoot + "courseapi/"
    static PUBLISH_PREVIEW: string = ApplicationPath.serverRoot + "publishPreview.php"

    //CK
    static ck_php_connector: string = ApplicationPath.serverRoot + "ckfinder/core/connector/php/connector.php"

    static assetsFolder: string = ApplicationPath.serverRoot + "assets/"
}

export class AppId {
    static facebook: string = "479653729327887"
    static google: string = ""
    static linkedin: string = ""
}
