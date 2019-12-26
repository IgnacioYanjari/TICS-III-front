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
            console.log('original', res);
            if (res.status === 'fail') return Promise.resolve(res);
            let aux = res.map(val => {
                let aux_2 = val;
                aux_2.link = `${this.domain}${aux_2.link}`
                aux_2.shortid = shortid.generate();
                return aux_2;
            });
            return Promise.resolve(aux);
        });
    }

    finishStage(obj, opId) {
        let formData = new FormData();
        formData.append('data', JSON.stringify(obj.data));
        formData.append('comments', JSON.stringify(obj.comments));
        formData.append('types', JSON.stringify(obj.types));
        for (const file of obj.images) {
            formData.append('images', file);
        }
        return this.fetch(`${this.domain}/orders/${opId}/end`,
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                },
                body: formData
            }
        ).then(res => {
            console.log(res);
        })
    }
}
export default OpService;
