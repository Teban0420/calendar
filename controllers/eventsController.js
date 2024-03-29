const Evento = require('../models/Evento.js');

const getEventos = async (req, res) => {

    const eventos = await Evento.find().populate('user', 'name');

     res.json({
        ok: true,
        eventos
     });

}
const crearEvento = async (req, res) => {

    const evento = new Evento( req.body);

    try {

        evento.user = req.uid;
        await evento.save();

        res.json({
            ok: true,
            evento
        })
        
    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal'
        });        
    }
    
}

const actualizarEvento = async (req, res) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        // obtengo evento de DB
        const evento = await Evento.findById(eventoId);

        if(!evento){

            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            });
        }

        // verifico autor del evento
        if( evento.user.toString() !== uid){
           
            return res.status(401).json({
                ok: false,
                msg: 'No se puede ejecutar la acción'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        res.json({
            ok: true,
            evento: eventoActualizado
        })
        
    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal'
        });
    }
    
}

const eliminarEvento = async (req, res) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        // obtengo evento de DB
        const evento = await Evento.findById(eventoId);

        if(!evento){

            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            });
        }

        // verifico autor del evento
        if( evento.user.toString() !== uid){
           
            return res.status(401).json({
                ok: false,
                msg: 'No se puede ejecutar la acción'
            });
        }

        await Evento.findByIdAndDelete(eventoId);

        res.json({ok: true});
        
    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal'
        });
    }
}

module.exports = {
    actualizarEvento,
    eliminarEvento,
    getEventos,
    crearEvento
}