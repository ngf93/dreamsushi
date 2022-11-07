import {apiRoutes} from '../config/api'
import {$authApi} from './index'

const getCategories = async () => {
    try {
        const response = await $authApi.get(apiRoutes.CATEGORY_ALL)

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}

const getCategory = async (id = '') => {
    try {
        const response = await $authApi.get(`${apiRoutes.CATEGORY_ONE}/${id}`)

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}

export {getCategory, getCategories}
