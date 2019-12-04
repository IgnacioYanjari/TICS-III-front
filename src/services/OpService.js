import UserService from 'services/UserService';
import shortid from 'shortid';

class OpService extends UserService {

    getLinks(id) {
        return this.fetch(`${this.domain}/orders/${id}/getreports`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken(),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
        ).then(res => {
            if (res.status === 'fail') return Promise.resolve(res);
            res = [
                { link: 'https://google.com', name: 'google' },
                { link: 'https://facebook.com', name: 'facebook' }
            ]
            let aux = res.map(val => {
                let aux_2 = val;
                aux_2.shortid = shortid.generate();
                return aux_2;
            });
            return Promise.resolve(aux);
        });
    }

}
export default OpService;
