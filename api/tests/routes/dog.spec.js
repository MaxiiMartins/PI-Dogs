/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = request(app);

const arrDogs = [{
  nombre: "Zeus",
  altura_max: 45,
  altura_min: 35,
  peso_max: 40,
  peso_min: 30,
  años_de_vida: "12 years",
  imagen: "https://raw.githubusercontent.com/MaxiiMartins/contador/master/IMG_20200127_200536.webp",
}, {
  nombre: "Deisy",
  altura_max: 45,
  altura_min: 35,
  peso_max: 30,
  peso_min: 27,
  años_de_vida: "12 years",
  imagen: "https://raw.githubusercontent.com/MaxiiMartins/contador/master/IMG_20200127_200536.webp",
}]
let dogId; // para guardar id mas adelante

describe('Prueba sobre la ruta dogs', () => {

  beforeEach(() => conn.authenticate().catch((err) => console.error('No se puede conectar a la base de datos:', err)));

  describe('GET /dogs', () => {
    it('Retorna un arreglo vacio y un estado 200', async () => {
      await Dog.sync({ force: true })
      const response = await agent.get("/dogs")
        .expect("Content-Type", /json/)
        .expect(200)
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).toHaveLength(0)
    })

    it('Retorna una lista de perros y un estado 200', async () => {
      arrDogs.map(async dog => await Dog.create(dog))
      const response = await agent.get("/dogs").send()
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).not.toHaveLength(0)
    })

    it('Retornar perro llamado Zeus con estado 200', async () => {
      const response = await agent.get("/dogs").query({ name: "Zeus" }).send()
        .expect("Content-Type", /json/)
        .expect(200)
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).not.toHaveLength(0)
      const dog = response.body[0]
      dogId = dog.id
      expect(dog.nombre).toEqual("Zeus")
    })

    it('Retornar error "No se encontro ninguna raza con ese nombre" con estado 404', async () => {
      const response = await agent.get("/dogs").query({ name: "Luna" }).send()
      const { body, status } = response
      expect(status).toBe(404)
      expect(body).toEqual({ error: "No se encontro ninguna raza con ese nombre" })
    })
  })

  describe('GET /dogs/:id', () => {
    it("Retorna la busqueda por id con estado 200", (() => {
      agent.get("/dogs/" + dogId)
        .expect(200)
        .then(response => expect(response.body).toEqual({
          id: dogId,
          nombre: 'Zeus',
          alturaMax: 45,
          alturaMin: 35,
          pesoMax: 40,
          pesoMin: 30,
          'añosDeVida': '12 years',
          img: 'https://raw.githubusercontent.com/MaxiiMartins/contador/master/IMG_20200127_200536.webp',
          temperamento: ''
        }))
    }))

    it("Retorna un error por id inexistente con estado 404", (async () => {
      const idError = 12345
      const response = await agent.get("/dogs/" + idError)
      const { text, status } = response
      expect(status).toBe(404)
      expect(text).toEqual(`${idError} es incorrecto`)
    }))
  })

  describe('POST /dog', () => {
    const pruebaIncorrecta = {
      "alturaMax": 0,
      "alturaMin": 45,
      "pesoMax": 66,
      "pesoMin": 55,
      "añosDeVida": "1 years",
      "img": "https://raw.githubusercontent.com/MaxiiMartins/contador/master/IMG_20200127_200536.webp",
      "temperamento": "Familial"
    }
    const pruebaCorrecta = {
      "nombre": "Perro de prueba",
      "alturaMax": 50,
      "alturaMin": 45,
      "pesoMax": 66,
      "pesoMin": 55,
      "añosDeVida": "1 years",
      "img": "https://raw.githubusercontent.com/MaxiiMartins/contador/master/IMG_20200127_200536.webp",
      "temperamento": "Familial"
    }

    it("Retorna mensaje que se agrego correctamente", (async () => {
      const response = await agent.post("/dog").send(pruebaCorrecta)
        .expect(200)
      const { text } = response
      expect(text).toEqual(`${pruebaCorrecta.nombre} se agrego correctamente `)
    }))

    it("Retorna error al crear perro con estado 500", (() => {
      agent.post("/dog").send(pruebaIncorrecta)
        .expect(500)
    }))
  })


});
