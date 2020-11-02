import { InstitutionDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';

const mutationInstitution = {

  newInstitution: (root, { input }) => {
    const newInstitution = new InstitutionDS({
      name: input.name,
      location: input.location,
      alias: input.alias,
      image: input.image,
      demo: input.demo,
      email: input.email,
      qr: input.email
    })
    newInstitution.id = newInstitution._id

    return new Promise((resolver, object) => {
      newInstitution.save((error) => {
        if (error) rejects(error)
        else resolver(newInstitution)
      })
    })
  },
  updateInstitution: (root, { input }) => {
    return new Promise((resolve, object) => {
      InstitutionDS.findOneAndUpdate({ _id: input.id }, input, {new: true}, (error, registro) => {
        if (error) rejects(error)
        else resolve(registro)
      })
    })
  },
  removeInstitution: (root, { id }) => {
    return new Promise((resolve, object) => {
      InstitutionDS.findOneAndRemove({ _id: id }, (error) => {
        if (error) rejects(error)
        else resolve("Se elimino correctamente")
      })
    })
  }
}

export default mutationInstitution
