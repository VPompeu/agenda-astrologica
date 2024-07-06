import { EventEmitter } from 'events';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import LocalConfig from './LocalConfig';
import errorHandler from './ErrorHandler';

class SStore extends EventEmitter {
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

    removeToken() {
        localStorage.removeItem('token');
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