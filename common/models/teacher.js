module.exports = function(Teacher) {
	Teacher.observe('before save', function createSchoolUser(ctx, next) {
		    if (ctx.instance) {
		      if(ctx.isNewInstance) {
		      	var teacher = ctx.instance;
		      	var Schooluser = Teacher.app.models.Schooluser;
		        Schooluser.create({
		  "username": teacher.email,
		  "firstName": teacher.firstName,
		  "lastName": teacher.lastName,
		  "email": teacher.email,
		  "admin": 0,
		  "student": 1,
		  "employee": 0,
		  "created": new Date(),
		  "lastUpdated": new Date(),
		  "schoolId" : teacher.schoolId,
		  "password" : teacher.firstName+"001"
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
