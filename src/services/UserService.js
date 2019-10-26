import MainService from 'services/MainService';

class UserService extends MainService {

    updatePassword(data, userId) {
        return this.fetch(
            `${this.domain}/users/${userId}/updatepassword`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken(),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
        ).then(res => Promise.resolve(res));
    }

    updateEmail(email, userId) {
        return this.fetch(
            `${this.domain}/users/${userId}/update`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken(),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            }
        ).then(res => {
            if (!res.status) {
                console.log('entra');
                this.setToken(res.token.access);
            }
            return Promise.resolve(res);
        });
    }

}
export default UserService;
