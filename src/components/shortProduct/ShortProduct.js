// components
import Illustration from '@shortProduct/Illustration.js'
import Text from '@shortProduct/Text.js'
// img
import LeftTopCornerImg from '@img/products/LTCorner.svg'
import RightBotCornerImg from '@img/products/RBCorner.svg'
// config
import config from '@config/config.js'
// style
import styled from 'styled-components'


export default function SeparateProduct(props) {

    // Подставляем Title, description и Img в соответствии с установленным языком приложения
    let product = {}

    try {
        switch(config.appLang) {
            case 'RU':
                product = {
                    title: props.product.attributes.Title_RU,
                    description: props.product.attributes.Text_RU,
                    img: config.serverUrl + props.product.attributes.Img_RU.data.attributes.url,
                    UID: props.product.attributes.UID,
                    url: props.product.attributes.URL_RU,
                    btn: 'Подробнее'
                }
                break
            case 'AM':
                product = {
                    title: props.product.attributes.Title_AM,
                    description: props.product.attributes.Text_AM,
                    img: config.serverUrl + props.product.attributes.Img_AM.data.attributes.url,
                    UID: props.product.attributes.UID,
                    url: props.product.attributes.URL_AM,
                    btn: 'Read more'
                }
                break
            default:
                // Если конфиг не указан либо EN
                product = {
                    title: props.product.attributes.Title_EN,
                    description: props.product.attributes.Text_EN,
                    img: config.serverUrl + props.product.attributes.Img_EN.data.attributes.url,
                    UID: props.product.attributes.UID,
                    url: props.product.attributes.URL_EN,
                    btn: 'Read more'
                }
                break
        } 
    } catch {
        // если ошибка получения данных с сервера
        product = {
            title: props.product.attributes.Title_EN,
            description: props.product.attributes.Text_EN,
            img: config.serverUrl + props.product.attributes.Img_EN.data.attributes.url,
            UID: props.product.attributes.UID,
            url: props.product.attributes.URL_EN,
            btn: 'Read more'
        }
    }

    return (
        <ShortProductWrapper>
            <LeftTopCorner src={LeftTopCornerImg}></LeftTopCorner>

            <ShortProductStyled>
                <Illustration img={product.img} url={product.url} />
                <Text title={product.title} text={product.description} url={product.url} btn={product.btn} />
            </ShortProductStyled>

            <RightBotCorner src={RightBotCornerImg}></RightBotCorner>
        </ShortProductWrapper>
    );
}

const ShortProductWrapper = styled.div`
    position: relative;
    padding: 4%;

    @media (max-width: 991px) {
        margin-bottom: 50px; 
        padding: 8% 4%;
    }
`

const ShortProductStyled = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`

const LeftTopCorner = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 8%;
    height: auto;

    @media (max-width: 1440px) {
        width: 10%;
    }
    @media (max-width: 991px) {
        width: 12%;
    }
    @media (max-width: 600px) {
        width: 14%;
    }
`
const RightBotCorner = styled.img`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 8%;
    height: auto;

    @media (max-width: 1440px) {
        width: 10%;
    }
    @media (max-width: 991px) {
        width: 12%;
    }
    @media (max-width: 600px) {
        width: 14%;
    }
`


