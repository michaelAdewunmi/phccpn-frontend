import React, { Component } from 'react';

import emblem from '../assets/emblem.png';
import './form-styles.css';


export default class NewsForm extends Component {
    state = {
        title: null,
        excerpt: null,
        content: null,
        image: null,
        posted_in: null
    }

    inputRef = React.createRef();
    modalRef = React.createRef();
    statusRef = React.createRef();

    // componentDidMount() {

    // }

    onTitleChange = (e) => {
        this.setState({ title: e.target.value.trim()});
    }

    onExcerptChange = (e) => {
        this.setState({ excerpt: e.target.value.trim()});
    }

    onContentChange = (e) => {
        this.setState({ content: e.target.value.trim()});
    }

    onImageChange = (e) => {
        this.setState({ image: e.target.value.trim()});
    }

    onPostedInChange = (e) => {
        this.setState({ posted_in: e.target.value.trim()});
    }

    AddPostToFeed = () => {
        const { title, excerpt, content, image, posted } = this.state;
        if(
            title===null || title==="" || excerpt===null || excerpt===""
            || content===null || content==="" || image===null || image===""
            || posted===null || posted===""
        ) {
            console.log("Sorry!");
            return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/postnews`, {
			method: 'post',
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(this.state),
		}).then(response=>response.json()).then(arrays=>{
            console.log(arrays);
            this.sendNotifications(title);
            this.setState({
                title: null,
                excerpt: null,
                content: null,
                image: null,
                posted_in: null
            });
            this.openModal();
            this.clearAllInputValues()
		}).catch(err => {
            console.log(err);
        });
    }


    async sendNotifications(title) {
        fetch(`${process.env.REACT_APP_API_URL}/exponotify`, {
			method: 'post',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({
                title
            }),
		}).then(response=>response.json()).then(arrays=>{
			console.log(arrays);
		}).catch(err => {
            console.log(err);
        });
    }

    clearAllInputValues = () => {
        const allInputs = document.getElementsByClassName("text-input");
        [...allInputs].forEach(input=>{
            input.value="";
        });
    }

    openModal = () => {
        this.modalRef.current.classList.add("open");
        setTimeout(() => {
            this.statusRef.current.classList.add("reveal")
        },400)
    }

    closeModal = () => {
        this.modalRef.current.classList.remove("open");
        this.statusRef.current.classList.remove("reveal")
    }

    render() {
        return (
            <div className="measure tc">
                <img className="emblem" src={emblem} alt="logo" />
                <fieldset id="feed-form" className="">
                    <legend className="f3 fw6 ph0 mh0">Post News to Feed</legend>
                    <div id="input-wrapper">
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="title">Post Title</label>
                        <input
                            ref={this.inputRef}
                            type="text" name="title"  id="title"
                            onChange={this.onTitleChange}
                            className="text-input pa2 input-reset ba bg-transparent  hover-white w-100"
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="excerpt">Post Excerpt</label>
                        <input
                            ref={this.inputRef}
                            type="text" name="excerpt"  id="excerpt"
                            onChange={this.onExcerptChange}
                            className="text-input pa2 input-reset ba bg-transparent  hover-white w-100"
                        />
                    </div>
                    <div className="mt3 content-wrapper">
                        <label className="db fw6 lh-copy f6" htmlFor="content">Post Content</label>
                        <textarea
                            ref={this.inputRef}
                            name="content"  id="content" cols="30" rows="10"
                            onChange={this.onContentChange}
                            className="text-input pa2 input-reset ba bg-transparent  hover-white w-100"
                        ></textarea>
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="image">Post Image</label>
                        <input
                            ref={this.inputRef}
                            type="text" name="image"  id="image"
                            onChange={this.onImageChange}
                            className="text-input pa2 input-reset ba bg-transparent  hover-white w-100"
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="posted-in">Posted In</label>
                        <input
                            ref={this.inputRef}
                            type="text" name="posted-in"  id="posted-in"
                            onChange={this.onPostedInChange}
                            className="text-input pa2 input-reset ba bg-transparent  hover-white w-100"
                        />
                    </div>
                    </div>

                    <div className="">
                        <input
                        onClick={this.AddPostToFeed}
                        className="submitbtn b ph4 pv3 input-reset ba white br3
                                    b--white bg-blue grow pointer f6 dib"
                        type="submit"
                        value="Post to Feed" />
                    </div>
                </fieldset>
                <div className="notification" id="notify" ref={this.modalRef}>
                    <div className="status" ref={this.statusRef}>
                        <p>Successful!</p>
                        <input
                            onClick={this.closeModal}
                            className="submitbtn b ph4 pv3 input-reset ba white br3
                                        b--white bg-blue grow pointer f6 dib"
                            type="submit"
                            value="close Modal"
                        />
                    </div>
                </div>
                {/* <input
                    onClick={this.saveToken}
                    className="submitbtn b ph4 pv3 input-reset ba white br3
                                b--white bg-blue grow pointer f6 dib"
                    type="submit"
                    value="Save Token"
                /> */}
            </div>
        )
    }
}