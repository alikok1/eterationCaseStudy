import React, {Component} from 'react';
import axios from "axios";
import SuccessComponent from "./successComponent";

class ApplyNowComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            error: '',
            isSuccess:false

        };
    }

    closeModal=()=>{
        this.setState({
            isOpenModal:false
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: '',
        });
    };

    handleSubmit =  async (e) => {
        e.preventDefault();

        const { name, email } = this.state;
        if (!name || !email) {
            this.setState({
                error: 'Please fill in all the blanks',
            });
            return;
        }
        try {
            const response = await axios.post('https://case.justdesignfx.com/form.php', {
                name: this.state.name,
                email: this.state.email,
            });
            this.setState({
                isSuccess:true
            })
            console.log('success', response.data);


        } catch (error) {
            console.error('error', error);

            this.setState({
                error: 'error',
            });
        }
    };

    render() {
        let { name, email, error } = this.state;
        return (
            <div>
                <div className="lb-root">
                    <div className="lb-container">

                        <div className="lb-block">

                            <svg className={"close-item"} onClick={this.props.closeModal} width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.876 0L13.052 8.632L19.682 18.512H12.792L11.778 16.822L9.802 13.468C9.256 14.352 8.528 15.47 7.644 16.822L6.526 18.512H0L6.812 9.022L0.728 0H7.54L8.554 1.612C9.204 2.678 9.698 3.484 10.036 4.004C10.062 3.952 10.296 3.562 10.738 2.86L11.518 1.612L12.532 0H18.876Z" fill="#F25A41"/>
                            </svg>

                            <div className="title-item">
                                <span>APPLY NOW</span>
                            </div>
                                <form onSubmit={this.handleSubmit}>
                                    <div>
                                        <label htmlFor="name"></label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={name}
                                            onChange={this.handleChange}
                                            placeholder={"Name Surname"}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email"></label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={this.handleChange}
                                            placeholder={"Email Address"}
                                        />
                                    </div>
                                    <div>
                                        <button type="submit">Send</button>
                                    </div>
                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                </form>
                        </div>
                    </div>
                </div>

                {
                    this.state.isSuccess &&
                    <SuccessComponent
                        closeModal={this.props.closeModal}
                    />
                }

            </div>
        );
    }
}

export default ApplyNowComponent;