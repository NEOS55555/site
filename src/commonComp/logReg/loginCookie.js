import cookie from 'react-cookies'
import { EXPIRES_TIME } from '@/common/constant'

const expires = new Date(Date.now() + EXPIRES_TIME);

export const saveLoginCookie = (id, token, name, is_async) => {
	cookie.save('user_id', id, {path: '/', expires })
	cookie.save('user_token', token, {path: '/', expires})
	cookie.save('user_name', name, {path: '/', expires})
	// cookie.save('is_async', is_async, {path: '/', expires})
}

export const removeLoginCookie = () => {
	cookie.remove('user_id', {path: '/'})
    cookie.remove('user_token', {path: '/'})
    cookie.remove('user_name', {path: '/'})
    // cookie.remove('is_async', {path: '/'})
}