import CategoriesRepository from "../repositories/CategoriesRepository.js";

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findAll(orderBy);
    response.json(categories);
  }

  async show(request, response) {
    // obter um registro
    const { id } = request.params;
    const category = await CategoriesRepository.findById(id);

    if (!category) {
      // 404 Not Found
      return response.status(404).json({ error: "Category Not Found" });
    }

    return response.json(category);
  }

  async store(request, response) {
    // criar novo registro
    const { name } = request.body;

    if (!name) {
      return response.status(404).json({ error: "Name is required" });
    }

    const categoryExists = await CategoriesRepository.findByName(name);

    if (categoryExists) {
      return response.status(404).json({ error: "This category exists" });
    }

    const category = await CategoriesRepository.create({
      name,
    });

    return response.json(category);
  }

  async update(request, response) {
    // atualizar um registro
    const { id } = request.params;
    const { name } = request.body;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return response.status(404).json({ error: "Category not found" });
    }

    if (!name && !categoryExists) {
      return response.status(404).json({ error: "Name is required" });
    }

    const category = await CategoriesRepository.update(id, {
      name,
    });

    response.json(category);
  }

  async delete(request, response) {
    // deletar um registro
    const { id } = request.params;
    const contact = await CategoriesRepository.findById(id);

    if (!contact) {
      // 404 Not Found
      return response.status(404).json({ error: "Category Not Found" });
    }

    await CategoriesRepository.delete(id);

    // 204 ok but no have body
    return response.sendStatus(204);
  }
}

export default new CategoryController();
