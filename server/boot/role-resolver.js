module.exports = function(app) {

  var Role = app.models.Role;

  Role.registerResolver('itadmin', function(role, context, cb) {

    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }

console.log("inside it admin") ;
    // do not allow anonymous users
    var userId = context.accessToken.userId;
    console.log("userid"+userId)   
    if (!userId) {
      return reject();
    }
    var Schooluser = app.models.Schooluser;
    Schooluser.findById(userId, function(err, schooluser) {
      if (err || !schooluser)
        return reject();
return cb(null, schooluser.admin);

    });
    
    
  });

Role.registerResolver('student', function(role, context, cb) {
  console.log("inside student") ;
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }

   
    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }
    var Schooluser = app.models.Schooluser;
    Schooluser.findById(userId, function(err, schooluser) {
      if (err || !schooluser)
        return reject();

     return cb(null, schooluser.student);
    });
    
    
  });

Role.registerResolver('teacher', function(role, context, cb) {
  console.log("inside teacher") ;
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }

   
    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }
    var Schooluser = app.models.Schooluser;
    Schooluser.findById(userId, function(err, schooluser) {
      if (err || !schooluser)
        return reject();

      return cb(null, schooluser.teacher);
    });
    
    
  });


Role.registerResolver('schooladmin', function(role, context, cb) {
console.log("inside schooladmin") ;
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }

   
    // do not allow anonymous users
    var userId = context.accessToken.userId;
    
    if (!userId) {
      return reject();
    }
    var Schooluser = app.models.Schooluser;
    Schooluser.findById(userId, function(err, schooluser) {
      if (err || !schooluser)
        return reject();

      var isemployee =  schooluser.employee;

    });
    
    
  });
};