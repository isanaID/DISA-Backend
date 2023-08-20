const resWeb = function (response, result){
      return response.set(result.headers).status(result.statusCode).json(result.data);
    };
module.exports = resWeb;