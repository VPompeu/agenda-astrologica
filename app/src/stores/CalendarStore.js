import { EventEmitter } from 'events';
import axios from "axios";
import LocalConfig from './LocalConfig';
import errorHandler from './ErrorHandler';
import SessionStore from './SessionStore';
class CStore extends EventEmitter {

    getGlobalNote(date, callback) {
        const token = SessionStore.getToken();
        if (!token) {
            callback("Unauthorized");
            return;
        }

        axios.get(LocalConfig.baseURL + '/notes/' + date, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        })
            .then(function (response) {
                if (response?.data) {
                    callback(response.data)
                } else {
                    callback({});
                }
            })
            .catch(function (error) {
                errorHandler(error);
                callback({});
            });

    }

    postUserNote(note, callback) {
        let userId = JSON.parse(localStorage.getItem('user'));
        let token = SessionStore.getToken();
        if(!token){
            return
        }
        if (userId) {
            userId = userId.id
        }
        axios.post(LocalConfig.baseURL + '/users/' + userId + "/notes", note, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        })
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

    getUserNote(date, callback) {
        let userId = JSON.parse(localStorage.getItem('user'));
        let token = SessionStore.getToken();
        if(!token){
            return
        }
        if (userId) {
            userId = userId.id
        }else{
            return
        }

        axios.get(LocalConfig.baseURL + '/users/' + userId + "/notes/" + date, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        })
            .then(function (response) {
                if (response?.data) {
                    callback(response.data);
                }else{
                    callback(null);
                }
            })
            .catch(function (error) {
                errorHandler(error);
                callback(null);
            });
    }
}

// Exemplo de uso da classe Store
const CalendarStore = new CStore();
export default CalendarStore;