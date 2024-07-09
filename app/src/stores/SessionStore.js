import { EventEmitter } from 'events';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import LocalConfig from './LocalConfig';
import errorHandler from './ErrorHandler';

class SStore extends EventEmitter {

    constructor() {
        super();
        this.email = "";
    }
    setEmail(email) {
        this.email = email;
        return;
    }
    getEmail() {
        return this.email;
    }
    getToken() {
        let token = localStorage.getItem('token');
        if (!token) {
            return null
        }
        try {
            // Decodifica o token
            const decodedToken = jwtDecode(token);
            // Verifica se o token ainda é válido
            const currentTime = Date.now() / 1000; // Tempo atual em segundos
            if (decodedToken.exp > currentTime) {
                return token;
            } else {
                return null;
            }
        } catch (err) {
            console.error('Erro ao decodificar o token:', err.message);
        }


    }

    login(email, password, callback) {

        axios.post(LocalConfig.baseURL + '/login',
            {
                email,
                password
            })
            .then(function (response) {
                if (response?.data) {
                    localStorage.setItem('token', response.data);
                    callback(true)
                }
            })
            .catch(function (error) {
                errorHandler(error);
                callback(false);
            });
    }
    signin(user, callback) {

        axios.post(LocalConfig.baseURL + '/signin', user)
            .then(function (response) {
                if (response?.data) {
                    callback(response.data)
                }
            })
            .catch(function (error) {
                errorHandler(error);
                callback(null);
            });
    }

    removeToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getUserID() {
        let token = localStorage.getItem('token');
        if (!token) {
            return null
        }
        try {
            // Decodifica o token
            const decodedToken = jwtDecode(token);
            if (decodedToken.id) {
                return decodedToken.id;
            } else {
                return null;
            }
        } catch (err) {
            console.error('Erro ao decodificar o token:', err.message);
        }
    }
    getUser() {
       let user = localStorage.getItem("user");
       if(user){
        return JSON.parse(user);
       }
       
    }

    verifyUserLicense(callback) {
        const token = this.getToken();
        if (!token) {
            callback("Unauthorized");
            return;
        }
        const id = this.getUserID();
        if (id) {
            axios.get(LocalConfig.baseURL + '/user/' + id, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            })
                .then(function (response) {
                    if (response?.data) {
                        localStorage.setItem('user', JSON.stringify(response.data));
                        callback(response.data.license)
                    }
                })
                .catch(function (error) {
                    errorHandler(error);
                    callback(null);
                });
        }
    }
}

// Exemplo de uso da classe Store
const SessionStore = new SStore();
export default SessionStore;