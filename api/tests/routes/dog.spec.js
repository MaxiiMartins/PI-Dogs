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
},{
  nombre: "Deisy",
  altura_max: 45,
  altura_min: 35,
  peso_max: 30,
  peso_min: 27,
  años_de_vida: "12 years",
  imagen: "https://raw.githubusercontent.com/MaxiiMartins/contador/master/IMG_20200127_200536.webp",
}]

describe('Pruebas sobre la ruta Dogs',  () => {

  beforeEach(() => conn.authenticate().catch((err) => console.error('No se puede conectar a la base de datos:', err)));

  beforeEach(() => Dog.sync({ force: false }));

  describe('GET /dogs', () => {

    it('Retorna un arreglo vacio y un estado 200', async () => {
      await Dog.sync({ force: true })
      const response = await agent.get("/dogs").send()
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).toHaveLength(0)
    })
    it('Retorna una lista de perros y un estado 200', async () => {
       arrDogs.map(async dog=> await Dog.create(dog))
      const response = await agent.get("/dogs").send()
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).not.toHaveLength(0)
    })

    it('Retornar perro llamado Zeus con estado 200', async () => {
      const response = await agent.get("/dogs").query({name:"Zeus"}).send()
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).not.toHaveLength(0)
      const dog = response.body[0]
      expect(dog.nombre).toBe("Zeus")
    })

    it('Retornar error "No se encontro ninguna raza con ese nombre" con estado 404', async () => {
      const response = await agent.get("/dogs").query({name:"Luna"}).send()
      const {body,status} = response
      expect(status).toBe(404)
      expect(body.error).toBe("No se encontro ninguna raza con ese nombre")
    })
  })
});
