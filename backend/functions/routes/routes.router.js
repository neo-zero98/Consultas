const { Router } = require("express");
const router = Router();

const admin = require("firebase-admin");
const db = admin.firestore();

const authMiddleware = require('../middlewares/authMiddleware');

router.get("/hello-world", (req, res) => {
    return res.status(200).json({ message: "Hello World!" });
});

//guardar persona
router.post('/api/persona', authMiddleware, async(req, res) => {
    try {
        if(req.body.actualizar === true){
            await db.collection("persona").doc(req.body.id).set({
                id: req.body.id,
                nombres: req.body.nombres,
                apellido_materno: req.body.apellido_materno,
                apellido_paterno: req.body.apellido_paterno,
                sexo:req.body.sexo,
                telefono: req.body.telefono,
                direccion: req.body.direccion,
                seccion: req.body.seccion,
                fecha_registro: req.body.fecha_registro,
                capturista: req.body.capturista
            });
        }else{
            await db.collection("persona").add({
                id: req.body.id,
                nombres: req.body.nombres,
                apellido_materno: req.body.apellido_materno,
                apellido_paterno: req.body.apellido_paterno,
                sexo:req.body.sexo,
                telefono: req.body.telefono,
                direccion: req.body.direccion,
                seccion: req.body.seccion,
                fecha_registro: req.body.fecha_registro,
                capturista: req.body.capturista
            });
        }
        return res.status(200).json({ message: "Se guardaron datos correctamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error" });
    }    
});

//consultar todas las personas
router.get("/api/personas", authMiddleware, async (req, res) => {
    try {
        let query = (await db.collection("persona").get()).docs;
        const personas = query.map((doc) => ({
            ...doc.data()
        }));

        return res.status(200).json({
            code: 200,
            menssage: "operacion satisfactoria",
            data: personas
        });
    } catch (error) {
        return res.status(500).json({ 
            code: 500,
            message: "Error",
            data:{}
        });
    }
});

//consultar persona por id
router.get("/api/persona/:persona_id", authMiddleware, async (req, res) => {
    try {
        let persona = (await db.collection("persona").doc(req.params.persona_id).get()).data();
        // return res.status(200).json(persona);
        return res.status(200).json({
            code: 200,
            menssage: "operacion satisfactoria",
            data: persona
        });
    } catch (error) {
        // return res.status(500).json({ message: "Error" });
        return res.status(500).json({ 
            code: 500,
            message: "Error",
            data:{}
        });
    }
});

//consultar seccion por id
router.get("/api/seccion/:seccion_id", authMiddleware, async (req, res) => {
    try {
        let seccion = (await db.collection("seccion").doc(req.params.seccion_id).get()).data();
        return res.status(200).json({
            code: 200,
            menssage: "operacion satisfactoria",
            data: seccion
        });
    } catch (error) {
        return res.status(500).json({ 
            code: 500,
            message: "Error",
            data:{}
        });
    }
});

//consultar todas las secciones
router.get("/api/secciones", authMiddleware, async (req, res) => {
    try {
        let query = (await db.collection("seccion").get()).docs;
        const secciones = query.map((doc) => ({
            ...doc.data()
        }));

        return res.status(200).json({
            code: 200,
            menssage: "operacion satisfactoria",
            data: secciones
        });
    } catch (error) {
        return res.status(500).json({ 
            code: 500,
            message: "Error",
            data:{}
        });
    }
});

//consultar personas por seccion y fecha de inicio y fecha de fin
router.post("/api/fecha_seccion", authMiddleware, async(req, res) => {
    try {
        const seccion = req.body.seccion;
        const inicio = new Date(req.body.fechaInicio);
        const final = new Date (req.body.fechaFinal);
        const date1utc = Date.UTC(inicio.getFullYear(), inicio.getMonth(), inicio.getDate());
        const date2utc = Date.UTC(final.getFullYear(), final.getMonth(), final.getDate());
        day = 1000*60*60*24;
        const dias = (date2utc - date1utc)/day;
        let lstFechas = new Array();
        let personas = new Array();
        for(let i=0; i<=dias; i++){
            const dia = (""+inicio.getUTCDate()).length > 1 ? (""+inicio.getUTCDate()) : ("0"+inicio.getUTCDate());
            const mes = (""+(inicio.getUTCMonth()+1)).length > 1 ? (""+(inicio.getUTCMonth()+1)) : ("0"+(inicio.getUTCMonth()+1));
            const fecha = inicio.getUTCFullYear() + '-' + mes + '-' + dia;
            lstFechas.push(fecha);
            inicio.setDate(inicio.getDate() + 1);
        }
        for(fecha of lstFechas){
            const query = await db.collection('persona').where("fecha_registro", "==",fecha).where("seccion","==",seccion)
                        .get();
            const lista = query.docs.map(res => ({
                ...res.data()
            }));
            if(lista.length > 0 ){
                personas.push(lista);
            }
        }        
        return res.status(200).json({
            code: 200,
            menssage: "operacion satisfactoria",
            data: personas
        });
    } catch (error) {
        return res.status(500).json({ 
            code: 500,
            message: "Error",
            data:{}
        });
    }
})

module.exports = router;