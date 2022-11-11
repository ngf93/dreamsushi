import React, {useEffect} from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import 'swiper/css/mousewheel'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/style.css'
import AppRouter from './routes/AppRouter'
import {useDispatch, useSelector} from 'react-redux'
import {setLoadingRefresh} from './store/reducers/authSlice'
import {checkAuth} from './services/RTK/auth'
import Button from './components/UI/Button'
import CustomModal from './components/utils/CustomModal'
import useCartSync from './hooks/cartSync'
import useFavoritesSync from './hooks/favoritesSync'
import Loader from './components/UI/Loader'

const App = () => {
    const dispatch = useDispatch()
    const isLoadingRefresh = useSelector((state) => state?.auth?.isLoadingRefresh)

    // sync
    const {isShowCartSyncModal, onAgreeSync, onDeclineSync} = useCartSync()
    useFavoritesSync()

    // initial refresh
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        } else {
            dispatch(setLoadingRefresh(false))
        }
    }, [])

    return !isLoadingRefresh ? (
        <>
            <AppRouter />

            <CustomModal
                title="Внимание"
                isShow={isShowCartSyncModal}
                setIsShow={() => onDeclineSync()}
                footer={
                    <>
                        <Button className="btn-1 me-3" onClick={() => onDeclineSync()}>
                            Нет
                        </Button>
                        <Button className="btn-2" onClick={() => onAgreeSync()}>
                            Да
                        </Button>
                    </>
                }
            >
                У вас имеются товары не добавленные в корзину. Вы хотите добавить их?
            </CustomModal>
        </>
    ) : (
        <Loader full />
    )
}
export default App
