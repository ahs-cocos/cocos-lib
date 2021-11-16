import React from 'react'
import {Image, Segment, Sticky} from "semantic-ui-react";
import {ApplicationPath} from "../config/path";

const CocosFooter = ({children}) => {
    return (
        <Segment padded clearing style={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 0}}>
            <Image style={{flexGrow: 0, marginRight: '30px'}} src={ApplicationPath.assetsFolder + 'logo/logo_epos_erasmusplus.png'} size='medium'/>

                {/*<img height='100%' onClick={() => onHeaderLogoClick && onHeaderLogoClick()}
                         src={ApplicationPath.assetsFolder + 'logo/logo-cocos-inv.png'} alt='cocos logo'/>*/}

                {children}

            <div floated='right' style={{width: '400px', fontSize: '0.9em'}}>
                <p><strong>Disclaimer</strong></p>

                This project has been funded with support from the European Commission.
                This publication [communication] reflects the views only of the author, and the Commission cannot be held responsible for any use which may be
                made of the information contained therein.
            </div>

        </Segment>
    )
}

export default CocosFooter
