const { ObjectId } = require("mongodb");
const { getMongoDB } = require("../db/mongo");

class Model {
  static getDb() {
    return getMongoDB().collection("data");
  }

  static async findUserByEmail(email) {
    const newData = await this.getDb.findOne({ email });
  }

  static async handleRegister(user) {
    const { email, name } = user;
    const isUser = await this.findUserByEmail({ email });

    if (!isUser) {
      return await this.getDb().insertOne(user);
    } else {
      return { message: "email already in use" };
    }
  }

  static async updateUser(data) {
    const { name, email } = data;
    try {
      const toUpdate = await this.getDb().findOneAndUpdate(
        { name: name },
        {
          $inc: {
            name: name,
            email: email,
          },
        }
      );

      return toUpdate;
    } catch (error) {
        console.log(error)
    }
  }
}

module.exports = Model