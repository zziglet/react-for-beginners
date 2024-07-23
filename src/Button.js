import PropTypes from "prop-types";
import styles from "./Button.module.css"

//styles.css로 모든 button에 대한 style통일해서 적용 가능
//혹은 prop으로 받아서 style 적용 가능(divide + conquer)
//혹은 module별 css 적용 가능
//module화 하게 되면 다른 css 파일에서 같은 classname을 가지더라도 독립적으로 생각함


function Button({text}){
    //랜덤한 클래스 네임으로 알아서 연결해줌 -> CRA의 장점
    return <button className={styles.btn}>{text}</button>;
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Button;