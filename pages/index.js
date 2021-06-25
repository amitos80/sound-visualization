import React from 'react';
import FluidAnimation from 'react-fluid-animation'
import { ToastContainer, toast } from 'react-toastify';
import { cpus } from 'os'

const randomWhole = (min, max) => Math.floor(Math.random()*(max-min) + min)

const randomReal = (min, max) => Math.random()*(max-min) + min


export class Home extends React.Component {
    constructor(props) {
        super(props);
        const configs =[{
            textureDownsample: 2,
            densityDissipation: 0.9,
            velocityDissipation: 0.91,
            pressureDissipation: 1,
            pressureIterations: 44,
            curl: 0,
            splatRadius: 0.0057
        },
        {
            textureDownsample: 0,
            densityDissipation: 0.92,
            velocityDissipation: 0.95,
            pressureDissipation: 0.8,
            pressureIterations: 10,
            curl: 20,
            splatRadius: 0.01
        },
        {
            textureDownsample: 1,
            densityDissipation: 0.98,
            velocityDissipation: 0.99,
            pressureDissipation: 0.998,
            pressureIterations: 19,
            curl: 8,
            splatRadius: 0.008
        }]
        this.state = {
            selectedIndex: 0,
            configs
        }
        this.myRef = React.createRef();
    }

    changeStyle() {
        const { selectedIndex, configs } = this.state;
        const newIndex = selectedIndex + 1 > configs.length -1 ? 0 : selectedIndex + 1;
        this.setState({
            selectedIndex: newIndex
        })

        toast('style changed');
    }

    randomStyle() {
        const { configs } = this.state;

        configs.push({
            textureDownsample: randomWhole(0, 3),
            densityDissipation: randomReal(0.9, 1.000000000000001),
            velocityDissipation: randomReal(0.9, 1.000000000000001),
            pressureDissipation: randomReal(0, 1.000000000000001),
            pressureIterations: randomWhole(1, 61),
            curl: randomWhole(4, 41),
            splatRadius: randomReal(0.001, 0.021),
        })
        const newIndex = configs.length -1;
        this.setState({
            selectedIndex: newIndex,
            configs
        })

        toast('random style');
    }

    render() {
        const { selectedIndex, configs } = this.state;
        return (
            <div>
                <div className="fl-container">
                    <div onClick={this.changeStyle.bind(this)} style={{cursor: 'pointer', top: '10px', right: '10px', zIndex: 2, position: 'absolute', background: 'green', width: '40px', height: '40px', opacity: 0.5 }} />
                    <div onClick={this.randomStyle.bind(this)} style={{cursor: 'pointer', top: '10px', left: '10px', zIndex: 2, position: 'absolute', background: 'purple', width: '40px', height: '40px', opacity: 0.5 }} />
                    <FluidAnimation
                        ref={element => this.myRef = element}
                        className='anim'
                        style={{ height: '100vh' }}
                        config={configs[selectedIndex]}
                    />
                    <div
                        draggable="true"
                        className="pointa"
                        style={{zIndex: 1, position: 'absolute', background: 'green', marginTop: '400px', marginLeft: 0, width: '50px', height: '50px' }}
                    />
                    <ToastContainer/>
                </div>
            </div>
        );
    }
}

//<div draggable="true" className="pointb" style={{zIndex: 0, position: 'absolute', background: 'red', top: '200px', left: '90px', width: '50px', height: '50px' }} />

export default Home;
