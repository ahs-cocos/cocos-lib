export const API_KEY: string = "qwertyuiopasdfghjklzxcvbnm"
export const API_BASE_URL: string = "https://www.arteveldehogeschool.be/mediatheken/api/v1/"
export const API_ROOSTERING_BASE_URL: string = "https://www.arteveldehogeschool.be/mediatheken/api/roostering/v1/"
export const UPLOAD_URL: string = '//www.arteveldehogeschool.be/mediatheken/root/boUpload.php'
export const SLIM_UPLOAD_URL: string = '//www.arteveldehogeschool.be/mediatheken/root/slim/async.php'
export const BIJLAGEN_FOLDER_URL: string = 'https://www.arteveldehogeschool.be/mediatheken/root/bijlagen/'
export const NIEUWS_IMAGES_FOLDER: string = 'https://www.arteveldehogeschool.be/mediatheken/root/nieuwsImages/'
export const ENGLISH_CONTACT_URL: string = "http://www.arteveldeuniversitycollege.be/discover-us/campuses";


export class ApplicationPath {

    static fArr = window.location.pathname.split("/")

    static devMode = window.location.hostname === 'localhost' ? 'dev' :
        window.location.pathname === '/' ? 'dev' : window.location.pathname.split("/")[2] //ApplicationPath.fArr.indexOf('live') > -1 ? 'live' : 'dev'

    static host: string = "https://www.arteveldehogeschool.be/"
    //static host: string = "http://ahs-prod-web-mediatheken.azurewebsites.net/"
    static mediatheekHost: string = ApplicationPath.host + "mediatheken/"
    static mediatheekRoot: string = ApplicationPath.mediatheekHost + "root/"
    static mediatheekWebsiteRoot: string = ApplicationPath.mediatheekHost + ApplicationPath.devMode + "/"
    static releaseJson: string = ApplicationPath.mediatheekWebsiteRoot + "package.json"

    static linkWebportaal: string = ApplicationPath.mediatheekHost + 'live/ws'
    static linkBackoffice: string = ApplicationPath.mediatheekHost + 'bo2'
    static linkStageverslagen: string = ApplicationPath.mediatheekHost + 'stageverslagen'
    static linkReserveer: string = ApplicationPath.mediatheekHost + 'reserveer'

    static reserveerUrl: string = ApplicationPath.mediatheekHost + "reserveer"
    static openingsurenApiUrl: string = ApplicationPath.mediatheekHost + "lib/openingsuren/api.php"
    static socialApiUrl: string = ApplicationPath.mediatheekHost + "lib/social/"
    static pdfFolder: string = ApplicationPath.mediatheekHost + "pdf/"
    static mediatheekApiUrl: string = ApplicationPath.mediatheekWebsiteRoot + "mediatheek/api.php"
    static mediatheekApiDanyUrl: string
    static mediatheekMapUrl: string
    static quoteApiUrl: string = ApplicationPath.mediatheekWebsiteRoot + "quote/getQuote.php"
    static searchApiUrl: string = ApplicationPath.mediatheekWebsiteRoot + "search/searchApi.php"
    static rangeCheckUrl: string = ApplicationPath.mediatheekWebsiteRoot + "isWithinRange.php"
    static nieuwsApiUrl: string = ApplicationPath.mediatheekWebsiteRoot + "news/getNews.php"
    static urgentNewsApiUrl: string = ApplicationPath.mediatheekWebsiteRoot + "news/getUrgentNews.php"
    static faqApiUrl: string = ApplicationPath.mediatheekWebsiteRoot + "faq/api.php"
    static userApiUrl: string = ApplicationPath.mediatheekWebsiteRoot + "user/api.php"
    static userApiTempUrl: string = ApplicationPath.mediatheekWebsiteRoot + "user/api.php"
    static stageverslagenApiUrl: string = ApplicationPath.mediatheekWebsiteRoot + "stageverslagen/api.php"
    static localeApiUrl: string = ApplicationPath.mediatheekWebsiteRoot + "locale/localeApi.php"
    static localeFilesFolder: string = ApplicationPath.mediatheekWebsiteRoot + "be/arteveldehs/domain/locale/locale/"
    static avatarApi: string = ApplicationPath.mediatheekWebsiteRoot + "foto/foto.php?size=XXS&user="

    static spelwijzerFotosRootFolder: string = ApplicationPath.mediatheekRoot + "spelwijzerFotos/"
    static noImageLink: string = ApplicationPath.spelwijzerFotosRootFolder + "_70/no_image.jpg"
    static googleBooksApiUrl: string = ApplicationPath.mediatheekWebsiteRoot + "cover/cover.php"
    static nieuwsImagesRootFolder: string = ApplicationPath.mediatheekRoot + "nieuwsImages/"
    static mediatheekSvgMapsFolder: string = ApplicationPath.mediatheekWebsiteRoot + "be/arteveldehs/mediatheek/maps/svg/"
    static profielFotosRootFolder: string = ApplicationPath.mediatheekRoot + "profielFotos/"
    static mediatheekAssetsFolder: string = ApplicationPath.mediatheekRoot + "mediatheek-assets/"

