import {apiRoutes} from '../config/api'
import {$api, $authApi} from './index'

const getProduct = async (payloads = {}) => {
    const response = await $api.get(apiRoutes.PRODUCT_ONE, {
        params: payloads,
    })
    if (response) {
        return response.data
    }
}

const getProductRecommendations = async (payloads = {}) => {
    const response = await $api.get(apiRoutes.PRODUCT_RECOMMENDATIONS, {
        params: payloads,
    })

    if (response) {
        return response.data
    }
}

const getCartProducts = async (ids) => {
    const response = await $authApi.post(apiRoutes.CART_PRODUCTS, ids)
    return response
}

export {getProduct, getCartProducts, getProductRecommendations}
