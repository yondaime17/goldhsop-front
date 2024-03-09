import React from 'react'
import { FacebookShareButton } from 'react-share';
import { CiFacebook } from "react-icons/ci";
import {useTheme} from "../../context/ThemeContext"
import "./Share.scss"

const Share = (url) => {
  const {lightTheme} = useTheme()

  return (
    <div className="share">
            <FacebookShareButton url={url}>
                <CiFacebook color={lightTheme ? "#5a5a5a" : "white"} size="30px"/>
            </FacebookShareButton>
            </div>
  )
}

export default Share