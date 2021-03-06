import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import reddit_icon from '../reddit_icon.png';
import link_icon from '../link_icon.png';


const REDDIT_ENDPOINT = 'https://www.reddit.com/r/CryptoCurrency.json';

function RedditPost(props) {
    let post = props.info;
    let shouldExpand = post.is_self === true;
    let thumb = post.thumbnail;
    if (thumb === 'self') {
        thumb = reddit_icon;
    } else if (thumb === 'default') {
        thumb = link_icon;
    }
    return (
        <Card className="pad-card">
            <CardHeader
                title={post.title}
                subtitle={post.author}
                actAsExpander={shouldExpand}
                showExpandableButton={shouldExpand}
                avatar={thumb}
            />

            < CardText expandable={shouldExpand}>
                {post.selftext}
            </CardText>
            <CardActions>
                <FlatButton label="View Post" onClick={() => {
                    window.open(post.url);
                }} />

            </CardActions>
        </Card>
    );
}
class NewsPage extends Component {
    static defaultProps = {
        feedSize: 25
    }
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            lastPostName: ''
        };
    }

    fetch() {
        var _this = this;
        fetch(REDDIT_ENDPOINT + '?count=' + this.props.feedSize + '&after=' + this.state.lastPostName)
            .then(result => result.json())
            .then(result => {
                var arr = _this.state.posts.concat(result.data.children);
                _this.setState({
                    posts: arr,
                    lastPostName: result.data.children[result.data.children.length - 1].data.name
                });
            });
    }

    componentWillMount() {
        this.fetch();
    }

    render() {
        return (
            <div className='container content-scroll'>
                <div className='row'>
                    {this.state.posts.map(function (el, index) {
                        return <div className='col-md-12' key={index}>
                            <RedditPost info={el.data} />
                        </div>
                    })}
                    <FlatButton
                        className='col-md-12'
                        onClick={() => this.fetch()}
                        label="Load More" />
                </div>
            </div >
        );
    }
}
NewsPage.propTypes = {
    feedSize: PropTypes.number
}
export default NewsPage;
