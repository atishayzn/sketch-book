import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.css'
import { useDispatch,useSelector } from 'react-redux'
import { MENU_ITEMS } from '@/constant'
import { menuItemClick } from '@/slice/menuSlice'
import cx from 'classnames'


const Menu = () =>{
    const dispatch= useDispatch();
    const activeMenuItem=useSelector(state=>state.menu.activeMenuItem)
    const handleMenuClick=(itemName)=>{
        dispatch(menuItemClick(itemName))
    }

    return(
        <div className={styles.menuContainer}>
            <div className={cx(styles.iconWrapper, {[styles.active]: activeMenuItem === MENU_ITEMS.PENCIL})}  onClick={()=>handleMenuClick(MENU_ITEMS.PENCIL)}>
                <FontAwesomeIcon icon={faPencil} styles={styles.icon}/>
            </div>
            <div className={cx(styles.iconWrapper, {[styles.active]: activeMenuItem === MENU_ITEMS.ERASER})} onClick={()=>handleMenuClick(MENU_ITEMS.ERASER)}>
                <FontAwesomeIcon icon={faEraser} styles={styles.icon}  />
            </div>
            <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={faRotateLeft} styles={styles.icon}  />
            </div>
            <div className={styles.iconWrapper} >
                <FontAwesomeIcon icon={faRotateRight} styles={styles.icon} />
            </div>
            <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={faFileArrowDown} styles={styles.icon} />
            </div>

        </div>
    )
}
export default Menu;