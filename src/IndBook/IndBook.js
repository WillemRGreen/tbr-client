import React from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import config from '../config'
import './IndBook.css'

export default class IndBook extends Component {
    static defaultProps = {

    }

    static contextType = ApiContext;

    render() {
        const { name, id } = this.props
        return (
            <div className = 'Book'>
                <h2 className = 'Book_name'>
                    <Link  
                        to={`/book/${id}`}>
                        {name}
                    </Link>
                </h2>
            </div>
        )
    }
}