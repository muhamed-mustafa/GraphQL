import { Recipe } from '../models/Recipe.js';

const resolvers = {
  Query: {
    async recipe(_, { ID }) {
      return await Recipe.findById(ID);
    },

    async getRecipes(_, { amount }) {
      return await Recipe.find().sort({ createdAt: -1 }).limit(amount);
    },
  },

  Mutation: {
    async createRecipe(_, { recipeInput: { name, description } }) {
      const createRecipe = new Recipe({
        name,
        description,
        createdAt: new Date().toISOString(),
        thumbsUp: 0,
        thumbsDown: 0,
      });

      const res = await createRecipe.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async editRecipe(_, { ID, recipeInput: { name, description } }) {
      const wasEdited = (
        await Recipe.updateOne({ _id: ID }, { name, description })
      ).matchedCount;

      return wasEdited;
    },

    async deleteRecipe(_, { ID }) {
      const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },
  },
};

export { resolvers };
