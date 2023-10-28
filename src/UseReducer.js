import React from 'react';

const SECURITY_CODE = 'Key';

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onConfirm = () => dispatch({ type: actionTypes.confirm });
    const onError = () => dispatch({ type: actionTypes.error });
    const onDelete = () => dispatch({ type: actionTypes.delete });
    const onCheck = () => dispatch({ type: actionTypes.check });
    const onReset = () => dispatch({ type: actionTypes.reset });

    const onWrite = ({ target: { value } }) => {
        dispatch({ type: actionTypes.write, payload: value });
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
                    onChange={onWrite}
                />
                <button
                    onClick={onCheck}
                    >Comprobar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>¿Estás seguro que deseas eliminar?</p>
                <button
                    onClick={onDelete}
                >Eliminar</button>
                <button
                    onClick={onReset}
                >Cancelar</button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button
                    onClick={onReset}
                >Reset</button>
            </React.Fragment>
        );
    }
}

export { UseReducer };

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
};

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    write: 'WRITE',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET'
};

const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false
    },
    [actionTypes.write]: { 
        ...state, 
        value: payload
    },
    [actionTypes.check]: { 
        ...state, 
        loading: true 
    },
    [actionTypes.delete]: { 
        ...state, 
        deleted: true 
    },
    [actionTypes.reset]: { 
        ...state, 
        value: '',
        confirmed: false, 
        deleted: false
    }
});

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
};