    //bo-server
    static boServerZoekService: string = ApplicationPath.mediatheekHost + "bo-server/service/zoekService.php"

    static librarythingDeveloperKey: string = "27bcca6afc71a1a464fa5690cd59fd09"
    static librarythingApiUrl: string = "http://covers.librarything.com/devkey/" + ApplicationPath.librarythingDeveloperKey + "/medium/isbn/"

    static vimeo_knt: string = "116854342"
    static vimeo_kat: string = "116854341"
    static vimeo_mar: string = "99020515"
    static vimeo_sab: string = ""
    static vimeo_sap: string = "117289129"

    static pinterest_knt: string = "//www.pinterest.com/medkantienberg/"
    static pinterest_kat: string = "//www.pinterest.com/medkattenberg/boards/ "
    static pinterest_mar: string = "//www.pinterest.com/medmariakerke/"
    static pinterest_sab: string = "//www.pinterest.com/medstamandsberg/"
    static pinterest_sap: string = "//www.pinterest.com/medstannaplein/"

    static weebly_sap: string = "//mediatheekpuntsap.weebly.com"

    static facebook_link: string = "//www.facebook.com/arteveldemediatheken"
    static twitter_link: string = "//twitter.com/search?q=%23mediatheekAHS"
    static instagram_link: string = "https://www.instagram.com/mediatheek.arteveldehogeschool/"
    static canvas_link: string = "//arteveldehogeschool.be/canvas"
    static sharepoint_link: string = "https://mijndinar.arteveldehs.be"


//opleidingsgebonden links
    static opleidingsgebondenLinks: object = {
        knt: [
            {label: 'bedrijfsmanagement', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/bedrijfsmanagement-international-business-management?module_item_id=3D96721'},
            {label: 'international business management', link: 'https://arteveldehogeschool.instructure=.com/courses/5136/pages/bedrijfsmanagement-international-business-management?module_item_id=3D96721'},
            {label: 'journalistiek', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/journalistiek?module_item_id=3D96724'},
            {label: 'INT Mocoma/ABS', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/mocoma-slash-abs?module_item_id=3D96723'},
            {label: 'audiologie', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/audiologie?module_item_id=3D96735'},
            {label: 'ergotherapie', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/ergotherapie?module_item_id=3D96736'},
            {label: 'logopedie', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/logopedie?module_item_id=3D96737'},
            {label: 'mondzorg', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/mondzorg?module_item_id=3D150677'},
            {label: 'podologie', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/podologie?module_item_id=3D74535'},
            {label: 'vroedkunde', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/vroedkunde?module_item_id=3D96744'},
            {label: 'verpleegkunde', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/verpleegkunde?module_item_id=3D155361'},
            {label: 'PGR autisme', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/autisme?module_item_id=3D141171'},
            {label: 'PGR lactatiekunde', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/lactatiekunde?module_item_id=3D74534'},
            {label: 'BNB creatieve therapie', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/creatieve-therapie?module_item_id=3D155374'},
        ],

        kat: [
            {label: 'lager onderwijs', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/lager-onderwijs-op-maat-van-je-opleiding?module_item_id=3D96740'},
            {label: 'secundair onderwijs', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/secundair-onderwijs-2?module_item_id=3D156030'},
            {label: 'BNB buitengewoon onderwijs | zorgverbreding en remediërend leren', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/bnb-buitengewoon-onderwijs-%7C-zorgverbreding-en-remedierend-leren'},
            {label: 'BNB schoolontwikkeling', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/bnb-schoolontwikkeling?module_item_id=3D122467'},
        ],

        mar: [
            {label: 'grafische en digitale media', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/grafische-en-digitale-media?module_item_id=3D96722'},
        ],

        sab: [
            {label: 'pedagogie van het jonge kind', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/pedagogie-van-het-jonge-kind?module_item_id=3D96734'},
            {label: 'kleuteronderwijs', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/kleuteronderwijs?module_item_id=3D122472'},
            {label: 'GRA orthopedagogie', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/graduaat-orthopedagogie'},
        ],

        sap: [
            {label: 'sociaal werk', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/sociaal-werk?module_item_id=3D96743'},
            {label: 'PGR rouw- en verliesconsulent', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/postgraduaat-rouw-en-verlies-consulent'},
            {label: 'PGR inspirerend coachen', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/postgraduaat-inspirerend-coachen'},
            {label: 'PGR contextuele en systemische counseling', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/postgraduaat-contextuele-en-systemische-counseling'},
            {label: 'GRA maatschappelijk werk', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/graduaat-maatschappelijk-werk'},
            {label: 'GRA sociaal-cultureel werk', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/graduaat-sociaal-cultureel-werk'},
            {label: 'GRA tolk Vlaamse gebarentaal', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/graduaat-tolk-vlaamse-gebarentaal'},
            {label: 'GRA informatiebeheer, bibliotheek en archief', link: 'https://arteveldehogeschool.instructure.com/courses/5136/pages/graduaat-informatiebeheer-bibliotheek-en-archief'}
        ]
    }

    static init() {
        console.log('Function init in ApplicationPath is deprecated. Please remove the call.')
    }
}
