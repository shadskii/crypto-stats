import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
const style = {
    position: 'fixed',
    bottom: 80,
    right: 25,
};

class FavoritesPage extends Component {

    render() {
        return <div >
            <FloatingActionButton style={style}>
                <ContentAdd />
            </FloatingActionButton>
        </div>
    }
};

export default FavoritesPage;