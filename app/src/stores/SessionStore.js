import { EventEmitter } from 'events';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import LocalConfig from './LocalConfig';
import errorHandler from './ErrorHandler';

class SessionStore extends EventEmitter {
    constructor() {
        super();
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
}

// Exemplo de uso da classe Store
const sessionStore = new SessionStore();
export default sessionStore;