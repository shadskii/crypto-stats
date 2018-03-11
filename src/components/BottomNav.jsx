import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import * as viewsConst from '../constants/Views'
import PropTypes from 'prop-types'

const BottomNav = ({ view, changeView }) => (
    <BottomNavigation selectedIndex={selectedIndex(view.view)}>
        <BottomNavigationItem
            label="Prices"
            icon={<FontIcon className="fa fa-line-chart" />}
            onClick={() => changeView(viewsConst.PRICE_PAGE)}
        />
        <BottomNavigationItem
            label="Favorites"
            icon={<FontIcon className="fa fa-heart" />}
            onClick={() => changeView(viewsConst.FAVORITE_PAGE)}
        />
        <BottomNavigationItem
            label="News"
            icon={<FontIcon className="fa fa-newspaper-o" />}
            onClick={() => changeView(viewsConst.NEWS_PAGE)}
        />
    </BottomNavigation>
);
BottomNav.propTypes = {
    view: PropTypes.object.isRequired,
    changeView: PropTypes.func.isRequired
}
function selectedIndex(viewName) {
    if (viewName === viewsConst.NEWS_PAGE) {
        return 2;
    } else if (viewName === viewsConst.FAVORITE_PAGE) {
        return 1;
    } else {
        return 0;
    }
}
export default BottomNav;