const resWeb = function (response, result){
    return response.set(result.headers).status(200).json(result.data);
  };
module.exports = resWeb;