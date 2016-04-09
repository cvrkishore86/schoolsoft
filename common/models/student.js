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
  "hashedPassword": "string",
  "resetPasswordCode": "string",
  "resetPasswordCodeUntil": "2016-04-08",
  "createdAt": "2016-04-08",
  "updatedAt": "2016-04-08",
  
  "userId": 2,
  "created": "2016-04-08",
  "lastUpdated": "2016-04-08",
  "password" : student.firstName+"001"
}, function(err, schoolUser) {

          if (err) {return console.log(err);}

          console.log('User assigned userid ' + schoolUser.userid + ' (' + ctx.instance.type + ')');

        });



      }
     
    }
    next();
  });
};
