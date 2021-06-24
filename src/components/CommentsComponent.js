function Comments(props){
    const cmnts = props.dish.comments.map(comment => {
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
    <div>
        <h4>Component</h4>
        <ul className="list-unstyled">
            {cmnts}
        </ul>
    </div>
    );
}

export default Comments;