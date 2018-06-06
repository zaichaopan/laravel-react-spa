import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { registerUser } from '../actions/auth';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    }

    registerSuccess() {
        this.props.history.push('/home')
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.registerUser(this.state, () => { this.registerSuccess() });
    }

    handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="flex justify-center items-center w-full flex-col py-4">
                <form onSubmit={e => this.handleSubmit(e)}
                    method="POST"
                    className="border rounded border-grey-light w-3/4 sm:w-1/2 lg:w-1/4 xl:w-1/3 p-8">
                    <h2 className="text-center mb-4 text-grey-darker">Register</h2>
                    <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                            Username
                       </label>
                        <input
                            value={this.state.name}
                            onChange={e => this.handleInputChange(e)}
                            type="text"
                            name="name"
                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight"
                            id="username"
                            placeholder="jane doe"
                            required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                            Email
                       </label>
                        <input
                            value={this.state.email}
                            onChange={e => this.handleInputChange(e)}
                            name="email"
                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight"
                            id="email"
                            type="email"
                            placeholder="jane@example.com"
                            required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password"> Password </label>
                        <input
                            value={this.state.password}
                            onChange={e => this.handleInputChange(e)}
                            type="password"
                            name="password"
                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight"
                            id="password"
                            required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password-confirmation"> Password confirmation </label>
                        <input
                            value={this.state.password_confirmation}
                            onChange={e => this.handleInputChange(e)}
                            type="password"
                            name="password_confirmation"
                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight"
                            id="password-confirmation" type="password" required />
                    </div>

                    <div className="mb-6">
                        <button className="border rounded-full p-3 text-white bg-indigo w-full font-bold hover:bg-indigo-dark">Register</button>
                    </div>
                </form>

                <div className="p-4 text-grey-dark">
                    Already have an account? <Link to="/signin" className="no-underline text-grey-darker">Sign in</Link>
                </div>
            </div>

        );
    }
}

const mapDispatchToProps = { registerUser };
export default connect(null, mapDispatchToProps)(withRouter(Register));
