import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

export function CryptoCard(props) {
    return (
        <Card>
            <CardHeader
                title={props.info.name}
                subtitle={'$' + props.info.price_usd}
            />

        </Card>
    )
}