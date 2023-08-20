function adaptRequest(req = {}) {
  return Object.freeze({
    path: req.path,
    file: req.file,
    method: req.method,
    pathParams: req.params,
    queryParams: req.query,
    body: req.body,
    url: req.originalUrl,
    user: req.userapp,
    session: req.session,
    AdminInternal: req.AdminInternal,
    SchoolOperator: req.SchoolOperator,
    pedigreeAuth: req.pedigreeAuth,
    teacherAuth: req.teacherAuth,
    studentAuth: req.studentAuth,
    headers: req.headers,
    validator: {
      "express-validator#contexts": req["express-validator#contexts"],
    },
  });
}
module.exports = adaptRequest;
