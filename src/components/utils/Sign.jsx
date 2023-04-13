import React from 'react'

const Sign = (props) => {
    const currentYear = new Date().getFullYear()

    return (
        <div className={'light-gray ' + props.className}>
            © ООО «Sushi Xiao»,
            <br />
            {currentYear}. Все права защищены
        </div>
    )
}

export default Sign
