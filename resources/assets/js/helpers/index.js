import localforage from 'localforage';
import { isEmpty } from 'lodash';

export const checkTokenExists = () => {
    return localforage.getItem('authtoken').then((token) => {
        if (isEmpty(token)) {
            return Promise.reject('NO_STORAGE_TOKEN');
        }

        return Promise.resolve(token)
    })
}
