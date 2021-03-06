import { useState, useEffect } from 'react'
// components
import ShortContact from '@footer/elements/ShortContact.js'
// img
import spinner from '@img/global/spinner.svg'
// hooks
import { useHttp } from '@hooks/http.hook.js'
// config
import config from '@config/config.js'
// styled
import styled from 'styled-components'

export default function Contacts() {
    const [contactsList, setContactsList] = useState({});
    const [repitRequest, setRepitRequest] = useState(false)

    // используем наш хук для запроса контактов
    const { request, isLoaded } = useHttp()

    // При первой отрисовке получаем все контакты
    useEffect(() => {
        async function getContacts() {
            try {
                // получаем список контактов и закидываем в state
                const data = await request({ url: `${config.serverUrl}/api/contacts?populate=*` })
                setContactsList(data.data)
            } catch (error) {
                setTimeout(() => setRepitRequest(!repitRequest), 2000)
            }
        }
        getContacts()
    }, [request, repitRequest]);

    return (
        <ContactsComponent>
            <Title>
                {config.appLang === 'RU' ? 'Контакты' : 'Contact us'}
            </Title>
            <ContactsList isLoaded={isLoaded}>
                {(contactsList && contactsList.length > 0) && contactsList.map(contact => {
                    return <ShortContact key={contact.id} contact={contact} />
                })}
            </ContactsList>

            {!isLoaded && <Spinner><img src={spinner} alt="spinner" /></Spinner>}

        </ContactsComponent>
    )
}

const ContactsComponent = styled.div`
    @media (max-width: 991px) {
        margin-top: 7%;
    }
`


const Title = styled.p`
    line-height: 41px;
    color: #ccc;
    font-size: calc(0.3vw + 14px);
    letter-spacing: -0.02em;
    margin: 0 0 10px;

    @media (min-width: 1920px) {
        font-size: 18px;
    }
    
    @media (max-width: 380px) {
        font-size: calc(1.5vw + 15px);
    }
`

const ContactsList = styled.div`
    opacity: ${(props) => props.isLoaded ? 1 : 0};
    max-height: ${(props) => props.isLoaded ? '100%' : '0px'};
`

const Spinner = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    opacity: 0.9;

    > img {
        max-width: calc(1vw + 14px);
    }
`