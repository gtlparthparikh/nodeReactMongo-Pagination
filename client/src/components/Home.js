import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import { css } from '@emotion/core';
import ClipLoader from "react-spinners/ClipLoader";
import './home.css';
const axios = require('axios');
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            activePage: 1,
            loading: true,
            itemsCountPerPage: 0,
            totalItemsCount: 0
        }
    }
    async getData(page) {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3001/api/data?page=${page}`)
                .then((response) => {
                    // console.log(response.data.results);
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject({ error: error });
                })
            return;
        })
    }
    async componentDidMount() {
        let ques = await this.getData(1);
        console.log(ques.totalDocs);
        console.log(ques.limit);
        this.setState({
            data: ques.docs,
            totalItemsCount: ques.totalDocs,
            itemsCountPerPage: ques.limit,
            loading: false
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    async handlePageChange(pageNumber) {
        this.setState({
            loading: true
        })
        let ques = await this.getData(pageNumber);
        console.log(ques.page);
        this.setState({
            data: ques.docs,
            totalItemsCount: ques.totalDocs,
            itemsCountPerPage: ques.limit,
            loading: false
        })
        this.setState({ activePage: pageNumber });
        console.log(`active page is ${pageNumber}`);
    }
    logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        this.props.history.push('/login')
    }
    render() {
        return (
            <div className="ml-5 mr-5">
                <h2>Demo App</h2>
                {!this.state.loading ?
                    <>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Body</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data != null ?
                                    this.state.data.map((item) =>
                                        (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.title}</td>
                                                <td>{item.body}</td>
                                            </tr>
                                        )
                                    )
                                    : (
                                        <tr>
                                            <td>#</td>
                                            <td>no data</td>
                                            <td>no data</td>
                                            <td>no data</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCountPerPage}
                            totalItemsCount={this.state.totalItemsCount}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </>
                    :
                    <ClipLoader
                        css={override}
                        size={150}
                        color={"#123abc"}
                        loading={this.state.loading}
                    />
                }
            </div>
        )
    }
}

export default Home
