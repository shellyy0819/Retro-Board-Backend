const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const schemaTypes = mongoose.Schema.Types;

const UserSchema = new Schema(
  {
    id: { type: schemaTypes.String },
    salt: { type: schemaTypes.String },
    name: { type: schemaTypes.String },
    email: { type: schemaTypes.String },
    username: { type: schemaTypes.String },
    password: { type: schemaTypes.String },
    roles: { type: [schemaTypes.String] },
    created_at: { type: schemaTypes.Date },
    update_at: { type: schemaTypes.Date },
    deleted_at: { type: schemaTypes.Date }
  },
  { collection: 'users' }
);

// UserSchema.pre('save', function (next) {
//   const user = this;

//   if (this.isModified('password') || this.isNew) {
//     bcrypt.genSalt(10, function (saltError, salt) {
//       if (saltError) {
//         return next(saltError);
//       } else {
//         bcrypt.hash(user.password, salt, function (hashError, hash) {
//           if (hashError) {
//             return next(hashError);
//           }

//           user.password = hash;
//           next();
//         });
//       }
//     });
//   } else {
//     return next();
//   }
// });

module.exports = mongoose.model('User', UserSchema);
