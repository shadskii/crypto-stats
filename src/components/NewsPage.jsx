import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import reddit_icon from '../reddit_icon.png';
import link_icon from '../link_icon.png';

const REDDIT_ENDPOINT = 'https://www.reddit.com/r/CryptoCurrency.json';

function RedditPost(props) {
    let shouldExpand = props.info.is_self === true;
    let thumb = props.info.thumbnail;
    if (thumb === 'self') {
        thumb = reddit_icon;
    } else if (thumb === 'default') {
        thumb = link_icon;
    }
    return (
        <Card className="pad-card">
            <CardHeader
                title={props.info.title}

                subtitle={props.info.author}
                actAsExpander={shouldExpand}
                showExpandableButton={shouldExpand}
                avatar={thumb}
            />

            < CardText expandable={shouldExpand}>
                {props.info.selftext}
            </CardText>
            <CardActions>
                <FlatButton label="View Post" onClick={() => {
                    window.open(props.info.url);
                }} />

            </CardActions>
        </Card>
    );
}
class NewsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    fetchFirst() {
        var _this = this;
        fetch(REDDIT_ENDPOINT)
            .then(result => result.json())
            .then(result => {
                _this.setState({ posts: result.data.children, lastPostName: result.data.children[result.data.children.length - 1].data.name });
            });
        console.log('Fetching first news posts');
    }

    fetchNext(lastPostName) {
        var _this = this;
        fetch(REDDIT_ENDPOINT + '?count=' + 25 + '&after=' + lastPostName)
            .then(result => result.json())
            .then(result => {
                _this.setState({ posts: result.data.children, lastPostName: result.data.children[result.data.children.length - 1].data.name });
            });
    }
    componentWillMount() {
        this.fetchFirst();
    }

    render() {
        return (
            <div>
                {this.state.posts.map(function (el, index) {
                    return <RedditPost info={el.data} key={index} />
                })}
                <FlatButton onClick={() => this.fetchNext(this.state.lastPostName)} label="Load More" />
            </div>
        );
    }
}

export default NewsPage;
