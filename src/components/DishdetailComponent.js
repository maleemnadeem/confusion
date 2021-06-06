import { Card, CardImg, CardText, CardBody, CardTitle, Row, Col } from 'reactstrap'

function MenuDetails(props){
    if(props.dish != null){
    const dish = props.dish
    const cmnts = dish.comments.map(comment => {
        return (
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
        )
    })
    return(
        <div className="container">
            <div className="row">
        <Row>
            <Col sm="5">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
        </Col>
        <Col sm="5" >
        <div>
        <h4>Component</h4>
        <ul className="list-unstyled">
            {cmnts}
        </ul>
    </div>
        </Col>
    </Row>
    </div>
    </div>
    );
    }
    else{
        return(
            <div></div>
        );
    }
}

export default MenuDetails