import React from 'react';
import { Loading } from './Loading';

const SECURITY_CODE = 'Key';

class ClassState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: false,
            loading: false
        }
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");

        if (!!this.state.loading) {
            setTimeout(() => {
                console.log("Validando");
                if (this.state.value === SECURITY_CODE) {
                    this.setState({ error: false, loading: false });
                } else {
                    this.setState({ error: true, loading: false });
                }
                console.log("Finalizando validación");
            }, 3000);
        }
    }

    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Escribe el código de seguridad.</p>
                {(this.state.error && !this.state.loading) && (
                    <p>Error: Código incorrecto</p>
                )}
                {this.state.loading && (
                    <Loading />
                )}
                <input 
                    placeholder="Código de seguridad" 
                    value={this.state.value}
                    onChange={(event) => {
                        this.setState({ value: event.target.value })
                    }}
                />
                <button
                    onClick={() => this.setState({ loading: true })}
                >Comprobar</button>
            </div>
        )
    }
}

export { ClassState };