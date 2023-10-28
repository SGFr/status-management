import React from 'react';

const SECURITY_CODE = 'Key';

function UseState({ name }) {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    });

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true
        });
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        });
    }

    const onWrite = (newValue) => {
        setState({ 
            ...state, 
            value: newValue 
        });
    }

    const onCheck = () => {
        setState({ 
            ...state, 
            loading: true 
        });
    }

    const onDelete = () => {
        setState({ 
            ...state, 
            deleted: true 
        });
    }

    const onReset = () => {
        setState({ 
            ...state, 
            value: '',
            confirmed: false, 
            deleted: false
        })
    }

    React.useEffect(() => {
        console.log("Iniciando efecto");

        if (!!state.loading) {
            setTimeout(() => {
                console.log("Validando");
                if (state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
                }
                console.log("Finalizando validación");
            }, 3000);
        }

        console.log("Terminando el efecto");
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar UseState {name}</h2>
                <p>Escribe el código de seguridad.</p>
                {(state.error && !state.loading) && (
                    <p>Error: Código incorrecto</p>
                )}
                {state.loading && (
                    <p>Cargando...</p>
                )}
                <input 
                    placeholder="Código de seguridad"
                    value={state.value} 
                    onChange={(event) => {
                        onWrite(event.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        onCheck();
                    }}
                    >Comprobar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>¿Estás seguro que deseas eliminar?</p>
                <button
                    onClick={() => {
                        onDelete();
                    }}
                >Eliminar</button>
                <button
                    onClick={() => {
                        onReset();
                    }}
                >Cancelar</button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button
                    onClick={() => {
                        onReset();
                    }}
                >Reset</button>
            </React.Fragment>
        );
    }
}

export { UseState };