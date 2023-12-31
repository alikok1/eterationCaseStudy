import React, {Component} from 'react';

class SliderComponent extends Component {

    constructor(props) {
        super(props);
        this.sliderItemRef = React.createRef();
        this.containerRef = React.createRef();
        this.state = {
            currentIndex: 0,
            isNextDisabled: false,
            isPrevDisabled: true,
            visibleItemCount: 0,
        };


    }
    componentDidUpdate(prevProps, prevState) {
        const prevWidth = this.itemWidth;
        const currentWidth = this.sliderItemRef.current  && this.sliderItemRef.current.offsetWidth;

        if (prevWidth !== currentWidth) {
            this.itemWidth = currentWidth;

        }
        console.log(this.itemWidth,"sadoasjjsad")
    }

    updateButtonState = () => {
        const containerWidth = this.containerRef.current.offsetWidth;
        const totalItemsWidth = this.props.sliderItems.length * this.itemWidth;
        const maxIndex = Math.max(0, this.props.sliderItems.length - 1);
        const currentIndex = Math.min(this.state.currentIndex, maxIndex);

        this.setState({
            isNextDisabled: currentIndex === maxIndex || containerWidth >= totalItemsWidth,
            isPrevDisabled: currentIndex === 0,
        });
    };

    updateVisibleItemCount = () => {
        const pageWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const sliderItemWidth = this.sliderItemRef.current && this.sliderItemRef.current.offsetWidth;

        if (sliderItemWidth) {
            const visibleItemCount = Math.floor(pageWidth / sliderItemWidth);

            this.setState({
                visibleItemCount,
            }, this.updateButtonState);
        }
    };

    nextSlide = () => {
        const { currentIndex } = this.state;
        const { sliderItems } = this.props;
        const visibleItemCount = 2;
        if (currentIndex + visibleItemCount < sliderItems.length) {
            this.setState((prevState) => ({
                currentIndex: prevState.currentIndex + 1,
            }), this.updateButtonState);
        }
    };

    prevSlide = () => {
        const { currentIndex } = this.state;

        if (currentIndex > 0) {
            this.setState((prevState) => ({
                currentIndex: prevState.currentIndex - 1,
            }), this.updateButtonState);
        }
    };

    componentDidMount() {
        this.updateButtonState();
        this.updateVisibleItemCount();
        window.addEventListener('resize', this.updateButtonState);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateVisibleItemCount);
        window.removeEventListener('resize', this.updateButtonState);
    }

    render() {
        const { currentIndex, isNextDisabled, isPrevDisabled } = this.state;
        let {sliderItems}=this.props
        return (
            <div className={"slider-root"}>
                <div className="slider-container">
                    <div
                        className="slider-block"
                        style={{ transform: `translateX(-${currentIndex * this.itemWidth}px)` }}
                        ref={this.containerRef}
                    >
                        {sliderItems.map((item, index) => (
                            <div key={index} className="slider-item" ref={this.sliderItemRef}>
                                <div className="img-item">
                                    <picture>
                                        <img src={item.image} alt={item.name} />
                                    </picture>
                                </div>
                                <span>{item.name}</span>
                                <p>{item.title}</p>
                            </div>
                        ))}
                    </div>
                    <div className="arrow-block">
                        <div className="arr-item left" onClick={this.prevSlide} disabled={isPrevDisabled}>
                            <svg width="41" height="42" viewBox="0 0 41 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20.5009" cy="20.5009" r="19.5009" transform="matrix(4.19979e-07 -1 1 -0.000442917 0 41.0199)" stroke="black" stroke-width="2" stroke-linecap="square"/>
                                <path d="M31.7113 17.9225L19.9443 17.9225C19.6854 17.9225 19.5557 17.6292 19.7389 17.4574L24.8623 12.6552C24.9759 12.5488 24.9759 12.3762 24.8623 12.2702L21.4764 9.09653C21.3628 8.99012 21.1787 8.99012 21.0656 9.09653L9.08686 20.3242C8.97333 20.4306 8.97333 20.6032 9.08686 20.7092L21.0656 31.9369C21.1791 32.0433 21.3632 32.0433 21.4764 31.9369L24.8623 28.7632C24.9759 28.6568 24.9759 28.4842 24.8623 28.3782L19.7389 23.576C19.5561 23.4047 19.6853 23.1109 19.9443 23.1109L31.7113 23.1109C31.8716 23.1109 32.0017 22.989 32.0017 22.8387L32.0017 18.1951C32.0017 18.0449 31.8716 17.9225 31.7113 17.9225Z" fill="black"/>
                            </svg>
                        </div>
                        <div className="arr-item right" onClick={this.nextSlide} disabled={isNextDisabled}>
                            <svg width="41" height="42" viewBox="0 0 41 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20.5009" cy="20.5009" r="19.5009" transform="matrix(-3.32556e-07 1 -1 0.000443005 41.0018 0.000244141)" stroke="black" stroke-width="2" stroke-linecap="square"/>
                                <path d="M9.29048 23.0976L21.0575 23.0976C21.3164 23.0976 21.4461 23.3909 21.2628 23.5627L16.1394 28.3649C16.0259 28.4713 16.0259 28.6439 16.1394 28.7499L19.5254 31.9236C19.6389 32.03 19.8231 32.03 19.9362 31.9236L31.9149 20.6959C32.0284 20.5895 32.0284 20.4169 31.9149 20.3109L19.9362 9.08323C19.8226 8.97681 19.6385 8.97681 19.5254 9.08323L16.1394 12.2569C16.0259 12.3633 16.0259 12.5359 16.1394 12.6419L21.2628 17.4441C21.4457 17.6155 21.3164 17.9092 21.0575 17.9092L9.29048 17.9092C9.13018 17.9092 9.00006 18.0312 9.00006 18.1814L9.00006 22.825C9.00006 22.9753 9.13018 23.0976 9.29048 23.0976Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default SliderComponent;
