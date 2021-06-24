import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Label
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class MenuDetails extends Component {

    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dish.id, values.rating, values.author, values.comment);
    }

    render() {

        const RenderComments = () => {
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in>
                            {

                                this.props.comments.map(comment => {
                                    return (
                                        <Fade in>
                                            <li key={comment.id}>
                                                <p>{comment.comment}</p>
                                                <p>-- {comment.author},
                            &nbsp;
                            {new Intl.DateTimeFormat('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: '2-digit'
                                                }).format(new Date(comment.date))}
                                                </p>
                                            </li>
                                        </Fade>
                                    );
                                })}
                        </Stagger>

                    </ul>
                    <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                </div>
            );
        }

        const DishComments = () => {
            return (
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                </Control.select>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="yourname"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />


                                <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                            </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            )
        }


        if (this.props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (this.props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>

                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={this.props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments />
                        </div>
                        <DishComments />
                    </div>
                </div>
            );
        }
        else {
            <div></div>
        }
    }
}


function RenderDish({ dish }) {
    return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}



export default MenuDetails