import React from 'react'
import PropTypes from 'prop-types'
import {Sticky} from "semantic-ui-react";

const CocosHeader = ({children, onHeaderLogoClick, navLink}) => {


    return (
        <Sticky>
            <div className='cocos-header'>


                    {/*<img height='100%' onClick={() => onHeaderLogoClick && onHeaderLogoClick()}
                         src={ApplicationPath.assetsFolder + 'logo/logo-cocos-inv.png'} alt='cocos logo'/>*/}

                {children}

            </div>
        </Sticky>
    )
}

export default CocosHeader

CocosHeader.propTypes = {
    onHeaderLogoClick: PropTypes.func,
    navLink: PropTypes.elementType
}

CocosHeader.defaultProps = {}