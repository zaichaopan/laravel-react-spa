import localforage from 'localforage';
import { isEmpty } from 'lodash';

const INTENDED_URL = 'intended_url';
const DEFAULT_INTENDED_URL = '/home';

export const checkTokenExists = () => {
    return localforage.getItem('authtoken').then((token) => {
        if (isEmpty(token)) {
            return Promise.reject('NO_STORAGE_TOKEN');
        }

        return Promise.resolve(token)
    })
}

export const setIntendedUrl = (url) => {
    localforage.setItem(INTENDED_URL, url);
}

export const getIntendedUrl = () => {
    return localforage.getItem(INTENDED_URL).then((url) => {
        if (isEmpty(url)) {
            url = DEFAULT_INTENDED_URL;
        }

        return Promise.resolve(url);
    })
}
