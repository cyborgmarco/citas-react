import {useState, useEffect} from 'react';
import Error from './Error';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);

    useEffect(() => {
        if(Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])

    

    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36)
        return random + fecha
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //validación del formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')) {
            console.log('Hay almenos un campo vacío')
            setError(true)
            return;
        } 
            setError(false)

            //construir objeto de paciente
            const objetoPaciente = {
                nombre, 
                propietario, 
                email, 
                fecha, 
                sintomas,

            }

            if(paciente.id) {
                //editando registro
                objetoPaciente.id= paciente.id
                const pacientesActualizados= pacientes.map( pacienteState => pacienteState.id ===
                paciente.id ? objetoPaciente : pacienteState )

                setPacientes(pacientesActualizados)
                setPaciente({})
            }else{
                //nuevo registro
                objetoPaciente.id= generarId();
                setPacientes([...pacientes, objetoPaciente]);
            }
            //console.log(objetoPaciente)
           
            //reiniciar formulario
            setNombre('')
            setPropietario('')
            setEmail('')
            setFecha('')
            setSintomas('')

        }

        
    

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Adminístralos</span>
            </p>

            <form 
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
                {error && <Error><p>Todos los campos son obligatorios</p></Error>}
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Nombre Mascota
                    </label>

                    <input 
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-blue-400 rounded-md"
                        value={nombre}
                        onChange={ (e) => setNombre(e.target.value) }
                    />  
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                        Nombre Propietario
                    </label>

                    <input 
                        id="propietario"
                        type="text"
                        placeholder="Nombre del propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-blue-400 rounded-md"
                        value={propietario}
                        onChange={ (e) => setPropietario(e.target.value) }
                    />  
                </div>
                <div className="mb-5">
                    <label htmlFor="e-mail" className="block text-gray-700 uppercase font-bold">
                        E-mail
                    </label>

                    <input 
                        id="e-mail"
                        type="email"
                        placeholder="E-mail Contacto Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-blue-400 rounded-md"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }
                    />  
                </div>
                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                        Fecha de alta
                    </label>

                    <input 
                        id="alta"
                        type="date" //el tipo date no requiere placeholder.
                        className="border-2 w-full p-2 mt-2 placeholder-blue-400 rounded-md"
                        value={fecha}
                        onChange={ (e) => setFecha(e.target.value) }
                    />  
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                        Síntomas
                    </label>
                    <textarea
                        id="sintomas"
                        type="text"
                        className="border-2 w-full p-2 mt-2 placeholder-blue-400 rounded-md"
                        placeholder="Describe los síntomas de tu mascota"
                        value={sintomas}
                        onChange={ (e) => setSintomas(e.target.value) }
                        
                    />  
                </div>
                   <input
                        type="submit"
                        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold 
                        hover:bg-indigo-700 cursor-pointer transition-all"
                        value={ paciente.id ? "Editar paciente" : "Agregar paciente"}
                   />
            </form>
        </div>
    )
}

export default Formulario; 


