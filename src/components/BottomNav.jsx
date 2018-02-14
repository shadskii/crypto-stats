import React from 'react';
import { withRouter } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

const BottomNav = withRouter(({ history, location }) =>
    <BottomNavigation selectedIndex={location.pathname === '/news' ? 1 : 0}>
        <BottomNavigationItem
            label="Prices"
            icon={<FontIcon className="fa fa-line-chart" />}
            onClick={() => { history.push('/') }}
        />
        <BottomNavigationItem
            label="Favorites"
            icon={<FontIcon className="fa fa-heart" />}
            onClick={() => { history.push('/favorites') }}
        />
        <BottomNavigationItem
            label="News"
            icon={<FontIcon className="fa fa-newspaper-o" />}
            onClick={() => { history.push('/news') }}
        />
    </BottomNavigation>
);

export default BottomNav;