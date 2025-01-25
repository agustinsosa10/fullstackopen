module.exports = (error, request, response, next) => {
    console.error(error);
    if (error.name === "CastError") {
      response.status(400).send({
        error: "el id no existe",
      });
    } else {
      response.status(500).end();
    }
  }