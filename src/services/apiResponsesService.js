export const handleBaseResponse = async (res, operation, successStatus = 200, failStatus = 500) => {
  try {
    const result = await operation()

    res.status(successStatus).json(result)
  } catch (error) {
    console.error(error)

    res.status(failStatus).json({ message: error.message })
  }
}