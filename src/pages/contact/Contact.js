import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import texts from '../../utils/Texts'
import "./Contact.scss"

const Contact = () => {
    const {language} = useLanguage()
    const text = texts[language] || texts.ka
  return (
    <div className='page contact_page'>
        <h4 className='page_title'>{text.contact}</h4>
        <p>{text.contactMsg}</p>
    </div>
  )
}

export default Contact