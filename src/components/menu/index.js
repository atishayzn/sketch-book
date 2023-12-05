import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.css'


const Menu = () =>{
    return(
        <div className={styles.menuContainer}>
            <div styles={styles.iconWrapper}>
                <FontAwesomeIcon icon={faPencil} styles={styles.icon}/>
            </div>
            <div styles={styles.iconWrapper}>
                <FontAwesomeIcon icon={faEraser} styles={styles.icon} />
            </div>
            <div styles={styles.iconWrapper}>
                <FontAwesomeIcon icon={faRotateLeft} styles={styles.icon}  />
            </div>
            <div styles={styles.iconWrapper}>
                <FontAwesomeIcon icon={faRotateRight} styles={styles.icon} />
            </div>
            <div styles={styles.iconWrapper}>
                <FontAwesomeIcon icon={faFileArrowDown} styles={styles.icon} />
            </div>

        </div>
    )
}
export default Menu;