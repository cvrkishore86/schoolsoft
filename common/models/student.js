module.exports = function(Student) {
// Set the username to the users email address by default.
  Student.observe('before save', function createSchoolUser(ctx, next) {
    if (ctx.instance) {
      if(ctx.isNewInstance) {
      	var student = ctx.instance;
      	var Schooluser = Student.app.models.Schooluser;
        Schooluser.create({
  "username": student.email,
  "firstName": student.firstName,
  "lastName": student.lastName,
  "email": student.email,
  "admin": 0,
  "student": 1,
  "employee": 0,
  "created": new Date(),
  "lastUpdated": new Date(),
  "schoolId" : student.schoolId,
  "password" : student.firstName+"001"
}, function(err, schoolUser) {

          if (err) {
        	  
        	  var err = new Error("Email already exists cannot create School User");
        	  err.statusCode = 400;
        	  console.log(err.toString());
        	  next(err);
        	  return console.log(err);
          }

          
          if (ctx.instance) {
          ctx.instance.userId = schoolUser.userId ;
          } else {
        	    ctx.data.userId = schoolUser.userId;
          }
          next();
        });



      }
     
    }
  });
};
