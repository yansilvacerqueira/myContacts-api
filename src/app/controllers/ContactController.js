import ContactsRepository from "../repositories/ContactsRepository.js";

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    // obter um registro
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404 Not Found
      return response.status(404).json({ error: "User Not Found" });
    }

    return response.json(contact);
  }

  async store(request, response) {
    // criar novo registro
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(404).json({ error: "Name is required" });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response.status(404).json({ error: "This email already in use" });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    return response.json(contact);
  }

  async update(request, response) {
    // atualizar um registro
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: "User not found" });
    }

    if (contactExists.email === email && id !== contactExists.id) {
      return response.status(404).json({ error: "This email already in use" });
    }

    if (!name && !contactExists) {
      return response.status(404).json({ error: "Name is required" });
    }

    const contact = await ContactsRepository.update(id, {
      name: name ?? contactExists.name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    // deletar um registro
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404 Not Found
      return response.status(404).json({ error: "User Not Found" });
    }

    await ContactsRepository.delete(id);

    // 204 ok but no have body
    return response.sendStatus(204);
  }
}

export default new ContactController();
