import React from 'react'

const Alert = ({sender_name,event,description,tags}) => {
    return (
        <div className="alert">
            <h1 className="alert__sender">{sender_name}</h1>
            <h3 className="alert__event">{event}</h3>
            <p className="alert__description">{description}</p>
            {tags.map(tag => <p className="alert__tags">{tag}</p>)}
        </div>
    )
}

export default Alert
