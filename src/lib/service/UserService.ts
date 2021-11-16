import {ApplicationPath} from "../config/path";
import axios from 'axios'
import {CocosUser} from "../class/user";


export class UserService {

    private readonly USER_TABLE: string = 'user'

    initialized: boolean = false
    user: CocosUser
    apiUrl: string
    apiKey: string

    constructor() {
        this.apiUrl = ApplicationPath.API_BASE_URL
        this.apiKey = ApplicationPath.API_KEY
    }

    /*
    * */
    getUser(user: CocosUser) {

        let me = this

        return new Promise(function (resolve, reject) {
            let url = `${me.apiUrl}${me.USER_TABLE}?filter[]=email,eq,${user.email}&transform=1&token=${me.apiKey}`

            axios.get(url)
                .then(response => {

                    if (response.data[me.USER_TABLE].length === 0){
                        me.createUser(user).then(newUser => {
                            resolve(newUser)
                        })
                    } else {

                        const serverUser = response.data[me.USER_TABLE][0]

                        //update photoURL
                        if (!serverUser.photoURL && user.photoURL && user.photoURL !== ''){
                            serverUser.photoURL = user.photoURL
                            me.updateUser(serverUser)
                        }

                        resolve(serverUser)
                    }
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })

        })
    }

    updateUser(user: CocosUser) {

        let me = this

        return new Promise((resolve, reject) => {
                let url = `${me.apiUrl}${me.USER_TABLE}/${user.id}?&token=${me.apiKey}`;
                axios.put(url, user)
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

    createUser(user: CocosUser) {

        let me = this
        return new Promise((resolve, reject) => {
                let url = `${me.apiUrl}${me.USER_TABLE}/?token=${me.apiKey}`
                axios.post(url, user)
                    .then(response => {
                        user.id = response.data;
                        resolve(user)
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        )
    }
}
