import React from 'react';
import FluidAnimation from 'react-fluid-animation'

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.myRef = React.createRef();
    }

    render() {
        return (
            <div>
                <div className="fl-container">
                    <FluidAnimation ref={element => this.myRef = element}  className='anim' style={{ height: '100vh' }} />
                    <div draggable="true" className="pointa" style={{zIndex: 1, position: 'absolute', background: 'green', marginTop: '400px', marginLeft: 0, width: '50px', height: '50px' }} />
                </div>
            </div>
        );
    }
}

//<div draggable="true" className="pointb" style={{zIndex: 0, position: 'absolute', background: 'red', top: '200px', left: '90px', width: '50px', height: '50px' }} />

export default Home;
