const db = require('../model');

const Checklist = db.checklist;
const ChecklistItem = db.checklistItem;
module.exports = {
  // MAIN CHECKLIST
  getChecklist: async (req, res) => {
    try {
      const data = await Checklist.findAll();
      if (!data.length) return res.status(404).json({ message: 'Checklist Not Found' });
      return res.json({ data });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  addChecklist: async (req, res) => {
    try {
      return await Checklist.create(req.body)
        .then((item) => res.status(201).json({ message: 'success', data: item }))
        .catch((err) => res.status(400).json({ message: err.message, data: null }));
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteChecklist: async (req, res) => {
    try {
      const { id } = req.params;
      return await Checklist.destroy({ where: { id } })
        .then((item) => { if (item) { res.status(201).json({ message: 'success' }); } })
        .catch((err) => res.status(400).json({ message: err.message, data: null }));
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // ITEM CHECKLIST
  getChecklistItemAll: async (req, res) => {
    try {
      const data = await ChecklistItem.findAll();
      return res.json({ data });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  addChecklistItem: async (req, res) => {
    try {
      const { id } = req.params;
      const { itemName } = req.body;
      const data = {
        itemName,
        status: false,
        checklistId: id,
      };
      return await ChecklistItem.create(data)
        .then((item) => res.status(201).json({ message: 'success', data: item }))
        .catch((err) => res.status(400).json({ message: err.message, data: null }));
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getChecklistItemById: async (req, res) => {
    try {
      const { id, item } = req.params;
      console.log(id, item);
      const dataValues = await ChecklistItem.findOne({
        where: { checklistId: id, id: item },
      });
      if (!dataValues) {
        return res.status(404).json({ message: 'notfound' });
      }
      return res.json({ data: dataValues });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  },

  setStatusChecklistItemById: async (req, res) => {
    try {
      const { id, item } = req.params;
      return await ChecklistItem.findOne({ where: { checklistId: id, id: item }, attributes: { include: ['status'] } })
        .then(async (data) => {
          console.log(!data.dataValues.status);
          await ChecklistItem.update(
            { status: !data.dataValues.status },
            { where: { checklistId: id, id: item } },
          ).then((ele) => {
            console.log(ele);
            res.json({ message: 'update status is success' });
          })
            .catch((err) => res.status(400).json({ err }));
        }).catch((err) => res.status(400).json({ err }));
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  deleteChecklistItemById: async (req, res) => {
    try {
      const { id, item } = req.params;
      return await ChecklistItem.destroy({ where: { id, checklistId: item } })
        .then((ele) => { if (ele) { res.status(201).json({ message: 'success' }); } })
        .catch((err) => res.status(400).json({ message: err.message, data: null }));
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  renameChecklistItemById: async (req, res) => {
    try {
      const { id, item } = req.params;

      const { itemName } = req.body;
      return await ChecklistItem.update({ itemName }, { where: { checklistId: id, id: item } })
        .then((ele) => res.json({ message: 'success', data: ele }))
        .catch((err) => res.status(400).json({ err }));
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
