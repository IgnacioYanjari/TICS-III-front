import UserService from 'services/UserService';
import shortid from 'shortid';

class AdmService extends UserService {
    getUsers() {
        // Get a token from api server using the fetch api
        return this.fetch(
            `${this.domain}/users`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                }
            }
        ).then(res => Promise.resolve(res));
    }

    createUser(data) {
        const user = {
            email: data.email,
            username: data.rut,
            password: data.password,
            repeat_password: data.password,
            profile: {
                role: data.role,
                name: data.name,
                surname: data.surname
            }
        };
        return this.fetch(
            `${this.domain}/register`,
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken(),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }
        ).then(res => {
            return Promise.resolve(res)
        });
    }

    deleteUser(userId) {
        return this.fetch(
            `${this.domain}/users/${userId}/delete`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                }
            }
        ).then(res => Promise.resolve(res));
    }

    editUser(data) {
        return this.fetch(
            `${this.domain}/users/${data.id}/adminupdate`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken(),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email
                })
            }
        ).then(res => {
            return Promise.resolve({
                id: res.id, rut: res.username,
                surname: res.profile.surname,
                name: res.profile.name,
                role: res.profile.role,
                email: res.email
            });
        });
    }

    availableOrders() {
        return this.fetch(
            `${this.domain}/orders/available`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                }
            }
        ).then(res => {
            if (res.status === 'fail') return Promise.resolve(res);
            let aux = res.map(val => {
                return {
                    id: val.id,
                    stage: val.current_stage.name,
                    client: val.customer.name,
                    start_date: val.start_date,
                    finish_date: val.finish_date,
                    product: val.product.name
                }
            });
            return Promise.resolve(aux);
        });
    }

    createOrder(data) {
        return this.fetch(
            `${this.domain}/orders/create`,
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken(),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        ).then(res => {
            if (res.status === 'fail') return Promise.resolve(res);
            return res;
        });
    }

    endedOrders() {
        return this.fetch(
            `${this.domain}/orders/ended`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                }
            }
        ).then(res => {
            if (res.status === 'fail') return Promise.resolve(res);
            let aux = res.map(val => {
                return {
                    id: val.id,
                    stage: val.current_stage.name,
                    client: val.customer.name,
                    start_date: val.start_date,
                    finish_date: val.finish_date,
                    product: val.product.name
                }
            });
            return Promise.resolve(aux);
        });
    }

    cancelOrder(id) {
        return this.fetch(
            `${this.domain}/orders/${id}/cancel`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                }
            }
        ).then(res => {
            if (res.status === 'fail') return Promise.resolve(res);
            return Promise.resolve(res);
        });
    }

    updateOrder(id, start_date, finish_date) {
        return this.fetch(
            `${this.domain}/orders/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                },
                body: JSON.stringify({ start_date, finish_date })
            }
        ).then(res => {
            if (res.status === 'fail') return Promise.reject();
            let aux = res.map(val => {
                return {
                    id: val.id,
                    stage: val.current_stage.name,
                    client: val.customer.name,
                    start_date: val.start_date,
                    finish_date: val.finish_date,
                    product: val.product.name
                }
            });
            return Promise.resolve(aux);
        });
    }

    getClients() {
        return this.fetch(
            `${this.domain}/customers`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                }
            }
        ).then(res => {
            let aux = res.map(val => {
                return {
                    id: val.id,
                    name: val.name,
                    shortid: shortid.generate()
                }
            });
            return aux;
        });
    }

    getProducts() {
        return this.fetch(
            `${this.domain}/products`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                }
            }
        ).then(res => {
            let aux = res.map(val => {
                return {
                    id: val.id,
                    name: val.name,
                    shortid: shortid.generate()
                }
            });
            return aux;
        });
    }

}
export default AdmService;
