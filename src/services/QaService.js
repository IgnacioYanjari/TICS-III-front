import UserService from 'services/UserService';

class QaService extends UserService {

    login(username, password) {
        // Get a token from api server using the fetch api
        return this.fetch(
            `${this.domain}/token`,
            {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                })
            }
        ).then(res => {
            if (res.access)
                this.setToken(res.access); // Setting the token in localStorage
            console.log(this.getProfile());
            return Promise.resolve(res);
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
                    start_date: val.start_date,
                    finish_date: val.finish_date,
                    product: val.product.name
                };
            });
            return Promise.resolve(aux);
        });
    }

    inscribeOp(opId) {
        return this.fetch(
            `${this.domain}/orders/${opId}/begin`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                }
            }
        ).then(res => Promise.resolve(res));
    }

    verifyAccessStage(opId, stageId) {
        return this.fetch(
            `${this.domain}/orders/${opId}/stage/${stageId}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                }
            }
        ).then(res => {
            if (res.status === 'fail') return Promise.resolve(res);
            let aux = {
                opId: res.order.id,
                client: res.order.customer.name,
                stage: res.order.current_stage.name,
                product: res.order.product.name
            };
            return Promise.resolve(aux);
        });
    }

}

export default QaService;
