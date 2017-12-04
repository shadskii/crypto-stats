import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const REDDIT_ENDPOINT = 'https://www.reddit.com/r/CryptoCurrency.json';

const RedditPost = props => {
    return (
        <Card className="post-card">
            <CardHeader
                title={props.info.title}

                subtitle={props.info.author}
                actAsExpander={props.info.is_self === true}
                showExpandableButton={false}
            />

            <CardText expandable={props.info.is_self === true}>
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
    }

    fetchNext(url, lastPostName) {
        var _this = this;
        if (url) {
            fetch(REDDIT_ENDPOINT + '?count=' + 25 + '&after=' + lastPostName)
                .then(result => result.json())
                .then(result => {
                    _this.setState({ posts: result.data.children, lastPostName: result.data.children[result.data.children.length - 1].data.name });
                });
        }
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
                <FlatButton onClick={() => this.fetchNext('reactjs', this.state.lastPostName)} label="more" />
            </div>
        );
    }
}

export default NewsPage;
