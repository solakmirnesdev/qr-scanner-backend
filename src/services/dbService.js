export const getAll = (Model) => Model.find()

export const getAllByQuery = (Model, query) => Model.find(query)

export const create = (Model, data) => {
  const newDoc = new Model(data)
  return newDoc.save()
}

export const findById = (Model, id) => Model.findById(id)

export const findOne = (Model, query) => Model.findOne(query)

export const update = (Model, id, data) => Model.findByIdAndUpdate(id, data, { new: true })

export const remove = (Model, id) => Model.findByIdAndDelete(id)