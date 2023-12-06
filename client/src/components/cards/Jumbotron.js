import React from 'react'
import Typewriter from 'typewriter-effect'

export const Jumbotron = ({text}) => (
  <Typewriter
    options = {{
        strings: text,
        autoStart: true,
        loop: true,
        fontSize: '30'
    }}
    
  />
)
